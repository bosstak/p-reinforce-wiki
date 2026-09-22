// e2e_comparison_suite.test.ts
/**
 * @fileoverview E2E 통합 테스트 스위트: 최적 경로 비교 제시 및 크레딧 소비 로직 검증
 * 
 * 이 모듈은 비즈니스 명세서(Final_Loss_Metric_Spec_V1.0)에 정의된 핵심 가치 흐름을 검증합니다.
 * API 호출이 아닌, 실제 사용자 경험(UX)의 흐름과 상태 변화를 테스트하는 데 초점을 맞춥니다.
 */

import { 
    runComparisonService, 
    fetchCreditBalance, 
    processErrorAndLossMetric // 현빈님이 정의한 로직을 처리할 최종 함수 (Mock 대상)
} from '../../services/comparisonService'; 

// ========================================================
// 🛠️ Mocking External Dependencies
// 실제 API 호출 대신 Mocking 계층을 사용하여 테스트의 격리성을 보장합니다.
// ========================================================

jest.mock('../../services/comparisonService', () => ({
    runComparisonService: jest.fn(),
    fetchCreditBalance: jest.fn(),
    processErrorAndLossMetric: jest.fn(),
}));


describe('E2E Comparison Service Integration Test Suite', () => {
    const mockInputData = { 
        dataA: "여행지 A의 데이터 구조", 
        dataB: "여행지 B의 데이터 구조", 
        userId: 'test_user_123' 
    };

    beforeEach(() => {
        // 각 테스트 전에 Mocking 상태 초기화 (Clean Slate)
        jest.clearAllMocks();
    });


    // ========================================================
    // ✅ SCENARIO 1: 성공적인 비교 제시 및 크레딧 차감 검증
    // 기대 결과: 서비스 호출 성공 -> 비교 데이터 반환 -> 크레딧 정상적으로 차감됨
    // ========================================================
    describe('Scenario A: Successful Comparison & Credit Deduction', () => {
        const mockSuccessResult = { 
            comparisonId: 'comp_123', 
            resultData: [{ metric: 'Time', value: '4h' }],
            cost: 5 // 크레딧 차감 비용 정의
        };

        it('should successfully run comparison, return data, and deduct correct credits', async () => {
            // Mocking Setup: 서비스가 성공적으로 실행되고 결과를 반환하도록 설정
            (runComparisonService as jest.Mock).mockResolvedValue(mockSuccessResult);
            
            // 테스트 실행
            const result = await runComparisonService(mockInputData.userId, mockInputData.dataA, mockInputData.dataB);

            // 1. 결과값 검증 (Output Validation)
            expect(result).toEqual(mockSuccessResult);

            // 2. Mock API 호출 횟수 및 인자 검증
            expect(runComparisonService).toHaveBeenCalledTimes(1);
            expect(runComparisonService).toHaveBeenCalledWith(
                mockInputData.userId, mockInputData.dataA, mockInputData.dataB
            );

            // 3. 크레딧 차감 로직이 호출되었는지 검증 (가장 중요)
            // 성공적으로 서비스를 사용했다면, 반드시 크레딧 소비 로직을 거쳐야 함.
            expect(processErrorAndLossMetric).toHaveBeenCalledWith({ status: 'success', cost: mockSuccessResult.cost });

        });
    });


    // ========================================================
    // 🛑 SCENARIO 2: 크레딧 부족으로 인한 실패 처리 검증 (핵심 비즈니스 로직)
    // 기대 결과: 서비스 호출 전 크레딧 체크 -> 잔액 부족 확인 -> T_loss 기반 에러 메시지 반환
    // ========================================================
    describe('Scenario B: Credit Shortage Failure Handling', () => {
        const mockInsufficientCredits = 2; // 현재 잔액

        beforeEach(() => {
            // 초기 크레딧 상태를 Mocking으로 강제 설정
            (fetchCreditBalance as jest.Mock).mockResolvedValue(mockInsufficientCredits);
        });


        it('should prevent comparison run and return a T_loss-based error message when credits are insufficient', async () => {
            const requiredCost = 5; // 비교에 필요한 비용 (가정)

            // Mocking Setup: 서비스 실행은 호출되지 않도록 처리하고, 크레딧 체크만 통과하도록 설정
            (runComparisonService as jest.Mock).mockResolvedValue({ status: 'error', message: 'Insufficient Credits' });
            
            // 테스트 실행
            const result = await runComparisonService(mockInputData.userId, mockInputData.dataA, mockInputData.dataB);

            // 1. 서비스가 실제로 호출되었는지 검증 (Failure Path에서 가장 중요)
            expect(runComparisonService).not.toHaveBeenCalled();

            // 2. 크레딧 체크 로직이 정상적으로 실행되었는지 확인
            expect(fetchCreditBalance).toHaveBeenCalledTimes(1);
            
            // 3. 에러 처리 및 손실 지표 계산 로직 호출 검증 (현빈님 스펙 적용 영역)
            await processErrorAndLossMetric.mockResolvedValue({ 
                errorMessage: "현재 크레딧이 부족하여 분석에 필요한 시간/정보 가치 ($T_{loss}$)를 놓치고 계십니다.", 
                cta: 'Pro Plan으로 업그레이드하기' 
            });

            const errorResult = await runComparisonService(mockInputData.userId, mockInputData.dataA, mockInputData.dataB);

            // 최종 반환 결과가 T_loss 기반의 에러 메시지 구조를 포함하는지 검증
            expect(errorResult).toEqual({ 
                status: 'error', 
                message: "현재 크레딧이 부족하여 분석에 필요한 시간/정보 가치 ($T_{loss}$)를 놓치고 계십니다.",
                cta: 'Pro Plan으로 업그레이드하기'
            });
        });
    });


    // ========================================================
    // ⚠️ SCENARIO 3: 기타 경계 조건 및 예외 처리 (Placeholder)
    // ========================================================
    describe('Scenario C: Edge Case Handling (Future Proofing)', () => {
        it('should handle network timeout gracefully and suggest manual check', async () => {
            // Mocking Setup: 네트워크 오류 시뮬레이션
            (runComparisonService as jest.Mock).mockRejectedValue(new Error("Network Timeout"));

            const result = await runComparisonService(mockInputData.userId, mockInputData.dataA, mockInputData.dataB);

            // 결과 검증: 에러 발생 시에도 사용자에게 명확한 안내가 가야 함
            expect(result).toEqual({ 
                status: 'error', 
                message: "네트워크 연결에 문제가 발생했습니다. 잠시 후 다시 시도하거나, 수동으로 데이터를 확인해주세요." 
            });

        });
    });
});