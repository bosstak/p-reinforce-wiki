# 🛡️ Advanced Report 최종 통합 API 계약서 및 테스트 시나리오 V3.0
**[작성자]: 현빈 (Business Strategist) | [최종 검토일]: 2026-08-23**

## 1. 개요 및 목표
본 문서는 'Advanced Report'의 백엔드 API 통합 테스트를 위한 최종 계약서입니다. 프론트엔드 개발자가 Mocking을 넘어 실제 데이터 흐름(Happy Path)과 예외 상황(Failure Path) 모두에 대비할 수 있도록 모든 KPI, 데이터 타입, 에러 코드 및 대체 값(Fallback Value)을 정의합니다.

## 2. API 엔드포인트 및 요청 스키마 (Request Schema)
**Endpoint:** `/api/v1/advanced_report`
**Method:** `POST`

| 파라미터 | 설명 | 타입 | 필수 여부 | 예시 값 |
| :--- | :--- | :--- | :--- | :--- |
| `origin_location` | 출발지 (JSON Object) | Object | ✅ | `{ "lat": 37.5, "lon": 127.0 }` |
| `destination_location` | 도착지 (JSON Object) | Object | ✅ | `{ "lat": 37.4, "lon": 126.9 }` |
| `travel_date` | 여행 날짜 | String | ✅ | YYYY-MM-DD |
| `is_premium_user` | 유료 플랜 사용자 여부 (트리거 조건) | Boolean | ❌ | `true` / `false` |

## 3. 응답 스키마 (Response Schema)

### 🚀 A. 성공 응답 (Status Code: 200 OK - Happy Path)
성공 시, 사용자가 '손실'을 인지할 수 있는 비교 데이터 세트(Standard vs. Recommended)가 포함되어야 합니다.

```json
{
  "status": "success",
  "report_id": "UUID-12345",
  "summary": {
    "total_time_saved_minutes": 45, // 총 시간 절약분 (KPI)
    "estimated_cost_saving_usd": 75.50, // 추정 비용 절감액 (KPI)
    "hidden_risk_score": "High", // 위험도 인지 지표 (KPI)
  },
  "comparison_data": [
    {
      "category": "Standard Route (Baseline)",
      "details": {
        "total_time_minutes": 150,
        "estimated_cost_usd": 120.00,
        "transfer_penalty_time_minutes": 30 // 신규 KPI: 환승 페널티 시간 (분)
      },
      "risk_summary": "High Congestion Risk", // 위험 요약 카피
    },
    {
      "category": "Recommended Route (Optimal)",
      "details": {
        "total_time_minutes": 105,
        "estimated_cost_usd": 95.00,
        "transfer_penalty_time_minutes": 12 // 신규 KPI: 환승 페널티 시간 (분)
      },
      "risk_summary": "Optimal Flow Achieved",
    }
  ],
  "kpi_detail": {
    "poi_proximity_score": 0.85, // 신규 KPI: POI 근접성 점수 (0~1)
    "best_transfer_time_window": ["09:00", "17:00"] // 최적 이동 시간대
  }
}
```

### 📉 B. 실패 응답 및 에러 핸들링 (Failure Path)
개발자가 반드시 대비해야 할 모든 예외 상황과 대체 값(Fallback Value)을 정의합니다. 이 스키마는 **프론트엔드에서 '데이터 부재'를 마주했을 때의 사용자 경험 로직**에 직접 연결됩니다.

| HTTP Status | 에러 코드 (Internal) | 설명 및 발생 조건 | 프론트엔드 대체 값/처리 로직 |
| :--- | :--- | :--- | :--- |
| **400 Bad Request** | `MISSING_PARAM` | 필수 요청 파라미터 누락 (`origin`, `destination`, `date` 등). | 사용자에게 명확한 가이드라인 제시. "출발지/도착지를 모두 입력해주세요." (API 에러 메시지 직접 표시 금지) |
| **401 Unauthorized** | `AUTH_FAILED` | API 키 또는 인증 토큰 만료/미제공. | 사용자에게 '서비스 연결 오류'와 함께 재시도를 유도하며, 비즈니스 로직 설명(Paywall 카피)은 제한적으로 노출. |
| **500 Internal Server Error** | `SYSTEM_FAILURE` | 서버 내부 처리 실패 (DB 접근 불가 등). | 사과 문구 대신, "현재 서비스 이용에 어려움이 있습니다. 잠시 후 다시 시도해주세요."와 함께 대체 경로 정보(예: 공식 웹사이트 링크)를 제공. **추가 KPI 노출 금지.** |
| **Data Missing/Empty** | `NO_DATA_AVAILABLE` | 요청한 구간의 데이터 자체가 없을 때 (예: 매우 희귀한 루트). | 'Advanced Report'는 비활성화되고, 기본 정보만 제시하는 메시지를 띄우며, 대신 일반 지도 검색 기능으로 유도. (수익화 기회 상실 방지) |

## 4. 핵심 KPI 로직 및 Paywall 트리거 조건
*   **[Hidden Cost Trigger]**: `Standard Route`와 `Recommended Route` 간의 `(120.00 - 95.00)`과 같이, **추천 경로가 제시하는 '경제적 이득' 수치(USD 또는 시간)**를 계산하여 가장 큰 시각적 대비 효과로 강조해야 합니다.
*   **[Paywall Trigger Condition]**: 만약 `is_premium_user`가 `false`이고, `total_time_saved_minutes`가 20분 이상일 경우: **"최대 절감 기회 비용을 확인하세요!"**라는 문구와 함께 유료 플랜 구매 CTA를 노출합니다.