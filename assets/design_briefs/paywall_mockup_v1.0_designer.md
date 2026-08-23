# 🎨 Paywall Mockup Design Brief (V1.0)

## I. 목표 및 컨셉
- **Goal:** 정보 결핍(Scarcity)을 이용한 유료 전환율 극대화. 무료 경험 $\rightarrow$ 제한 인식 $\rightarrow$ 해결책 구매의 흐름 구축.
- **Key Element:** 시각적 경고(Warning State)와 고대비 CTA 버튼의 대비를 통해 유도 효과 강화.

## II. 디자인 스펙 (Style Guide)
### 1. 타이포그래피
- H2: Poppins, Bold, 36px
- Body: Inter, Regular, 16px
- Accent/Warning Text: Inter, SemiBold, 18px

### 2. 컬러 팔레트 (Hex Code)
- Primary Blue: #0F4C81 (기본 텍스트/헤더)
- Highlight Gold: #FFC300 (CTA 버튼 배경)
- Warning Red: #D9534F (제한 경고 박스 배경)
- Background: #FFFFFF

## III. 와이어프레임 구조 및 Flow (1500px 기준)

**[SECTION 1: 무료 결과 영역] (Trust Build)**
*   Layout: Grid System, Card Component (최대 3개 배치).
*   State Design: '비용 시뮬레이션' 카드는 내용 대신 `#E9ECEF` 배경의 정보 카드와 함께 **"🔑 고급 분석 데이터는 유료 보고서에서만 제공됩니다."** 문구를 표시.

**[SECTION 2: Paywall Trigger] (The Hook)**
*   Component: 경고 배너 (Banner Component)
*   Style: Warning Red Background, 중앙 정렬. 모서리 라운딩을 최소화하여 위협적인 느낌 강조.
*   Content: "⚠️ Advanced Analysis Locked! 이 데이터를 놓치면 최적의 비용 경로를 찾을 수 없습니다."

**[SECTION 3: CTA Conversion] (The Solution)**
*   Layout: 중앙 집중형, 섹션 전체에 여백(Padding)을 충분히 확보하여 분리된 느낌 강조.
*   Headline (H2): Poppins Bold / "진짜 최적의 비용 구조를 놓치고 계신가요?"
*   Feature List: 3가지 핵심 가치를 불렛 포인트로 나열. 각 항목 앞에 골드 색상 아이콘(✨) 사용.
    *   ✅ 실시간 가격 변동 주기 매칭 (Writer v1 기반)
    *   ✅ 숨겨진 할인 연계 조건 분석 (경제적 이득 강조)
    *   ✅ 비용 절감 시뮬레이션 그래프 제공 (시각적 가치 극대화)
*   **CTA Button:** Highlight Gold 배경, 폰트 크기 20px. **`Advanced Report 잠금 해제하기`**