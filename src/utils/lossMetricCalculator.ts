/**
 * @fileoverview $T_{loss} = Optimal Cost - Current Value 공식을 사용하여 손실 기회비용을 계산하고,
 * 에러 상황에 맞는 사용자 친화적 경고 메시지를 생성하는 핵심 유틸리티.
 */

export type LossCalculationResult = {
    tLoss: number; // Float형으로 반환되는 놓치고 있는 기회비용
    message: string; // 사용자에게 보여줄 경고/위기감 조성 메시지
};

/**
 * 비즈니스 에러 상황을 분석하여 정량화된 손실 기회비용(T_loss)과 사용자 안내 메시지를 계산합니다.
 * @param errorType 발생한 오류의 종류 (예: 'CREDIT_EXHAUSTED', 'RATE_LIMIT')
 * @param optimalCost 최적의 가치를 얻기 위해 사용자가 지불해야 할 이상적인 비용 (Optimal Cost)
 * @param currentValue 현재 상태에서 확보된 가치 또는 남아있는 자원 (Current Value)
 * @returns TLoss와 경고 메시지가 포함된 LossCalculationResult 객체.
 */
export function processErrorAndLossMetric(
    errorType: 'CREDIT_EXHAUSTED' | 'API_RATE_LIMIT' | 'GENERAL_ERROR',
    optimalCost: number,
    currentValue: number
): LossCalculationResult {

    // 1. T_loss 계산 (공식 준수)
    const tLoss = Math.max(0, optimalCost - currentValue); // 손실액은 음수가 될 수 없으므로 Max(0, ...) 적용

    let messageBase = `현재 상태로 분석을 완료하셨습니다. 하지만 최적의 경로를 확보하기 위해서는 추가적인 정보가 필요합니다.`;
    let errorDetail = '';

    // 2. 에러 타입별 상세 메시지 구성 (위기감 조성)
    switch (errorType) {
        case 'CREDIT_EXHAUSTED':
            messageBase = `❌ 분석 불가: Insight Credit이 부족하여 최적의 경로를 도출할 수 없습니다.`;
            errorDetail = `현재 잔여 크레딧 ${currentValue}로는 필수 데이터셋 접근 및 고급 비교가 불가능하며, 놓치고 있는 기회비용은 최소 $${tLoss.toFixed(2)}입니다.`;
            break;

        case 'API_RATE_LIMIT':
            messageBase = `⚠️ 시스템 경고: API 호출 제한에 도달했습니다. 데이터 흐름의 안정성이 위협받습니다.`;
            errorDetail = `지정된 시간 내 ${currentValue}개의 요청만 처리 가능합니다. 더 많은 데이터를 분석하려면 Pro Plan 구독이 필수입니다. 놓치고 있는 기회비용은 최소 $${tLoss.toFixed(2)}입니다.`;
            break;

        case 'GENERAL_ERROR':
            messageBase = `🚨 데이터 손실 경고: 예상치 못한 기술적 오류가 발생했습니다. 분석을 중단합니다.`;
            errorDetail = `기술적 실패 자체를 비용으로 간주할 수 없습니다. 이 문제를 해결하고 완전한 데이터를 확보하려면 전문가의 검토 또는 유료 업그레이드가 필요하며, 놓치고 있는 기회비용은 최소 $${tLoss.toFixed(2)}입니다.`;
            break;

        default:
            messageBase = `🚨 오류 발생: 알 수 없는 문제로 인해 분석이 중단되었습니다.`;
            errorDetail = '';
    }

    // 최종 메시지 반환 (위기감 + 구체적 손실 수치)
    const finalMessage = `${messageBase}\n\n[세부 정보]: ${errorDetail}`;

    return {
        tLoss: parseFloat(tLoss.toFixed(2)), // 소수점 둘째 자리 고정
        message: finalMessage,
    };
}