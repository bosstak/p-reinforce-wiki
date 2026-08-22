"""
외국인 방한 여행객을 위한 실전 아카이브 및 광역 교통망 표준 데이터셋
- 인천공항(ICN), 서울역(SEOUL_STATION), 지방 KTX 거점(전주, 부산, 강릉)
- 교통 A to Z 팁(transit_step_guide)
- 로컬 미식 & 식문화 가이드(how_to_eat_guide, ordering_tip_for_foreigners)
"""
from typing import Dict, List
from src.models.archive_schema import Spot, TransportationLink, CuisineSpot

# 1. 스팟 데이터 (교통 거점 + 관광지 + 미식 노포)
MOCK_SPOTS: Dict[str, Spot] = {
    # [교통 관문]
    "ICN_GATEWAY": Spot(
        spot_id="ICN_GATEWAY",
        name_ko="인천국제공항 제1/2터미널",
        name_en="Incheon International Airport (ICN)",
        region="전국",
        spot_type="TRANSPORT",
        description="대한민국 입국의 제1관문. 공항철도(AREX) 및 리무진 버스의 시작점.",
        storytelling_point="긴 비행의 피로를 풀고, 세계 최고 수준의 공항 인프라를 통해 한국 여정을 시작하는 지점.",
        keywords=["인천공항", "입국", "AREX", "시작점"]
    ),
    "SEOUL_STATION": Spot(
        spot_id="SEOUL_STATION",
        name_ko="서울역 (Seoul Central Hub)",
        name_en="Seoul Station (KTX Hub)",
        region="서울",
        spot_type="TRANSPORT",
        description="전국 각지로 뻗어나가는 KTX 및 지하철 1, 4호선, 공항철도가 만나는 최상위 교통 허브.",
        storytelling_point="100년 역사의 구 서울역사와 초현대식 KTX 역사가 공존하며, 서울에서 지방으로의 확장을 상징하는 공간.",
        keywords=["서울역", "KTX", "환승허브", "AREX종점"]
    ),
    "JEONJU_STATION": Spot(
        spot_id="JEONJU_STATION",
        name_ko="전주역",
        name_en="Jeonju KTX Station",
        region="전주",
        spot_type="TRANSPORT",
        description="전통 한옥 기와 양식으로 지어진 아름다운 KTX 기차역. 전주 한옥마을의 진입 관문.",
        storytelling_point="기차에서 내리자마자 마주하는 거대한 한옥 역사(驛舍)가 여행자에게 '전통의 도시'에 왔음을 실감케 함.",
        keywords=["전주역", "KTX", "한옥역사", "전라선"]
    ),
    "BUSAN_STATION": Spot(
        spot_id="BUSAN_STATION",
        name_ko="부산역",
        name_en="Busan KTX Station",
        region="부산",
        spot_type="TRANSPORT",
        description="경부선 KTX의 종착역이자 부산항과 원도심을 잇는 남부 최대의 교통 중심지.",
        storytelling_point="바다 내음과 활기찬 부산 시민의 에너지를 가장 먼저 느낄 수 있는 항구 도시의 관문.",
        keywords=["부산역", "KTX", "경부선", "남포동연결"]
    ),
    "GANGNEUNG_STATION": Spot(
        spot_id="GANGNEUNG_STATION",
        name_ko="강릉역",
        name_en="Gangneung KTX Station",
        region="강릉",
        spot_type="TRANSPORT",
        description="동해선 KTX-이음의 종착역. 안목 커피거리 및 경포대 진입 거점.",
        storytelling_point="서울에서 단 2시간 만에 푸른 동해 바다의 정취로 안내하는 고속철도 관문.",
        keywords=["강릉역", "KTX이음", "동해바다", "커피거리"]
    ),

    # [전주 로컬 명소 & 미식]
    "JEONJU_HANOK_VILLAGE": Spot(
        spot_id="JEONJU_HANOK_VILLAGE",
        name_ko="전주 한옥마을",
        name_en="Jeonju Hanok Village",
        region="전주",
        spot_type="ATTRACTION",
        description="700여 채의 한옥이 도심 속에 보존된 한국 최대 규모의 전통 한옥 주거지.",
        storytelling_point="골목길마다 살아 숨 쉬는 조선의 건축미와 골목길 방황(Wandering)의 미학.",
        keywords=["한옥", "골목길", "한복체험", "경기전"]
    ),
    "JEONJU_BIBIMBAP_REST": Spot(
        spot_id="JEONJU_BIBIMBAP_REST",
        name_ko="전주 전통 비빔밥 노포 (한국관/가족회관)",
        name_en="Traditional Jeonju Bibimbap Restaurant",
        region="전주",
        spot_type="FOOD",
        description="놋그릇에 갓 지은 밥과 신선한 나물, 육회, 황포묵이 오방색을 이루는 50년 전통 노포.",
        storytelling_point="신라시대부터 이어진 한국의 '오방색(5가지 방위와 색)' 철학이 완벽한 영양 조화로 담긴 그릇.",
        keywords=["비빔밥", "놋그릇", "오방색", "전통맛집"]
    ),
    "JEONJU_KONGNAMUL_REST": Spot(
        spot_id="JEONJU_KONGNAMUL_REST",
        name_ko="전주 남부시장 콩나물국밥 노포 (현대옥)",
        name_en="Jeonju Nambu Market Bean Sprout Soup",
        region="전주",
        spot_type="FOOD",
        description="오징어 사리와 청양고추, 수란이 곁들여져 시장 상인들의 새벽을 깨우던 소울푸드.",
        storytelling_point="새벽 시장 상인들의 고된 하루를 달래주던 깊고 시원한 국물과 수란(반숙란)의 영양학적 지혜.",
        keywords=["콩나물국밥", "수란", "남부시장", "아침식사"]
    ),
}

