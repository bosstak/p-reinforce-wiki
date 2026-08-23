# Advanced Report Technical Specification Document (v1.0)
**작성자:** 💼 현빈 (Head of Business)
**목표:** '단순 정보 제공'에서 벗어나, 사용자에게 '경제적 최적 대안 제시'를 통해 유료 결제(Advanced Report)로의 전환을 극대화하는 기술 명세서. 이 문서는 백엔드 개발 및 프론트엔드 인터랙션 구현의 최종 계약서입니다.

---

## 🌐 1. API Endpoint Specification

**Endpoint:** `GET /api/v1/advanced-report`
**요청 (Request) Parameters:**
| Parameter | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `origin_airport_code` | String | Yes | 출발 공항 IATA 코드. | INCN |
| `destination_area` | String | Yes | 최종 목적지 지역명 (예: 강릉, 부산). | Gangneung |
| `travel_date` | Date | Yes | 여행 예정 날짜. | 2025-10-01 |
| `is_premium_user` | Boolean | No | 현재 사용자가 유료 구독자인지 여부 (기본값: false). | false |

**응답 (Response) 구조:**
*   **Success (HTTP 200):** Report Data Object를 반환합니다. (아래 `ReportDataSchema` 참조)
*   **Failure (HTTP 4xx/5xx):** 표준 에러 메시지를 반환합니다.

### 💡 ReportDataSchema (JSON Structure)

```json
{
  "status": "success",
  "report_id": "unique-uuid-12345",
  "basic_data": {
    "summary": "요약 분석 내용: ...",
    "standard_route_cost": ₩150000,
    "estimated_time_minutes": 90
  },
  "advanced_analysis": {
    // 이 섹션은 Paywall 트리거가 통과했을 때만 채워집니다.
    "is_premium_content": true, 
    "optimal_route_description": "숨겨진 최적 루트 추천 내용...",
    "optimized_cost": ₩120000,
    "time_saving_minutes": 30,
    "hidden_opportunity_cost_detail": {
      "title": "놓치고 가는 기회비용: 시간과 돈의 손실",
      "calculation_basis": "표준 경로 대비 절약된 경제적 가치와 시간을 수치화합니다.",
      "calculated_loss_amount": ₩30000, // (최대값 - 최저가)
      "time_saved_value": "시간당 평균 임금(예: 2만원) 기반의 금전적 손실액 계산."
    }
  },
  "metadata": {
    "generated_at": "YYYY-MM-DDTHH:mm:ssZ",
    "version": "v1.0"
  }
}
```

---

## ⚙️ 2. Core Business Logic Flow (The Engine)

### A. Paywall Trigger Condition: Hidden Opportunity Cost (가장 중요!)

**목표:** 사용자에게 '현재 선택하는 경로'가 얼마나 비효율적인지(Hidden Cost/기회비용)를 수치로 인지시켜 유료 결제 동기를 극대화합니다.

**Trigger Logic Pseudocode:**
```pseudocode
FUNCTION Check_Paywall_Eligibility(basic_data, advanced_inputs):
    // 1. 데이터 검증: 모든 필수 입력값 존재 여부 확인 (null check)
    IF basic_data.standard_route_cost IS NULL OR basic_data.estimated_time_minutes IS NULL THEN
        RETURN {trigger: false, message: "데이터 불완전", error_code: 400}

    // 2. 최적 경로 계산 (Advanced Report API 호출 필요)
    optimal_result = Calculate_Optimal_Route(advanced_inputs)
    IF optimal_result IS NULL THEN
        RETURN {trigger: false, message: "최적 루트 산출 실패", error_code: 503}

    // 3. 비용-효율성 대비 분석 및 트리거 결정 (핵심 로직)
    cost_diff = basic_data.standard_route_cost - optimal_result.optimized_cost
    time_saved = basic_data.estimated_time_minutes - optimal_result.time_saving_minutes

    // [Paywall 발동 조건]
    // 1. 비용 차이(Cost Diff)가 최소 기준치(예: ₩20,000)를 초과하거나 AND
    // 2. 시간 절약(Time Saved)이 최소 기준치(예: 20분)를 초과하는 경우에만 발동.
    IF cost_diff >= 20000 OR time_saved >= 20 THEN
        RETURN {trigger: true, 
                message: "경제적 이득 발견! Advanced Report가 필요합니다.", 
                data: optimal_result}
    ELSE
        // Paywall 발동 조건 미달성 시, 고급 분석 섹션은 비워짐 (Placeholder).
        RETURN {trigger: false, message: "현재 경로로도 충분한 가치를 제공합니다.", data: null}
    END IF
```

### B. 시간적 기회비용 계산 모듈 상세 로직

**가정:** 사용자의 '시간당 평균 임금'을 $W$ (Worker Wage)로 가정합니다. (기본값 20,000원/시간 또는 333원/분).

**1. 시간적 손실액 ($L_{time}$):**
$$ L_{time} = (\text{Standard Time } - \text{Optimized Time}) \times W $$
*   *(예시)*: 90분 $\rightarrow$ 60분 절약 (30분). $30 \text{분} / 60 \text{분/시간} \times 20,000 \text{원/시간} = 10,000\text{원}$

**2. 재정적 손실액 ($L_{cost}$):**
$$ L_{cost} = \text{Standard Cost} - \text{Optimized Cost} $$
*   *(예시)*: ₩150,000 $\rightarrow$ ₩120,000 절약. $30,000\text{원}$

**3. 총 기회비용 ($L_{total}$):**
$$ L_{total} = L_{time} + L_{cost} $$
*   (이 값이 Paywall 카피의 핵심 수치로 사용됩니다.)

---

## ⚠️ 3. Error Handling & Exception Management (개발 필수 사항)

| 발생 상황 | HTTP Status Code | 클라이언트 응답 메시지 | 시스템 처리 방안 (Backend) | 개발자 참고사항 |
| :--- | :--- | :--- | :--- | :--- |
| **필수 파라미터 누락** | 400 Bad Request | "여행 계획 수립에 필수 정보가 부족합니다. 출발지, 목적지, 날짜를 모두 확인해 주세요." | 즉시 API 호출 중단 및 상세 유효성 검사 오류 코드 반환. | Front-end에서 사용자에게 구체적인 누락 필드를 하이라이트해야 함. |
| **API 서버 다운/시간 초과** | 503 Service Unavailable | "현재 경로 탐색 시스템에 일시적인 과부하가 발생했습니다. 잠시 후 다시 시도해 주세요." | 캐싱된 기본 데이터를 우선 제시하고, 고급 분석은 '실패'로 표시. 재시도 로직(Retry) 구현 필수. | `try-catch` 블록을 사용하여 503 에러 발생 시 사용자 경험 저하 방지. |
| **데이터 유효성 문제** | 422 Unprocessable Entity | "입력하신 날짜 또는 지역 코드가 유효하지 않습니다. (예: 여행 기간이 너무 짧거나, 존재하지 않는 공항 코드)" | 입력된 데이터의 형식(Format)과 범위를 검사하여 오류를 반환. | Date/Time Format Validation 및 Regex 기반 코드 체크가 필요함. |