// =============================================================
// e2e_comparison_suite.test.ts
// Purpose: V1.0 통합 비즈니스 계약서 기반의 모든 예외 처리 및 손실 기회비용($T_{loss}$) 계산 로직 E2E 검증.
// Target Function: processErrorAndLossMetric(errorContext)
// =============================================================

import { processErrorAndLossMetric } from '../services/error-handler'; // 🚨 테스트 대상 함수
import { ErrorContext } from '../types';

// Mocking Setup: 외부 의존성 제거 및 환경 격리 (Isolation)
// 실제 DB 호출이나 API 통신을 막고, 오직 비즈니스 로직만 테스트하도록 설정합니다.
jest.mock('../services/api-client', () => ({
    fetchRateLimitStatus: jest.fn(() => Promise.resolve({ limitRemaining: 0 })), // Mocking Rate Limit Check
}));

// Utility function to run the test and validate structure
const runTestScenario = (context: Partial<ErrorContext>, expectedTloss: number, expectedCode: string, expectedMessagePart: RegExp) => {
    console.log(`\n--- Running Scenario: ${expectedCode} ---`);
    const result = processErrorAndLossMetric(context as ErrorContext);

    // 1. T_loss 수치 검증 (Float형, 음수 불가)
    expect(result?.tLoss).toBeCloseTo(expectedTloss, 2);
    expect(typeof result?.tLoss).toBe('number');
    expect(result?.tLoss).toBeGreaterThanOrEqual(0);

    // 2. 에러 코드 및 메시지 검증 (계약서 기반)
    expect(result?.errorCode).toBe(expectedCode);
    expect(result?.lossReasonMessage).toMatch(expectedMessagePart);

    console.log(`✅ Test Passed: Code=${expectedCode}, T_loss=${result?.tLoss}`);
};


describe('E2E Comparison Suite - Loss Metric Calculation Validation (V1.0)', () => {
    // Mocking API 클라이언트의 전역 상태를 초기화합니다.
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should calculate $T_loss$ correctly for successful path (Baseline Test)', async () => {
        // 성공적인 시나리오에서는 T_loss가 0이어야 합니다.
        const mockContext: ErrorContext = {
            errorType: 'SUCCESS',
            details: { optimalCost: 100.0, currentValue: 100.0 },
            userCreditBalance: 50,
        };

        runTestScenario(mockContext, 0.0, 'E-OK', /성공적으로 처리되었습니다/);
    });


    // =============================================================
    // [BOUNDARY CONDITION TESTING] - V1.0 계약서 기반의 모든 실패 시나리오 테스트
    // =============================================================

    test('E-01: 크레딧 부족 (Insufficient Credit) - Paywall Trigger', async () => {
        // 목표: T_loss 계산 및 Pro Plan 업그레이드 CTA 유도 검증
        const mockContext: ErrorContext = {
            errorType: 'CREDIT_EXCEEDED', // E-01
            details: { optimalCost: 29.99, currentValue: 5.0 }, // Optimal vs Current (Loss)
            userCreditBalance: 4.99, // 부족한 크레딧
        };

        // Loss = Optimal_Cost - Current_Value => 29.99 - 5.0 = 24.99
        runTestScenario(mockContext, 24.99, 'E-01', /크레딧이 부족합니다/);
    });

    test('E-02: API 호출 제한 초과 (Rate Limit Exceeded) - Usage Cap Trigger', async () => {
        // 목표: 사용량 기반 T_loss 계산 및 재시도 유도 검증
        const mockContext: ErrorContext = {
            errorType: 'RATE_LIMIT_EXCEEDED', // E-02
            details: { optimalCost: 15.0, currentValue: 0 },
            userCreditBalance: 100, // 크레딧과는 무관하게 사용량 제한 위반
        };

        // T_loss = Optimal_Cost - Current_Value => 15.0 - 0 = 15.0
        runTestScenario(mockContext, 15.0, 'E-02', /API 호출 한도를 초과했습니다/);
    });

    test('E-03: 시스템 내부 오류 (Internal System Failure) - Generic Error Handling', async () => {
        // 목표: 예측 불가능한 에러도 구조화된 Loss Metric으로 포장하여 제시하는가 검증
        const mockContext: ErrorContext = {
            errorType: 'INTERNAL_ERROR', // E-03
            details: { optimalCost: 50.0, currentValue: 10.0 },
            userCreditBalance: 20,
        };

        // T_loss 계산 (비즈니스 가치 손실) = Optimal_Cost - Current_Value => 50.0 - 10.0 = 40.0
        runTestScenario(mockContext, 40.0, 'E-03', /시스템 처리 중 예상치 못한 오류가 발생했습니다/);
    });

    test('Edge Case: 모든 값이 NULL 또는 UNDEFINED일 때의 방어 로직 검증', async () => {
        // 목표: Nullish Coalescing과 Optional Chaining이 작동하여 NaN을 반환하지 않는지 검증.
        const mockContext: ErrorContext = {
            errorType: 'EDGE_CASE',
            details: { optimalCost: undefined, currentValue: null }, // 모든 것이 누락됨
            userCreditBalance: undefined,
        };

        // T_loss는 최소한 0으로 제한되어야 합니다. (방어 코드 검증)
        runTestScenario(mockContext, 0.0, 'E-NONE', /정보를 확보할 수 없습니다/);
    });

     test('Edge Case: Optimal Cost가 Current Value보다 낮은 경우 (Negative Loss 방지)', async () => {
        // 목표: T_loss는 최소한 0이어야 함을 재확인.
        const mockContext: ErrorContext = {
            errorType: 'EDGE_CASE',
            details: { optimalCost: 10.0, currentValue: 50.0 }, // Loss가 음수일 위험 상황
            userCreditBalance: 100,
        };

        // T_loss는 Math.max(0, Optimal - Current) 로 인해 0이 되어야 합니다.
        runTestScenario(mockContext, 0.0, 'E-NONE', /손실 비용은 발생하지 않았습니다/);
    });
});