# 2. 미식 전용 상세 데이터 (How to Eat & Ordering Tip)
MOCK_CUISINE_SPOTS: Dict[str, CuisineSpot] = {
    "JEONJU_BIBIMBAP_REST": CuisineSpot(
        spot_id="JEONJU_BIBIMBAP_REST",
        main_dish="전주 전통 육회비빔밥 (Jeonju Yukhoe Bibimbap)",
        price_range_krw="MID",
        operating_hours="11:00 - 20:30",
        how_to_eat_guide=(
            "🥢 [How to Eat]:\n"
            "1. 숟가락 대신 '젓가락'을 양손에 쥐고 밥알이 뭉개지지 않게 살살 공기층을 넣으며 비벼주세요.\n"
            "2. 고추장이 골고루 섞이면 숟가락으로 한 가득 떠서 반찬으로 나온 김치나 나물을 얹어 한입에 드세요!\n"
            "3. 놋그릇이 뜨거우니 손으로 잡지 마세요."
        ),
        ordering_tip_for_foreigners=(
            "📋 [Ordering Tip]:\n"
            "- 메뉴판에서 '육회비빔밥(Raw Beef)' 또는 '익힌 비빔밥(Cooked Beef)' 중 선택 가능합니다.\n"
            "- 매운 것을 잘 못 드시면 직원에게 '고추장 조금만 따로 주세요(Gochujang on the side, please)'라고 말씀하세요!"
        )
    ),
    "JEONJU_KONGNAMUL_REST": CuisineSpot(
        spot_id="JEONJU_KONGNAMUL_REST",
        main_dish="남부시장식 콩나물국밥 (Bean Sprout Soup with Poached Egg)",
        price_range_krw="LOW",
        operating_hours="06:00 - 14:00 (새벽/아침)",
        how_to_eat_guide=(
            "🥢 [How to Eat]:\n"
            "1. 작은 그릇에 담겨 나온 '수란(반숙 계란)'에 뜨거운 국밥 국물을 3~4숟갈 넣고 잘게 찢은 김을 넣어 저어 마십니다(위 보호 효과!).\n"
            "2. 이후 콩나물국밥에 취향에 따라 오징어 사리를 추가해 국물과 콩나물을 함께 즐기세요."
        ),
        ordering_tip_for_foreigners=(
            "📋 [Ordering Tip]:\n"
            "- '매운맛/보통맛/순한맛' 선택 가능. 외국인에게는 '순한맛(Mild)' 추천!\n"
            "- '오징어 사리 추가(Add squid topping)'를 꼭 요청해 보세요 (약 2,000원 추가)."
        )
    )
}

