# 📊 Advanced Report: 비교 제시 로직 안정화 보고서 (v1.0)

**작성 목적:**
본 문서는 '최적 경로 vs 일반 경로' 비용 계산 로직(`calculateComparison`)의 아키텍처 개선 과정을 기록하고, 향후 유지보수 및 테스트 자동화를 위한 표준 가이드라인을 제공합니다. 핵심은 **기술적 오류(Technical Failure)**를 방지하여 시스템 신뢰도를 최상으로 끌어올리는 것입니다.

**✅ 1. 변경된 로직의 아키텍처 개선 사항 (Architectural Improvements)**
| 영역 | 기존 문제점 | 해결책 및 구현 방식 | 기술적 이점 |
| :--- | :--- | :--- | :--- |
| **입력 유효성 검증** | `null` 또는 정의되지 않은 입력 객체에 대한 방어 부재. | 1차 가드 로직 추가: 함수 시작 시 `!inputData || typeof inputData !== 'object'`를 체크하고 명시적 오류 값 반환. | 런타임 에러(TypeError) 발생 가능성을 제거하고 예측 가능한 실패 경로를 제공함. |
| **데이터 접근 안정성** | 중첩 객체 접근 시 `Cannot read properties of undefined` 오류 발생 위험. | Optional Chaining (`?.`) 도입: `data?.metrics?.bestAvailable`와 같이 구조적 안전성을 확보하여 코드를 작성. | 깊은 곳에 있는 데이터가 누락되어도 프로그램이 멈추지 않고 다음 단계로 진행함 (Fail-Safe). |
| **계산 로직 안정성** | 특정 계산 함수 내부에서 예상치 못한 타입 변환 또는 수학적 에러 발생 위험. | `try...catch` 블록 사용 및 Nullish Coalescing (`??`) 활용: 비용 계산 결과가 실패할 경우, 무한대(`Infinity`)를 반환하도록 강제 처리. | 데이터 누락을 단순 오류가 아닌 '비용 산출 불가'라는 비즈니스 상태로 정의하여 UI에 명확히 전달 가능함. |

**📐 2. 경계 조건(Edge Case) 및 예외 처리 매트릭스 (Test Matrix)**
향후 개발팀은 아래 매트릭스를 기반으로 단위 테스트 케이스를 작성해야 합니다.

| ID | 시나리오 설명 (Input State) | 예상되는 입력 값 | 기대 동작 (Expected Behavior) | 반환 값 (`optimalPathCost`, `standardPathCost`) | 주석/참고 사항 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **E01** | **완벽한 데이터 제공 (Happy Path)** | `{ metrics: { bestAvailable: 10, average: 20 } }` | 성공적으로 비용 계산 및 반환. | `(Math.round(10*1.1), Math.round(20*1.05))` | 표준 운영 모드 테스트. |
| **E02** | **Input Data 누락 (Null)** | `null` 또는 `undefined` | 1차 가드 로직 발동. 에러 로그 출력. | `(Infinity, Infinity)` | 가장 기본적이고 치명적인 입력 오류 방어. |
| **E03** | **필수 필드 누락 (Undefined)** | `{ metrics: {} }` 또는 `{}` | Optional Chaining에 의해 해당 값 접근 실패 처리. | `(Infinity, Infinity)` | API 스키마가 일부만 전송되었을 때 대응. |
| **E04** | **비정상 타입 입력 (String/Boolean)** | `{ metrics: { bestAvailable: "abc" } }` | `typeof` 검사 실패 처리 및 계산 함수 내 오류 포착. | `(Infinity, Infinity)` | 데이터 스키마를 위반한 잘못된 데이터가 들어왔을 때 대응. |
| **E05** | **계산 로직 자체 오류 (Internal Error)** | 정상 데이터이나, 내부 API 호출 등에서 예외 발생 가정. | `try...catch` 블록이 포착하여 실패 처리하고 무한대 반환. | `(Infinity, Infinity)` | 비즈니스 로직 복잡도 증가에 따른 방어 설계. |

**📝 3. 유지보수 가이드라인 (Maintenance Notes)**
1.  **원칙**: 모든 외부 입력 값은 **신뢰하지 않습니다.** 항상 Optional Chaining (`?.`)과 Nullish Coalescing (`??`)을 사용하세요.
2.  **커밋 규칙**: 이 로직 수정 시, 반드시 해당 기능의 테스트 케이스(`test/comparisonService.test.ts` 등)를 함께 업데이트해야 합니다.
3.  **주석 목적**: 주석은 '무엇을' 했는지(WHAT)가 아니라, **'왜 이렇게 해야 하는지' (WHY)**에 초점을 맞춥니다. 특히 `?? Infinity` 와 같은 설계 결정의 이유를 명확히 기록합니다.