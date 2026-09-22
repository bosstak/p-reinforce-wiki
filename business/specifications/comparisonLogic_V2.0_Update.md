# 🚀 bosstak Advanced Report & Comparison Logic Specification (V2.0 Update)

## 🎯 목적: '실패' 중심에서 '지속적 가치 관리' 중심으로 수익 모델 전환
단순히 기술적 오류를 Handing 하는 것을 넘어, 사용자의 지속적인 행동(Engagement)을 유도하고 예측 가능한 반복 매출(MRR) 구조를 확립하는 것이 목표.

---

## 💡 핵심 변경 사항: Insight Credit 및 Pre-emptive Risk Simulation 도입

### 1. [New] Insight Credit System (자원 기반 제한 로직)
*   **개념:** 사용자가 서비스를 이용할 때마다 'Insight Credit'을 소모하며, 이는 유료 구독의 주된 동기 부여 수단이 된다.
*   **로직 Flow:**
    1.  사용자 요청 발생 $\rightarrow$ 시스템은 필수 Insight Credit (IC) 필요 여부를 체크한다.
    2.  `IF User.Credit > 0`: 비교 로직 실행 및 결과 제공. (IC - 1 소모)
    3.  `ELSE IF User.Credit = 0`: **Paywall Trigger 발생.**
        *   **Display Message:** "분석 깊이를 더하기 위해서는 Insight Credit이 필요합니다. Pro Plan으로 리스크를 관리하세요."
        *   *(핵심: 기술적 에러가 아닌 '사용 가능 자원'의 고갈로 인지시켜야 함.)*

### 2. [New] Pre-emptive Risk Simulation (Pro Tier Exclusive)
*   **기능:** 단순한 과거 경로 비교를 넘어, 사용자가 **미리 설정할 수 있는 미래 시나리오(예: '다음 달 예상되는 기후 변화', '특정 이벤트 개최 여부')**가 여행 계획에 미치는 잠재적 손실($T_{potential}$)을 예측한다.
*   **API/Data Requirement:** 기존 `comparisonService`에 다음 파라미터 추가 필요.
    *   `simulationScenario: string`: 시뮬레이션의 외부 변수 (예: "강풍", "성수기 폭주").
    *   `riskWeightingFactor: number`: 해당 변수가 비용/시간에 미치는 가중치 계수.

### 3. [Update] Error Handling Logic (최종 $T_{loss}$ 포지셔닝)
모든 에러 메시지는 단순한 오류가 아닌, '손실을 방어할 수 있는 서비스'로의 전환점을 제시해야 한다.

| 기존 상황 | 이전 로직 (Error-Based) | **업데이트된 로직 (Loss/Opportunity Based)** | 비즈니스 목표 |
| :--- | :--- | :--- | :--- |
| API 요청 초과 | "API 요청이 초과되었습니다." | "**⚠️ 분석 기회 손실 경고:** 최대 $X$시간의 데이터 추적을 놓치셨습니다. Pro Plan으로 모든 잠재 리스크를 차단하세요." | 사용자가 '놓친 가치'에 집중하게 함. |
| 데이터 누락/불완전 | "필수 데이터를 입력해 주세요." | "**❌ 분석 불확실성 경고:** 현재 정보로는 최적 경로의 $T_{loss}$가 계산 불가합니다. 전문 컨설팅(Pro)이 필요합니다." | 해결책을 '유료 전문가'로 유도. |
| 비교 로직 실패 | "비교 계산에 실패했습니다." | "**⚠️ 데이터 Gap 경고:** 현재 데이터만으로는 비용 효율성 비교에 한계가 있습니다. 보완 데이터를 구매하여 분석의 완성도를 높이세요." | 추가 정보/데이터 판매 기회 창출. |

---