# 3. 교통 연결망 데이터 (TransportationLink)
MOCK_TRANSIT_LINKS: List[TransportationLink] = [
    # [ICN -> Seoul]
    TransportationLink(
        link_id="LINK_ICN_TO_SEOUL",
        start_spot_id="ICN_GATEWAY",
        end_spot_id="SEOUL_STATION",
        mode="SUBWAY",
        estimated_duration_min=43,
        best_route_notes="공항철도(AREX) 직통열차 탑승",
        transit_step_guide=(
            "🚇 [Step-by-Step Transit Guide]:\n"
            "1. 입국장 B1층으로 이동하여 오렌지색 'AREX 직통열차 표지판'을 따라갑니다.\n"
            "2. 무인 발권기에서 WOWPASS 또는 신용카드로 서울역행 직통 티켓(약 11,000원)을 발권합니다.\n"
            "3. 지정된 좌석에 앉아 43분간 논스톱으로 서울역 지하 7층 승강장까지 편안하게 이동합니다."
        )
    ),
    # [Seoul -> Jeonju]
    TransportationLink(
        link_id="LINK_SEOUL_TO_JEONJU",
        start_spot_id="SEOUL_STATION",
        end_spot_id="JEONJU_STATION",
        mode="SUBWAY",
        estimated_duration_min=100,
        best_route_notes="KTX-산천 (전라선) 탑승 (용산역/서울역 출발)",
        transit_step_guide=(
            "🚄 [Step-by-Step Transit Guide]:\n"
            "1. 서울역 2층 대합실 전광판에서 열차 번호(KTX 전라선)와 승강장 번호(Track)를 확인합니다.\n"
            "2. 티켓에 적힌 호차(Car No.)와 좌석 번호를 확인하고 10분 전 승강장으로 내려갑니다.\n"
            "3. 약 1시간 40분 후 '전주역' 안내 방송이 나오면 하차합니다."
        )
    ),
    # [Jeonju Station -> Hanok Village]
    TransportationLink(
        link_id="LINK_JEONJU_STATION_TO_HANOK",
        start_spot_id="JEONJU_STATION",
        end_spot_id="JEONJU_HANOK_VILLAGE",
        mode="BUS",
        estimated_duration_min=20,
        best_route_notes="전주역 광장 3번 승강장에서 119번 또는 5001번 버스 탑승",
        transit_step_guide=(
            "🚌 [Step-by-Step Transit Guide]:\n"
            "1. 전주역 정문을 나와 첫 번째 버스 정류장(3번 승강장)으로 직진합니다.\n"
            "2. '119번 버스'가 오면 앞문으로 탑승하며 티머니/WOWPASS 카드를 태그합니다.\n"
            "3. 약 8개 정류장 후 '전동성당·한옥마을' 정류장에서 하차합니다 (안내방송 영어 지원)."
        )
    ),
    # [Hanok Village -> Bibimbap Restaurant]
    TransportationLink(
        link_id="LINK_HANOK_TO_BIBIMBAP",
        start_spot_id="JEONJU_HANOK_VILLAGE",
        end_spot_id="JEONJU_BIBIMBAP_REST",
        mode="WALKING",
        estimated_duration_min=5,
        best_route_notes="경기전 담장길을 따라 도보 5분 이동",
        transit_step_guide="🚶 경기전 동문 돌담길을 따라 고즈넉한 은행나무 거리를 감상하며 300m 직진합니다."
    ),
    # [Seoul -> Busan]
    TransportationLink(
        link_id="LINK_SEOUL_TO_BUSAN",
        start_spot_id="SEOUL_STATION",
        end_spot_id="BUSAN_STATION",
        mode="SUBWAY",
        estimated_duration_min=135,
        best_route_notes="KTX 경부선 직통열차 탑승 (2시간 15분 소요)",
        transit_step_guide="🚄 서울역 KTX 승강장에서 부산행 탑승 ➔ 부산역 2층 맞이방으로 도착."
    ),
    # [Seoul -> Gangneung]
    TransportationLink(
        link_id="LINK_SEOUL_TO_GANGNEUNG",
        start_spot_id="SEOUL_STATION",
        end_spot_id="GANGNEUNG_STATION",
        mode="SUBWAY",
        estimated_duration_min=120,
        best_route_notes="KTX-이음 강릉선 탑승 (2시간 소요)",
        transit_step_guide="🚄 서울역 KTX-이음 탑승 ➔ 횡성/평창을 거쳐 강릉역 지하 1층 승강장 도착."
    )
]
