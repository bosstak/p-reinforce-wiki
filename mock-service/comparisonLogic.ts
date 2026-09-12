/** 
 * @description Advanced Report API: 경로 비교 및 손실 지표 산출 핵심 로직 (V4.0)
 * 이 함수는 단순히 최단 거리를 찾는 것이 아니라, 비즈니스 관점에서 '놓치는 가치'를 계산하는 역할을 수행합니다.
 */

import { ComparisonResult } from '../schemas/advancedReportSchema';

/**
 * @param standardData 일반 경로 데이터 (사용자 입력 기반)
 * @param optimalData 최적화된 추천 경로 데이터 (프리미엄 전용)
 * @returns 손실 지표가 포함된 최종 비교 결과 구조체.
 */
export function calculateLossMetric(standardData: any, optimalData: any): ComparisonResult {
    let timeSaved = 0;
    let stressIndexIncrease = 0;
    let riskScore = 0.0;
    let suggestedMessage = "";

    // 1. 시간적 손실 ($T_{loss}$) 계산 (가장 높은 가중치)
    timeSaved = Math.max(0, standardData.totalDurationMinutes - optimalData.totalDurationMinutes);

    // 2. 스트레스/불편함 비용 ($S_{loss}$) 계산
    // 예를 들어, 일반 경로의 환승 지점 수가 많거나 (complexity), 대기 시간이 길면 점수를 부여합니다.
    stressIndexIncrease = Math.min(100, standardData.transferStops * 5 + standardData.averageWaitTimeMinutes);

    // 3. 미래 예측 리스크 ($R_{score}$) 계산
    // 외부 API (비자/규정) 데이터를 통합하여 위험 점수를 산출합니다.
    riskScore = Math.min(1.0, standardData.regulatoryRiskLevel / 5); // 예시: 레벨이 높을수록 위험도가 높아짐

    const lossMetrics: LossMetrics = {
        timeLossSavedMinutes: parseFloat(timeSaved.toFixed(1)),
        stressLossIndex: Math.round(parseFloat(stressIndexIncrease.toFixed(0))),
        riskScore: parseFloat(riskScore.toFixed(2)),
        suggestedLossMessage: "" // 이 값은 최종 로직에서 채워집니다.
    };

    // 4. 최종 비즈니스 메시지 생성 (Writer의 카피라이팅 활용)
    if (lossMetrics.timeLossSavedMinutes >= 30 || lossMetrics.stressLossIndex > 60 || lossMetrics.riskScore > 0.7) {
        suggestedMessage = "🚨 [경고] 최적화된 경로를 사용하지 않으면, 시간 및 예측 리스크 손실이 심각합니다. 지금 바로 Premium 기능을 활성화하여 이 기회비용을 회복하세요.";
    } else if (lossMetrics.riskScore > 0.3) {
        suggestedMessage = "⚠️ [주의] 현재 경로에 규정 변화가 감지됩니다. 최신 정보 분석이 필요합니다. 프리미엄 기능을 통해 안전하게 계획하세요.";
    } else {
        suggestedMessage = ""; // 손실이 크지 않음
    }

    // 최종 결과 반환 (스키마 준수)
    return {
        standardRoute: standardData as any,
        optimalRoute: optimalData as any,
        lossMetricCalculation: {
            timeLossSavedMinutes: lossMetrics.timeLossSavedMinutes,
            stressLossIndex: lossMetrics.stressLossIndex,
            riskScore: lossMetrics.riskScore,
            suggestedLossMessage: suggestedMessage
        }
    };
}

// Mock Data 예시 (실제 환경에서는 DB 또는 외부 API 호출)
export const mockStandardData = {
    totalDurationMinutes: 180, // 3시간
    costUSD: 50.0,
    transferStops: 4,
    averageWaitTimeMinutes: 90,
    regulatoryRiskLevel: 2,
};

export const mockOptimalData = {
    totalDurationMinutes: 120, // 2시간
    costUSD: 75.0,
    transferStops: 2,
    averageWaitTimeMinutes: 30,
    regulatoryRiskLevel: 1,
};