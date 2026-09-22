// src/services/error-handler.ts - Loss Metric 및 예외 처리 전담 서비스 레이어
import { CalculatedLossResult } from '../types'; // 가정: 타입 정의 파일이 존재한다고 가정합니다.

/**
 * 비즈니스 계약서(V1.0)에 따라 시스템 실패를 정량화된 기회비용($T_{loss}$)으로 변환하는 함수.
 * 이 서비스는 모든 외부 입력 값과 계산 결과를 받아 안전하게 처리해야 합니다.
 * @param errorType - 에러의 종류 (E-01: 크레딧 부족, E-02: Limit 초과 등)
 * @param optimalCost - 최적 상황에서 얻을 수 있었던 가치 (Optimal_Cost).
 * @param currentValue - 현재 시점에서 사용자가 가진/사용 가능한 값 (Current_Value).
 * @returns 계산된 손실 결과 객체.
 */
export const processErrorAndLossMetric = (
    errorType: string, 
    optimalCost: number, 
    currentValue: number
): CalculatedLossResult => {
    // 데이터 타입 안정성 검증 (Null/Undefined 방어)
    if (isNaN(optimalCost) || isNaN(currentValue)) {
        return {
            lossAmount: 0.0,
            message: "❌ Critical Error: 비즈니스 로직 계산에 필요한 값이 누락되었습니다. 시스템 설정을 확인해주세요.",
            errorCode: 'E-99',
            isLossCalculated: false,
        };
    }

    // T_loss 공식 적용: Optimal_Cost - Current_Value
    const lossAmount = Math.max(0, parseFloat((optimalCost - currentValue).toFixed(2))); 

    let userFacingMessage = "";
    switch (errorType) {
        case 'E-01': // 크레딧 부족
            userFacingMessage = `🚨 놓치고 있는 기회비용: $${lossAmount.toFixed(2)}를 확보하려면 Pro Plan으로 업그레이드해야 합니다.`;
            break;
        case 'E-02': // 최대 Limit 초과
            userFacingMessage = `⚠️ API 호출 제한 초과로 인해 최적의 분석을 수행할 수 없습니다. 다음 기회에 재시도해주세요. ($T_{loss}: $${lossAmount.toFixed(2)})`;
            break;
        case 'E-03': // 기타 시스템 에러
             userFacingMessage = `🚨 시스템 오류가 발생했습니다. 손실 추정치: $${lossAmount.toFixed(2)}. 관리자에게 문의하거나 잠시 후 다시 시도해주세요.`;
            break;
        default:
            userFacingMessage = "시스템 처리 중 알 수 없는 오류가 발생했습니다.";
    }

    return {
        lossAmount: lossAmount, // Float형으로 정확히 반환
        message: userFacingMessage,
        errorCode: errorType,
        isLossCalculated: true,
    };
};