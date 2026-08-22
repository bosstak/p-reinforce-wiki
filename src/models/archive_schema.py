from typing import List, Literal, Optional
from pydantic import BaseModel, Field
from datetime import time

# --- Enum 및 타입 정의 (데이터 일관성 확보) ---
SpotType = Literal["ATTRACTION", "FOOD", "HISTORY", "TRANSPORT"]
RegionName = str # 예: 부산, 경주, 전주 등 지역 단위

class Spot(BaseModel):
    """
    [공통 스팟 정보] 모든 유형의 장소에 적용되는 기본 데이터 구조.
    외국인 관광객의 접근성을 높이기 위한 영문 명칭 및 다국어 지원 필드 포함.
    """
    spot_id: str = Field(..., description="고유한 장소 식별자 (예: ICN_GATEWAY, JEONJU_STATION, SPOT_HANOK_VILLAGE)")
    name_ko: str = Field(..., max_length=100, description="한국어 명칭")
    name_en: Optional[str] = Field(None, max_length=100, description="영문 명칭 (외국인 관광객용)")
    region: RegionName = Field(..., description="소속 지역 (전국, 서울, 전주, 부산, 강릉 등)")
    spot_type: SpotType = Field(..., description="SPOT 유형 (ATTRACTION, FOOD, HISTORY, TRANSPORT)")
    description: Optional[str] = Field(None, max_length=500)
    # 📍 감성 스토리텔링 포인트 (글로벌 문화 비교 및 감성 가이드)
    storytelling_point: Optional[str] = Field(None, max_length=300)
    # ⭐ 핵심 가치 및 특징 (검색 키워드화에 용이)
    keywords: List[str] = Field(..., description="핵심 해시태그 또는 검색어 리스트")

class TransportationLink(BaseModel):
    """
    두 Spot 간의 이동 정보를 구조화. 
    외국인의 교통 공포를 해소하기 위한 단계별 탑승/환승 안내(transit_step_guide) 포함.
    """
    link_id: str = Field(..., description="고유한 경로 식별자 (예: LINK_ICN_TO_SEOUL)")
    start_spot_id: str = Field(..., description="이동 시작점 Spot ID (FK)")
    end_spot_id: str = Field(..., description="이동 도착점 Spot ID (FK)")
    mode: Literal["BUS", "SUBWAY", "WALKING", "TAXI"] = Field(..., description="주요 교통수단")
    estimated_duration_min: int = Field(..., gt=0, description="예상 소요 시간 (분 단위)")
    best_route_notes: Optional[str] = Field(None, max_length=150, description="최적 경로 이용 팁")
    # 🚇 외국인 전용 교통 단계별 상세 팁 (카드 구매, 플랫폼, 버스 번호 등)
    transit_step_guide: Optional[str] = Field(None, description="외국인을 위한 상세 승하차/환승/플랫폼 팁 (A to Z)")

class CuisineSpot(BaseModel):
    """
    음식점 정보 전용 구조.
    외국인이 지방 노포에서도 쉽게 주문하고 한국 식문화를 제대로 즐길 수 있도록 지원.
    """
    spot_id: str = Field(..., description="고유한 장소 식별자 (FK to Spot)")
    main_dish: Optional[str] = Field(None, max_length=50, description="대표 음식명 (예: 전주비빔밥, 삼겹살, 육회)")
    price_range_krw: Literal["LOW", "MID", "HIGH"] = Field(..., description="가격대")
    operating_hours: Optional[str] = Field(None, max_length=50, description="영업 시간 예시 (ex. 10:00-22:00)")
    # 🥢 외국인 전용 '먹는 법(How to Eat)' & 식문화 가이드
    how_to_eat_guide: Optional[str] = Field(None, description="문화적 식사 방법 (예: 쌈 싸먹기 순서, 육회 비비는 법, 소스 조합)")
    # 📋 사진 없는 메뉴판 주문 팁 (1인분/2인분 조합, 맵기 조절 실전문구)
    ordering_tip_for_foreigners: Optional[str] = Field(None, description="외국어 메뉴판 없는 곳에서도 쉽게 주문하는 팁 및 추천 세트")

class JourneyPlan(BaseModel):
    """
    여행 코스 전체를 정의하는 상위 구조.
    소액 유료 결제(Pro/Premium) 기반 초개인화 맞춤형 일정 생성 지원.
    """
    journey_id: str = Field(..., description="고유한 여정 플랜 ID")
    theme: str = Field(..., max_length=100, description="여행 테마 (ex. 서울에서 전주로 떠나는 2박 3일 힐링&미식 완벽 코스)")
    duration_hours: float = Field(..., gt=0) # 총 예상 시간
    sequence_of_spots: List[str] = Field(..., description="방문 SPOT ID 순서")
    price_tier: Optional[Literal["FREE_BASIC", "PAID_PRO", "VIP_CONCIERGE"]] = Field("FREE_BASIC", description="수익화 티어")

# --- API 통합을 위한 검색 엔드포인트 모델 (예시) ---

class ArchiveSearchQuery(BaseModel):
    """
    사용자로부터 들어오는 검색 쿼리 데이터 구조.
    검색 필드를 분리하여 다차원적 검색이 가능하도록 설계함.
    """
    search_term: Optional[str] = Field(None, description="일반 키워드 (Spot 이름/설명)")
    preferred_spot_type: Optional[SpotType] = Field(None, description="필터링할 SPOT 유형")
    required_transport_mode: Optional[Literal["BUS", "SUBWAY"]] = Field(None, description="선호하는 교통수단 필터")
    min_duration_minutes: Optional[int] = Field(None, ge=0, description="최소 체류 시간 (분)")

class OptimizedRouteSuggestion(BaseModel):
    """
    검색 쿼리와 스키마를 결합하여 최종적으로 사용자에게 제시할 최적화된 경로 결과.
    """
    suggested_journey: JourneyPlan
    total_estimated_time_min: int # 총 예상 소요 시간 (교통 + 체류 합산)
    optimized_flow_analysis: str = Field(..., description="이동 동선과 활동의 시너지 분석 요약")
    potential_monetization_spot: Optional[str] = Field(None, description="해당 코스에서 수익화 연계 가능성이 높은 지점 (KPI 검토)")