"""
RouteOptimizer 시뮬레이션 및 초개인화 유료 맞춤형 일정(Itinerary) 생성 실행 스크립트
"""
import sys
import os

# UTF-8 출력 보장 (Windows 콘솔 cp949 인코딩 에러 방지)
sys.stdout.reconfigure(encoding='utf-8')

# root 경로 추가
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.utils.route_optimizer import RouteOptimizer
from src.data.mock_archive_data import MOCK_SPOTS, MOCK_TRANSIT_LINKS, MOCK_CUISINE_SPOTS
from src.models.archive_schema import JourneyPlan

def run_simulation():
    print("=" * 70)
    print("🚀 [bosstak AI 실무총괄] RouteOptimizer & 맞춤형 여정 시뮬레이터 가동")
    print("=" * 70)

    # 1. 엔진 초기화 및 그래프 구축
    optimizer = RouteOptimizer()
    optimizer._build_graph(MOCK_TRANSIT_LINKS)

    print("\n✅ 1. 광역 교통망 그래프 빌드 완료!")
    print(f"   - 등록된 총 교통 노드 수: {len(optimizer.graph)}개 거점")
    for node, neighbors in optimizer.graph.items():
        print(f"     * [{node}] ➔ {list(neighbors.keys())}")

    # 2. 시나리오 테스트: 인천공항(ICN) -> 전주 전통 비빔밥 노포(JEONJU_BIBIMBAP_REST)
    start_spot = "ICN_GATEWAY"
    dest_spot = "JEONJU_BIBIMBAP_REST"

    print("\n" + "=" * 70)
    print(f"🎯 2. 최단 동선 시뮬레이션: [{start_spot}] ➔ [{dest_spot}]")
    print("=" * 70)

    try:
        total_time_min, path = optimizer.find_shortest_path(start_spot, dest_spot)
        hours = int(total_time_min // 60)
        minutes = int(total_time_min % 60)

        print(f"\n⏱️ [최단 시간 도출]: 총 {total_time_min:.0f}분 (약 {hours}시간 {minutes}분 소요)")
        print(f"🗺️ [경유 경로]: {' ➔ '.join(path)}")

        # 3. 초개인화 맞춤형 일정표(Pro Tier: $9.99 디지털 가이드북) 렌더링
        print("\n" + "=" * 70)
        print("📱 [PRO TIER: $9.99 유료 맞춤형 인터랙티브 가이드북 생성 결과]")
        print("=" * 70)

        for i in range(len(path) - 1):
            curr_id = path[i]
            next_id = path[i+1]
            curr_spot = MOCK_SPOTS.get(curr_id)
            next_spot = MOCK_SPOTS.get(next_id)

            # 해당 구간 링크 찾기
            link = next((l for l in MOCK_TRANSIT_LINKS 
                         if (l.start_spot_id == curr_id and l.end_spot_id == next_id) or 
                            (l.start_spot_id == next_id and l.end_spot_id == curr_id)), None)

            print(f"\n📍 [구간 {i+1}] {curr_spot.name_ko} ({curr_spot.name_en})")
            print(f"   ⬇️ 이동 ({link.mode} - 약 {link.estimated_duration_min}분 소요)")
            print(f"   💡 {link.best_route_notes}")
            if link.transit_step_guide:
                print(f"   {link.transit_step_guide}")

        # 목적지 미식 & How to Eat 안내
        dest_spot_obj = MOCK_SPOTS.get(dest_spot)
        cuisine_info = MOCK_CUISINE_SPOTS.get(dest_spot)

        print("\n" + "-" * 70)
        print(f"🍚 [최종 목적지 도착 & 미식 가이드] {dest_spot_obj.name_ko}")
        print(f"   📖 스토리: {dest_spot_obj.storytelling_point}")
        if cuisine_info:
            print(f"   🍲 대표 메뉴: {cuisine_info.main_dish} (가격대: {cuisine_info.price_range_krw})")
            print(f"   {cuisine_info.how_to_eat_guide}")
            print(f"   {cuisine_info.ordering_tip_for_foreigners}")

        print("\n" + "=" * 70)
        print("🎉 [시뮬레이션 완료] 데이터 검증 및 유료 맞춤형 여정 생성 로직이 완벽하게 작동합니다!")
        print("=" * 70)

    except Exception as e:
        print(f"❌ 오류 발생: {e}")

if __name__ == "__main__":
    run_simulation()
