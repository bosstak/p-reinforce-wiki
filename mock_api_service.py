# mock_api_service.py
import random
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field
from typing import List, Optional

# --- 1. 데이터 스키마 정의 (Pydantic Models) ---

class ReportComparison(BaseModel):
    """Advanced Report의 비교 UI에 사용될 핵심 KPI 결과 구조."""
    kpi_name: str = Field(description="KPI 이름 (예: 시간적 기회비용, 이동 거리)")
    standard_value: float = Field(description="표준 경로 값")
    recommended_value: float = Field(description="추천 경로 값")
    saving_percentage: float = Field(description="절감된 비율 (%)")
    is_critical: bool = Field(description="핵심 비교 지표 여부 (True면 Paywall 트리거 가능성 증가)")

class AdvancedReportResponse(BaseModel):
    """최종 API 응답 스키마 V3.0을 반영한 최상위 구조."""
    report_id: str
    status: str = Field("SUCCESS", description="처리 상태 (SUCCESS, FAILURE, EXCEPTION 등)")
    total_saving_minutes: float = 0.0 # 최종 통합 지표
    comparison_data: List[ReportComparison]
    raw_metadata: dict = Field(default_factory=dict)


# --- 2. FastAPI 앱 초기화 및 엔드포인트 정의 ---

app = FastAPI(title="Advanced Report Mock API Service")

@app.get("/")
def root():
    """서비스 기본 상태 확인."""
    return {"status": "Mock API Running", "version": "V3.0"}


# @app.post("/advanced-report/compare")를 사용하지만, 테스트 용이성을 위해 GET으로 구현하고 쿼리 파라미터를 받음.
@app.get("/advanced-report/compare", response_model=AdvancedReportResponse)
async def compare_reports(
    start_date: str = Query(..., description="필수 출발 날짜 (YYYY-MM-DD)"),
    end_date: str = Query(..., description="필수 도착 날짜 (YYYY-MM-DD)"),
    destination_id: Optional[str] = Query(None, description="목적지 ID")
):
    """
    Advanced Report의 비교 분석을 시뮬레이션합니다. 
    모든 성공/실패/예외 케이스를 여기서 분기하여 처리합니다.
    """
    print(f"\n[API Call Received] Start: {start_date}, End: {end_date}, Dest: {destination_id}")

    # ===============================================
    # ⚠️ [STEP 1: 비즈니스 예외 처리 (Edge Case Handling)]
    # ===============================================
    if not start_date or not end_date:
        # 현빈님 정의에 따른 필수 파라미터 누락 처리 시뮬레이션
        raise HTTPException(
            status_code=400, 
            detail={
                "error_code": "INVALID_INPUT", 
                "message": "분석을 위해 출발일과 도착일을 모두 지정해 주세요.",
                "suggested_fields": ["start_date", "end_date"]
            }
        )

    # ===============================================
    # ⚠️ [STEP 2: 시스템 오류 시뮬레이션 (System Failure)]
    # ===============================================
    # 예시: 특정 목적지 ID를 입력했을 때, 백엔드 서비스 장애가 발생한다고 가정
    if destination_id == "SERVICE_DOWN":
        raise HTTPException(status_code=503, detail={"error_code": "SERVICE_UNAVAILABLE", "message": "데이터 제공 서비스에 일시적인 문제가 발생했습니다."})

    # ===============================================
    # ✅ [STEP 3: 성공 경로 (Happy Path) 시뮬레이션]
    # ===============================================

    if start_date and end_date and destination_id == "VALID":
        print("[SUCCESS PATH]: 데이터 분석 및 응답 생성 시작.")
        
        # Mock KPI 데이터 생성 (랜덤성 부여하여 테스트 다양화)
        comparison_data = [
            ReportComparison(kpi_name="시간적 기회비용", standard_value=12.5, recommended_value=8.9, saving_percentage=28.8, is_critical=True),
            ReportComparison(kpi_name="총 이동 거리 (km)", standard_value=350.0, recommended_value=290.0, saving_percentage=17.1, is_critical=False),
            ReportComparison(kpi_name="예상 비용 절감액", standard_value=180.0, recommended_value=155.0, saving_percentage=14.2, is_critical=True)
        ]

        # 최종 통합 지표 계산 (합산 로직 시뮬레이션)
        total_saving = sum(d.saving_percentage for d in comparison_data if d.is_critical) / 3
        
        return AdvancedReportResponse(
            report_id=f"REPORT_{start_date}_{end_date}",
            status="SUCCESS",
            total_saving_minutes=round(total_saving, 2),
            comparison_data=comparison_data,
            raw_metadata={"source": "MockServiceLayer"}
        )

    # 기타 조건에 대한 기본 처리 (만약 위의 로직을 타지 않는 경우)
    return AdvancedReportResponse(
        report_id="N/A",
        status="UNKNOWN",
        total_saving_minutes=0.0,
        comparison_data=[],
        raw_metadata={"message": "조건 불일치"}
    )

# ===============================================
# 💡 테스트 실행 안내 (실제 개발 환경에서 사용자가 run 해야 함)
# ===============================================
# pip install fastapi uvicorn pydantic
# uvicorn mock_api_service:app --reload
# ===============================================