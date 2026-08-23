# 💻 코다리에게 전달할 개발 지침 (V4.0)

**[목표]** Mock Service Layer의 통합 테스트를 비즈니스 관점의 핵심 예외 케이스(Edge Case)까지 커버하도록 확장합니다. 단순히 API가 깨지는 것을 넘어, 사용자의 '신뢰'와 '다음 행동 유도' 측면에서 실패하지 않도록 개선해야 합니다.

**[수정/추가 필요 로직 및 테스트 시나리오]**

1.  **Period Expiration (P0 Fix):**
    *   테스트 함수: `test_data_period_expired` 수정.
    *   요구사항: HTTP 500 대신, 비즈니스 예외 코드 (`412 Precondition Failed`)를 반환하도록 백엔드 로직을 수정해야 합니다. 이 응답에는 반드시 '정보 결핍(Loss Aversion)' 메시지 구조가 포함되어야 합니다.
    *   출력 데이터: `{ "status": "failure", "code": 412, "message_key": "DATA_EXPIRED" }` 등의 구조를 확정하고 테스트합니다.

2.  **No Optimal Route Found (P1 New):**
    *   테스트 함수: `test_no_optimal_route` 신규 추가.
    *   요구사항: 모든 조건이 만족되는 최적 경로가 없을 때, 시스템은 가장 '차선책(Fallback)'이 되는 경로를 계산하여 제시해야 합니다. (즉, 실패 처리가 아닌, 대안을 제시하는 성공 케이스로 처리).

3.  **Over-Constrained Request (P1 New):**
    *   테스트 함수: `test_over_constrained_request` 신규 추가.
    *   요구사항: 모든 조건 조합이 불가능할 때, 오류 메시지 대신 '가장 비효율적인 원인'을 지목하고 사용자가 조건을 조정하도록 유도하는 응답 구조를 구현합니다. (예: "현재 설정된 예산 범위로는 이동 불가. 예산을 20% 상향하면 가능성이 있습니다.")

**[요청]**
위의 세 가지 시나리오(P0 수정, P1 신규 추가 2개)를 반영하여 `test_mock_service_layer.py` 스크립트를 업데이트하고 재실행할 준비를 해 주세요.