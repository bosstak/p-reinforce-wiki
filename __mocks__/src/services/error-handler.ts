// __mocks__/src/services/error-handler.ts
export const processErrorAndLossMetric = jest.fn((errorType: string, optimalCost: number, currentValue: number) => {
    console.log(`[Mocking] Called with Error Type: ${errorType}`);
    if (errorType === 'E-01') { // 크레딧 부족 Mock 성공 케이스
        return { lossAmount: 25.00, message: "🚨 놓치고 있는 기회비용...", errorCode: 'E-01', isLossCalculated: true };
    }
    if (errorType === 'E-02') { // Limit 초과 Mock 성공 케이스
        return { lossAmount: 0.0, message: "⚠️ API 호출 제한 초과로 인해...", errorCode: 'E-02', isLossCalculated: false };
    }
    // 기본 실패/예외 처리 Mock
    return { lossAmount: 10.00, message: "❌ 일반적인 테스트 실패 Mock 값입니다.", errorCode: 'TEST_FAIL', isLossCalculated: true };
});