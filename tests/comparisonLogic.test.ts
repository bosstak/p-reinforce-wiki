import { calculateLossMetric, mockStandardData, mockOptimalData } from '../mock-service/comparisonLogic';

describe('Advanced Report Comparison Logic (V4.0)', () => {

    // 🧪 Edge Case 1: 시간적 손실 극대화 시나리오 (T_loss Focus)
    test('E-Case 1: 최적 경로 사용으로 T_loss가 명확하게 계산되어야 한다.', () => {
        // 일반 경로 대비 시간 절약이 90분 이상인 경우를 가정
        const standardHighLoss = { totalDurationMinutes: 360, costUSD: 80.0, transferStops: 5, averageWaitTimeMinutes: 120, regulatoryRiskLevel: 1 };
        const optimalLowLoss = { totalDurationMinutes: 90, costUSD: 150.0, transferStops: 2, averageWaitTimeMinutes: 30, regulatoryRiskLevel: 1 };

        const result = calculateLossMetric(standardHighLoss, optimalLowLoss);
        // 검증 1: T_loss가 크게 계산되었는지 확인
        expect(result.lossMetricCalculation.timeLossSavedMinutes).toBeGreaterThanOrEqual(270); 
        // 검증 2: Loss Message가 트리거 되었는지 확인
        expect(result.lossMetricCalculation.suggestedLossMessage).toContain('심각합니다');
    });

    // 🧪 Edge Case 2: 정보적 손실 극대화 시나리오 (R_score Focus)
    test('E-Case 2: 규정 변화 리스크가 높을 때 R_score가 최대치에 가깝게 계산되어야 한다.', () => {
        // 일반 경로의 규제 위험 레벨이 매우 높은 경우를 가정 (예: 국가 간 이동 제한 등)
        const standardHighRisk = { totalDurationMinutes: 120, costUSD: 60.0, transferStops: 3, averageWaitTimeMinutes: 40, regulatoryRiskLevel: 5 }; // Max Risk
        const optimalLowRisk = { totalDurationMinutes: 90, costUSD: 120.0, transferStops: 2, averageWaitTimeMinutes: 30, regulatoryRiskLevel: 1 };

        const result = calculateLossMetric(standardHighRisk, optimalLowRisk);
        // 검증 1: R_score가 높은 값으로 계산되었는지 확인 (최대치 근접)
        expect(result.lossMetricCalculation.riskScore).toBeGreaterThan(0.95);
        // 검증 2: Loss Message에 '규정' 관련 경고 문구가 포함되어야 함
        expect(result.lossMetricCalculation.suggestedLossMessage).toContain('규제');
    });

    // 🧪 Edge Case 3: 스트레스 비용 및 종합 손실 시나리오 (S_loss & Combined)
    test('E-Case 3: 시간/스트레스/리스크가 복합적으로 높은 경우, Paywall 카피와 연동되어야 한다.', () => {
        // 일반 경로의 환승이 너무 많고(High Stress), 시간이 많이 걸리며(T_loss), 규제 위험도 있는 경우
        const standardComplex = { totalDurationMinutes: 240, costUSD: 150.0, transferStops: 6, averageWaitTimeMinutes: 180, regulatoryRiskLevel: 3 };
        const optimalSmooth = { totalDurationMinutes: 100, costUSD: 250.0, transferStops: 2, averageWaitTimeMinutes: 40, regulatoryRiskLevel: 1 };

        const result = calculateLossMetric(standardComplex, optimalSmooth);
        // 검증 1: 모든 손실 지표가 의미 있는 값을 가져야 함
        expect(result.lossMetricCalculation.timeLossSavedMinutes).toBeGreaterThan(90); 
        expect(result.lossMetricCalculation.stressLossIndex).toBeGreaterThan(250); // 계산식에 따라 높은 값이 나와야함 (최대치 근접)
        // 검증 2: Loss Message가 가장 강력한 경고로 작동해야 함
        expect(result.lossMetricCalculation.suggestedLossMessage).toContain('심각합니다');
    });

});