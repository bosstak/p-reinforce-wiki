import heapq
from typing import List, Dict, Tuple, Optional
from src.models.archive_schema import Spot, TransportationLink, JourneyPlan

class RouteOptimizer:
    """
    지방 아카이브 데이터를 기반으로 최적의 여행 동선을 계산하는 엔진.
    그래프 이론(Graph Theory)을 활용하여 Dijkstra 알고리즘을 구현합니다.
    """
    def __init__(self):
        # 그래프 구조를 저장할 딕셔너리: {spot_id: {neighbor_spot_id: weight}}
        self.graph: Dict[str, Dict[str, float]] = {}

    def _build_graph(self, links: List[TransportationLink]):
        """
        주어진 TransportationLink 리스트를 기반으로 그래프 구조를 구축합니다.
        Weight는 'estimated_duration_min'을 사용합니다.
        """
        self.graph = {}
        for link in links:
            start = link.start_spot_id
            end = link.end_spot_id
            weight = float(link.estimated_duration_min)

            # 양방향 연결 (교통은 대부분 왕복 가능하다고 가정)
            self._add_edge(start, end, weight)
            self._add_edge(end, start, weight)

    def _add_edge(self, u: str, v: str, weight: float):
        """특정 노드 간의 연결 엣지를 그래프에 추가합니다."""
        if u not in self.graph:
            self.graph[u] = {}
        if v not in self.graph:
            self.graph[v] = {}

        # 이미 같은 경로가 있다면, 가장 짧은 시간을 사용하도록 업데이트 (선택적)
        self.graph[u][v] = min(self.graph[u].get(v, float('inf')), weight)
        self.graph[v][u] = min(self.graph[v].get(u, float('inf')), weight)

    def find_shortest_path(self, start_id: str, end_id: str) -> Tuple[float, List[str]]:
        """
        Dijkstra 알고리즘을 사용하여 시작점과 도착점 사이의 최단 경로와 시간을 찾습니다.
        :return: (총 예상 시간(분), [경로 Spot ID 리스트])
        """
        if start_id not in self.graph or end_id not in self.graph:
            raise ValueError("시작점 또는 도착점이 그래프에 존재하지 않습니다.")

        # distances: {spot_id: (최단 거리, 이전 노드)}
        distances = {node: float('inf') for node in self.graph}
        distances[start_id] = 0
        previous_nodes = {node: None for node in self.graph}

        # 우선순위 큐: (거리, 노드 ID)
        priority_queue = [(0, start_id)]

        while priority_queue:
            current_distance, current_node = heapq.heappop(priority_queue)

            if current_distance > distances[current_node]:
                continue

            if current_node == end_id:
                break # 목적지 도달 시 종료

            for neighbor in self.graph[current_node]:
                # 현재 노드 -> 이웃 노드의 가중치(시간)
                weight = self.graph[current_node][neighbor]
                new_distance = current_distance + weight

                if new_distance < distances[neighbor]:
                    distances[neighbor] = new_distance
                    previous_nodes[neighbor] = current_node
                    heapq.heappush(priority_queue, (new_distance, neighbor))

        # 경로 역추적 (Reconstruct Path)
        path: List[str] = []
        current = end_id
        while current is not None:
            path.append(current)
            current = previous_nodes[current]
        return distances[end_id], path[::-1]

    def optimize_journey(self, spot_ids: List[str]) -> Optional[JourneyPlan]:
        """
        주어진 Spot ID 리스트를 순서에 관계없이 가장 효율적인 방문 순서로 재배열합니다.
        이는 TSP (Traveling Salesman Problem)의 근사해법을 적용하는 개념입니다.
        (간단화를 위해 시작점을 첫 번째 spot_id, 끝점을 마지막 spot_id로 고정하고 중간 최적화 진행)
        """
        if not spot_ids:
            return None

        # 1. 그래프 구축 (데이터 입력 단계)
        # 실제 구현에서는 모든 아카이브의 TransportationLink를 모아서 여기서 호출해야 함
        # 예시를 위해 임시 링크 리스트가 필요합니다. 여기서는 생략하고, 사용자가 먼저 _build_graph()를 호출하도록 안내합니다.

        # 2. 최적 경로 찾기 (실제 로직)
        # 이 부분은 복잡한 TSP 문제이므로, 일단 시작-종료 간의 단일 최단 거리 계산만 수행한다고 가정합니다.
        print("📢 [경로 최적화 알림]: 현재는 전체 여정 최적화(TSP)가 아닌, 핵심 연결성 분석에 초점을 맞춥니다.")

        return JourneyPlan(
            journey_id="TEMP", 
            theme="최적 동선 시뮬레이션 결과", 
            duration_hours=0.0 # 실제 계산 후 채워질 예정
        )