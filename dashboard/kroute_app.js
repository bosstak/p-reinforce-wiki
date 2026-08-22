/**
 * K-ROUTE Real World Map, Subway & Bus Transit Engine
 * Designed by AI Design Director SIA (시아)
 */

// 1. Real GPS Data for Regional Korean Transit
const REAL_DESTINATIONS = {
  jeonju_hanok: {
    city: "Jeonju (전주)",
    title: "Jeonju Hanok Village & Gourmet Flow",
    totalTime: "2h 48m",
    totalFare: "₩44,800 (~$33.20)",
    transfers: "2 Times",
    originGps: [37.4602, 126.4407], // ICN Airport
    hubGps: [37.5547, 126.9706],    // Seoul Station
    destGps: [35.8149, 127.1526],   // Jeonju Hanok Village
    intermediateGps: [35.8496, 127.1619], // Jeonju Station
    steps: [
      {
        tag: "AREX EXPRESS",
        tagClass: "tag-arex",
        duration: "43 min (₩11,000)",
        title: "1. Incheon Airport (ICN) ➔ Seoul Station Hub",
        desc: "Take Orange Line AREX Non-stop direct train. Smooth luggage storage & free Wi-Fi.",
        tip: "💡 Fast Transfer Tip: Car 4-2 is closest to the express elevator at Seoul Station B7."
      },
      {
        tag: "KTX-SANCHEON",
        tagClass: "tag-ktx",
        duration: "1h 40m (₩32,300)",
        title: "2. Seoul Station ➔ Jeonju Station",
        desc: "Board KTX Jeolla line from Track 3. High-speed 300 km/h bullet train.",
        tip: "💡 Tip: Power outlets & USB ports under window seats. Free onboard water available."
      },
      {
        tag: "LOCAL BUS #119",
        tagClass: "tag-bus",
        duration: "20 min (₩1,500)",
        title: "3. Jeonju Station Plaza ➔ Hanok Village",
        desc: "Take Bus #119 at Front Gate Stop #3. Ride 8 stops directly to Jeondong Cathedral.",
        tip: "💡 Tip: Tap T-Money or WOWPASS on the card reader upon boarding."
      }
    ],
    busRoute: {
      busNo: "🚌 Bus #119 (Jeonju Express)",
      interval: "Every 12 mins",
      fare: "₩1,500 ($1.10)",
      stops: [
        { seq: 1, ko: "전주역 첫 정류장", en: "Jeonju KTX Station (Start)", eta: "Departed" },
        { seq: 2, ko: "우아동 주민센터", en: "Ua-dong Community Center", eta: "3 mins" },
        { seq: 3, ko: "모래내시장", en: "Morenae Traditional Market", eta: "7 mins" },
        { seq: 4, ko: "전북대 평생교육원", en: "Jeonbuk Univ Center", eta: "11 mins" },
        { seq: 5, ko: "기린대로 시청", en: "Girin-daero City Hall", eta: "15 mins" },
        { seq: 6, ko: "전동성당·한옥마을", en: "Jeondong Cathedral / Hanok Village", eta: "18 mins (Target 🎯)" }
      ]
    },
    spots: [
      {
        name: "Jeonju Hanok Village (전주 한옥마을)",
        badge: "K-DRAMA SPOT",
        photoBadge: "📸 Retro Hanbok",
        story: "Filming location of 'Twenty-Five Twenty-One' & 'Mr. Sunshine'. Over 700 traditional wooden houses offering tranquil alley walks."
      },
      {
        name: "Gyeonggijeon Shrine (경기전)",
        badge: "ROYAL HERITAGE",
        photoBadge: "🌿 Bamboo Forest",
        story: "Sacred shrine preserving King Taejo’s royal portrait. Featured in 'Moonlight Drawn by Clouds'."
      }
    ],
    gourmet: [
      {
        name: "Traditional Jeonju Yukhoe Bibimbap (전주 육회비빔밥)",
        price: "₩15,000 (~$11.00)",
        howTo: "🥢 Use chopsticks to mix gently in a circular motion. Keep the rice grains fluffy without pressing!",
        noPhotoTip: "📋 Show: '육회비빔밥 하나, 고추장 따로 주세요' (Bibimbap with Gochujang on the side)."
      },
      {
        name: "Nambu Market Bean Sprout Soup (전주 콩나물국밥)",
        price: "₩8,500 (~$6.20)",
        howTo: "🥢 Sip the poached egg (수란) first with hot broth and seaweed flakes to coat your stomach!",
        noPhotoTip: "📋 Show: '안 맵게 해주세요' (Make it mild, please)."
      }
    ]
  },

  busan_haeundae: {
    city: "Busan (부산)",
    title: "Busan Coastal Sky Capsule & Jagalchi Fish Market",
    totalTime: "3h 10m",
    totalFare: "₩62,800 (~$46.50)",
    transfers: "2 Times",
    originGps: [37.4602, 126.4407],
    hubGps: [37.5547, 126.9706],
    destGps: [35.0968, 129.0306], // Jagalchi
    intermediateGps: [35.1152, 129.0422], // Busan Station
    steps: [
      {
        tag: "AREX EXPRESS",
        tagClass: "tag-arex",
        duration: "43 min",
        title: "1. Incheon Airport ➔ Seoul Station Hub",
        desc: "Direct express to the central bullet train terminal.",
        tip: "💡 Tip: Direct hotel luggage delivery check-in available at Seoul Station AREX counter."
      },
      {
        tag: "KTX GYEONGBU",
        tagClass: "tag-ktx",
        duration: "2h 15m (₩59,800)",
        title: "2. Seoul Station ➔ Busan KTX Station",
        desc: "Cross the entire Korean peninsula in just 135 minutes on the KTX bullet train.",
        tip: "💡 Tip: Choose Seat Row A or B for ocean views entering Busan."
      },
      {
        tag: "SUBWAY LINE 1",
        tagClass: "tag-subway",
        duration: "8 min (₩1,600)",
        title: "3. Busan Station ➔ Jagalchi Fish Market",
        desc: "Take Orange Subway Line 1 directly to Jagalchi Station (Exit 10).",
        tip: "💡 Fast Transfer: Car 3-1 gives the quickest exit to the escalator."
      }
    ],
    busRoute: {
      busNo: "🚌 Bus #1003 (Busan Ocean Express)",
      interval: "Every 10 mins",
      fare: "₩2,100 ($1.55)",
      stops: [
        { seq: 1, ko: "부산역 광장", en: "Busan KTX Station", eta: "Departed" },
        { seq: 2, ko: "남포동·자갈치", en: "Nampo-dong / Jagalchi Market", eta: "8 mins (Target 🎯)" },
        { seq: 3, ko: "광안리해수욕장", en: "Gwangalli Beach", eta: "25 mins" },
        { seq: 4, ko: "해운대해수욕장", en: "Haeundae Beach Promenade", eta: "38 mins" }
      ]
    },
    spots: [
      {
        name: "Haeundae Blueline Park (해운대 블루라인파크)",
        badge: "K-DRAMA & TREND",
        photoBadge: "🚡 Sky Capsule",
        story: "Colorful coastal sky capsules overlooking the East Sea. Featured in viral global travel vlogs."
      }
    ],
    gourmet: [
      {
        name: "Busan Dwaeji Gukbap & Fresh Sashimi (부산 돼지국밥 & 활어회)",
        price: "₩9,500 (~$7.00)",
        howTo: "🥢 Add seasoned chives (정구지) and salted shrimp (새우젓) to customize soup richness.",
        noPhotoTip: "📋 Show: '따로국밥 하나 주세요' (Pork soup with rice in separate bowl)."
      }
    ]
  },

  gangneung_anmok: {
    city: "Gangneung (강릉)",
    title: "Gangneung East Sea Coffee Promenade & Tofu Trail",
    totalTime: "2h 55m",
    totalFare: "₩38,600 (~$28.60)",
    transfers: "2 Times",
    originGps: [37.4602, 126.4407],
    hubGps: [37.5547, 126.9706],
    destGps: [37.7718, 128.9486], // Anmok Beach
    intermediateGps: [37.7638, 128.8996], // Gangneung Station
    steps: [
      {
        tag: "AREX EXPRESS",
        tagClass: "tag-arex",
        duration: "43 min",
        title: "1. Incheon Airport ➔ Seoul Station",
        desc: "Express non-stop line into central Seoul.",
        tip: "💡 Tip: Seamless indoor underground transfer to KTX concourse."
      },
      {
        tag: "KTX-EUM",
        tagClass: "tag-ktx",
        duration: "2h 00m (₩26,000)",
        title: "2. Seoul Station ➔ Gangneung Station",
        desc: "Eco-friendly high-speed train winding through the picturesque Taebaek mountains.",
        tip: "💡 Tip: Wireless phone charging pads installed at every single seat."
      },
      {
        tag: "LOCAL BUS #223",
        tagClass: "tag-bus",
        duration: "15 min (₩1,600)",
        title: "3. Gangneung Station ➔ Anmok Beach",
        desc: "Direct bus to the famous Anmok seaside coffee promenade.",
        tip: "💡 Tip: Taxis are also very affordable (around ₩7,000 / $5 USD)."
      }
    ],
    busRoute: {
      busNo: "🚌 Bus #223-1 (Anmok Beach Line)",
      interval: "Every 15 mins",
      fare: "₩1,600 ($1.20)",
      stops: [
        { seq: 1, ko: "강릉역 건너편", en: "Gangneung Station Exit 1", eta: "Departed" },
        { seq: 2, ko: "강릉중앙시장", en: "Gangneung Central Market", eta: "6 mins" },
        { seq: 3, ko: "초당순두부마을", en: "Chodang Tofu Village", eta: "12 mins" },
        { seq: 4, ko: "안목커피거리 종점", en: "Anmok Coffee Street (Terminus 🎯)", eta: "16 mins" }
      ]
    },
    spots: [
      {
        name: "Jumunjin Breakwater (주문진 방파제)",
        badge: "DRAMA 'GUARDIAN: GOBLIN'",
        photoBadge: "🧣 Red Scarf Spot",
        story: "Iconic scene where Kim Shin meets Eun-tak with red scarf overlooking crashing blue waves."
      }
    ],
    gourmet: [
      {
        name: "Chodang Artisanal Soft Tofu (초당 순두부)",
        price: "₩12,000 (~$8.90)",
        howTo: "🥢 Taste the pure tofu first to savor the sweetness of East Sea mineral water.",
        noPhotoTip: "📋 Show: '초당 순두부 백반 주세요' (Chodang soft tofu set, please)."
      }
    ]
  },

  gyeongju_hwangridan: {
    city: "Gyeongju (경주)",
    title: "Gyeongju Royal Heritage & Hwangridan-gil",
    totalTime: "2h 45m",
    totalFare: "₩54,000 (~$40.00)",
    transfers: "2 Times",
    originGps: [37.4602, 126.4407],
    hubGps: [37.5547, 126.9706],
    destGps: [35.8367, 129.2089], // Hwangridan-gil
    intermediateGps: [35.7984, 129.1396], // Singyeongju
    steps: [
      {
        tag: "AREX EXPRESS",
        tagClass: "tag-arex",
        duration: "43 min",
        title: "1. Incheon Airport ➔ Seoul Station",
        desc: "Express non-stop train.",
        tip: "💡 Tip: Safe luggage storage racks inside every car."
      },
      {
        tag: "KTX GYEONGBU",
        tagClass: "tag-ktx",
        duration: "2h 00m (₩49,300)",
        title: "2. Seoul Station ➔ Singyeongju Station",
        desc: "KTX bullet train straight to the ancient capital of Shilla.",
        tip: "💡 Tip: Singyeongju bus terminal connects directly to historic downtown."
      },
      {
        tag: "BUS #700",
        tagClass: "tag-bus",
        duration: "20 min (₩1,600)",
        title: "3. Singyeongju ➔ Daereungwon Royal Tombs",
        desc: "Express bus arriving at the heart of Hwangridan-gil alleyways.",
        tip: "💡 Tip: Rent a bicycle or electric scooter to explore tomb complexes easily."
      }
    ],
    busRoute: {
      busNo: "🚌 Bus #700 (Historic City Loop)",
      interval: "Every 20 mins",
      fare: "₩1,600 ($1.20)",
      stops: [
        { seq: 1, ko: "신경주역 KTX 승강장", en: "Singyeongju KTX Station", eta: "Departed" },
        { seq: 2, ko: "경주시외버스터미널", en: "Gyeongju Bus Terminal", eta: "12 mins" },
        { seq: 3, ko: "황리단길·대릉원입구", en: "Hwangridan-gil / Daereungwon 🎯", eta: "18 mins" },
        { seq: 4, ko: "동궁과 월지·첨성대", en: "Donggung Palace & Cheomseongdae", eta: "24 mins" }
      ]
    },
    spots: [
      {
        name: "Donggung Palace & Wolji Pond (동궁과 월지)",
        badge: "DRAMA 'THE RED SLEEVE'",
        photoBadge: "🏮 Night Illumination",
        story: "Stunning royal palace illuminated over reflective lotus pond at night."
      }
    ],
    gourmet: [
      {
        name: "Gyeongju Hanwoo Tteokgalbi Ssambap (경주 떡갈비 쌈밥)",
        price: "₩16,000 (~$11.90)",
        howTo: "🥢 Double wrap: place beef patty inside lettuce + perilla leaf with ssamjang.",
        noPhotoTip: "📋 Show: '떡갈비 쌈밥 정식 주세요' (Tteokgalbi Ssambap set, please)."
      }
    ]
  },

  seoul_myeongdong: {
    city: "Seoul (서울)",
    title: "Seoul Central Myeongdong & N Seoul Tower",
    totalTime: "52m",
    totalFare: "₩12,400 (~$9.15)",
    transfers: "1 Time",
    originGps: [37.4602, 126.4407],
    hubGps: [37.5547, 126.9706],
    destGps: [37.5636, 126.9837], // Myeongdong
    steps: [
      {
        tag: "AREX EXPRESS",
        tagClass: "tag-arex",
        duration: "43 min",
        title: "1. Incheon Airport ➔ Seoul Station",
        desc: "Non-stop direct airport line.",
        tip: "💡 Tip: Direct underground transfer to Subway Line 4."
      },
      {
        tag: "SUBWAY LINE 4",
        tagClass: "tag-subway",
        duration: "6 min (₩1,400)",
        title: "2. Seoul Station ➔ Myeongdong Station",
        desc: "Blue subway line 4. Ride 2 stops to Exit 6 (Myeongdong Shopping Street).",
        tip: "💡 Fast Transfer: Car 2-2 directly faces the transfer staircase."
      }
    ],
    busRoute: {
      busNo: "🚌 Airport Limousine #6001",
      interval: "Every 20 mins",
      fare: "₩17,000 ($12.50)",
      stops: [
        { seq: 1, ko: "인천공항 제1터미널", en: "Incheon Airport T1 (5B)", eta: "Departed" },
        { seq: 2, ko: "신용산역", en: "Sinyongsan Station", eta: "55 mins" },
        { seq: 3, ko: "서울역 버스환승센터", en: "Seoul Station Center", eta: "65 mins" },
        { seq: 4, ko: "명동역·세종호텔", en: "Myeongdong Station 🎯", eta: "75 mins" }
      ]
    },
    spots: [
      {
        name: "N Seoul Tower (N서울타워)",
        badge: "DRAMA 'MY LOVE FROM THE STAR'",
        photoBadge: "🔒 Love Locks",
        story: "Panoramic 360-degree skyline view over the capital with romantic love lock terrace."
      }
    ],
    gourmet: [
      {
        name: "Myeongdong Kyoja Kalguksu (명동교자 칼국수)",
        price: "₩11,000 (~$8.15)",
        howTo: "🥢 Savory garlic chicken broth noodles served with punchy garlic kimchi.",
        noPhotoTip: "📋 Show: '칼국수 하나, 만두 하나 주세요' (One noodle soup, one steamed dumpling)."
      }
    ]
  }
};

// 2. Subway Lines Data (Seoul Metropolitan Area)
const SUBWAY_NETWORK = {
  arex: [
    { ko: "인천공항2터미널", en: "Incheon Airport T2", transfer: "Line 2 / KTX", fastCar: "Car 1-1" },
    { ko: "인천공항1터미널", en: "Incheon Airport T1", transfer: "AREX All-Stop", fastCar: "Car 2-1" },
    { ko: "공항화물청사", en: "Airport Cargo Terminal", transfer: "None", fastCar: "Car 3-2" },
    { ko: "운서", en: "Unseo (Hotel District)", transfer: "None", fastCar: "Car 4-2" },
    { ko: "영종", en: "Yeongjong", transfer: "None", fastCar: "Car 2-3" },
    { ko: "청라국제도시", en: "Cheongna Int'l City", transfer: "None", fastCar: "Car 3-1" },
    { ko: "검암", en: "Geomam", transfer: "Incheon Line 2", fastCar: "Car 1-4" },
    { ko: "계양", en: "Gyeyang", transfer: "Incheon Line 1", fastCar: "Car 5-1" },
    { ko: "김포공항", en: "Gimpo Airport (GMP)", transfer: "Line 5, 9, Gimpo Gold, Seohae", fastCar: "Car 3-3 (30s Transfer!)" },
    { ko: "마곡나루", en: "Magongnaru", transfer: "Line 9", fastCar: "Car 4-1" },
    { ko: "디지털미디어시티", en: "DMC (K-Media Hub)", transfer: "Line 6, Gyeongui-Jungang", fastCar: "Car 2-2" },
    { ko: "홍대입구", en: "Hongik Univ. (Hongdae)", transfer: "Line 2 (Green), Gyeongui", fastCar: "Car 1-1 (Exit 9 Youth St)" },
    { ko: "공덕", en: "Gongdeok", transfer: "Line 5, 6, Gyeongui", fastCar: "Car 6-4" },
    { ko: "서울역 (종점)", en: "Seoul Station (KTX Hub)", transfer: "Line 1, 4, KTX Bullet, Gyeongui", fastCar: "Car 4-2 (Elevator to 2F)" }
  ],
  line1: [
    { ko: "서울역", en: "Seoul Station", transfer: "Line 4, AREX, KTX", fastCar: "Car 3-4" },
    { ko: "시청", en: "City Hall (Deoksugung)", transfer: "Line 2 (Green)", fastCar: "Car 2-1" },
    { ko: "종각", en: "Jonggak (Cheonggyecheon)", transfer: "None", fastCar: "Car 4-3" },
    { ko: "종로3가", en: "Jongno 3-ga (Ikseon-dong)", transfer: "Line 3, 5", fastCar: "Car 1-1" },
    { ko: "종로5가", en: "Jongno 5-ga (Gwangjang Market)", transfer: "Food Street", fastCar: "Car 5-2" },
    { ko: "동대문", en: "Dongdaemun (DDP)", transfer: "Line 4", fastCar: "Car 3-1" }
  ],
  line2: [
    { ko: "홍대입구", en: "Hongik Univ.", transfer: "AREX, Gyeongui", fastCar: "Car 2-4" },
    { ko: "신촌", en: "Sinchon (Univ. District)", transfer: "None", fastCar: "Car 4-1" },
    { ko: "이대", en: "Ewha Womans Univ.", transfer: "Shopping St", fastCar: "Car 1-3" },
    { ko: "시청", en: "City Hall", transfer: "Line 1", fastCar: "Car 6-2" },
    { ko: "을지로입구", en: "Euljiro 1-ga (Myeongdong North)", transfer: "None", fastCar: "Car 3-3" },
    { ko: "동대문역사문화공원", en: "DDP Plaza", transfer: "Line 4, 5", fastCar: "Car 5-1" },
    { ko: "성수", en: "Seongsu (Cafe & Fashion St)", transfer: "Trendy Cafes", fastCar: "Car 4-2" },
    { ko: "강남", en: "Gangnam (K-Pop Hub)", transfer: "Shinbundang Line", fastCar: "Car 2-2" }
  ],
  line4: [
    { ko: "서울역", en: "Seoul Station", transfer: "Line 1, AREX, KTX", fastCar: "Car 4-2" },
    { ko: "회현", en: "Hoehyeon (Namdaemun Market)", transfer: "Traditional Market", fastCar: "Car 1-2" },
    { ko: "명동", en: "Myeongdong (Exit 6 Shopping)", transfer: "Shopping Street", fastCar: "Car 3-1" },
    { ko: "충무로", en: "Chungmuro (Namsangol Village)", transfer: "Line 3", fastCar: "Car 5-3" },
    { ko: "혜화", en: "Hyehwa (Daehangno Theaters)", transfer: "Youth Theater", fastCar: "Car 2-1" }
  ]
};

let leafletMap = null;
let mapMarkers = [];
let routePolyline = null;
let currentDestKey = "jeonju_hanok";
let ssamLayerStack = [];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initRealMap();
  renderDestination(currentDestKey);
  setupNavigationTabs();
  setupDestSelector();
  setupSubwayLineSelector();
  setupSsamBuilder();
  setupLayerSwitcher();
});

// Initialize Leaflet Map with Real Korea Coordinates
function initRealMap() {
  const mapEl = document.getElementById("realLeafletMap");
  if (!mapEl) return;

  // Center on South Korea
  leafletMap = L.map('realLeafletMap', {
    zoomControl: false,
    attributionControl: false
  }).setView([36.5, 127.8], 7);

  // CartoDB Dark Matter Tiles (Ultra Sleek High-Tech Style)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
  }).addTo(leafletMap);

  L.control.zoom({ position: 'topright' }).addTo(leafletMap);
}

function renderDestination(key) {
  const data = REAL_DESTINATIONS[key] || REAL_DESTINATIONS.jeonju_hanok;

  // 1. Update Transit Stats
  document.getElementById("routeTotalTime").textContent = data.totalTime;
  document.getElementById("routeTotalFare").textContent = data.totalFare;
  document.getElementById("routeTransfers").textContent = data.transfers;

  // 2. Render Transit Steps
  const transitContainer = document.getElementById("transitStepsContainer");
  transitContainer.innerHTML = data.steps.map(s => `
    <div class="step-card">
      <div class="step-header">
        <span class="step-tag ${s.tagClass}">${s.tag}</span>
        <span class="step-duration">${s.duration}</span>
      </div>
      <h4 class="step-title">${s.title}</h4>
      <p class="step-desc">${s.desc}</p>
      <div class="step-tip-box">${s.tip}</div>
    </div>
  `).join("");

  // 3. Render Bus Route Tab
  renderBusRoute(data.busRoute);

  // 4. Render Spots
  const spotsContainer = document.getElementById("spotsCardContainer");
  spotsContainer.innerHTML = data.spots.map(spot => `
    <div class="spot-detail-card">
      <div class="spot-tag-row">
        <span class="drama-badge">${spot.badge}</span>
        <span class="photo-badge">${spot.photoBadge}</span>
      </div>
      <h4 class="spot-name">${spot.name}</h4>
      <p class="spot-story">${spot.story}</p>
    </div>
  `).join("");

  // 5. Render Gourmet Cards
  const gourmetContainer = document.getElementById("gourmetCardContainer");
  gourmetContainer.innerHTML = data.gourmet.map(g => `
    <div class="spot-detail-card" style="border-left: 3px solid #00f2fe;">
      <div class="spot-tag-row">
        <span class="photo-badge" style="background: rgba(255, 165, 2, 0.2); color: #ffa502;">🍽️ LOCAL SIGNATURE</span>
        <span style="font-size: 11px; font-weight: 700; color: #fff;">${g.price}</span>
      </div>
      <h4 class="spot-name" style="color: #00f2fe;">${g.name}</h4>
      <p class="spot-story">${g.howTo}</p>
      <div class="step-tip-box" style="border-left-color: #ffa502; background: rgba(0,0,0,0.5); color: #ffbe76;">
        ${g.noPhotoTip}
      </div>
    </div>
  `).join("");

  // 6. Update Real Leaflet Map Polyline & Markers
  updateRealMapMarkers(data);

  // 7. Update Floating Step Card
  if (data.steps && data.steps.length > 0) {
    document.getElementById("floatingStepTitle").textContent = data.steps[0].title;
    document.getElementById("floatingStepDesc").textContent = data.steps[0].desc;
  }
}

// Update Leaflet Map Markers & Polyline
function updateRealMapMarkers(data) {
  if (!leafletMap) return;

  // Clear previous markers & lines
  mapMarkers.forEach(m => leafletMap.removeLayer(m));
  mapMarkers = [];
  if (routePolyline) leafletMap.removeLayer(routePolyline);

  const points = [];

  // Origin Marker (ICN)
  if (data.originGps) {
    const originIcon = L.divIcon({
      className: 'custom-map-icon',
      html: `<div style="background: #00f2fe; color:#000; font-weight:900; font-size:11px; padding:4px 8px; border-radius:6px; border:2px solid #fff; box-shadow:0 0 10px #00f2fe; white-space:nowrap;">🛫 ICN Airport</div>`,
      iconSize: [80, 24]
    });
    const m1 = L.marker(data.originGps, { icon: originIcon }).addTo(leafletMap);
    m1.bindPopup("<b>Incheon Int'l Airport</b><br>Start of Korea Journey");
    mapMarkers.push(m1);
    points.push(data.originGps);
  }

  // Hub Marker (Seoul Station)
  if (data.hubGps) {
    const hubIcon = L.divIcon({
      className: 'custom-map-icon',
      html: `<div style="background: #ffa502; color:#000; font-weight:900; font-size:11px; padding:4px 8px; border-radius:6px; border:2px solid #fff; box-shadow:0 0 10px #ffa502; white-space:nowrap;">🚄 Seoul Station Hub</div>`,
      iconSize: [110, 24]
    });
    const m2 = L.marker(data.hubGps, { icon: hubIcon }).addTo(leafletMap);
    m2.bindPopup("<b>Seoul Central Station</b><br>KTX & Subway 1/4/AREX Transfer");
    mapMarkers.push(m2);
    points.push(data.hubGps);
  }

  // Intermediate / Regional KTX Station
  if (data.intermediateGps) {
    points.push(data.intermediateGps);
  }

  // Destination Marker
  if (data.destGps) {
    const destIcon = L.divIcon({
      className: 'custom-map-icon',
      html: `<div style="background: #ff4757; color:#fff; font-weight:900; font-size:11px; padding:4px 8px; border-radius:6px; border:2px solid #fff; box-shadow:0 0 16px #ff4757; white-space:nowrap;">📍 ${data.city}</div>`,
      iconSize: [100, 24]
    });
    const m3 = L.marker(data.destGps, { icon: destIcon }).addTo(leafletMap);
    m3.bindPopup(`<b>${data.title}</b><br>Arrival Destination`);
    mapMarkers.push(m3);
    points.push(data.destGps);
  }

  // Draw Glowing Route Polyline
  routePolyline = L.polyline(points, {
    color: '#00f2fe',
    weight: 5,
    opacity: 0.85,
    dashArray: '8, 6',
    lineJoin: 'round'
  }).addTo(leafletMap);

  // Smooth FlyTo & Bounds Fit
  leafletMap.fitBounds(routePolyline.getBounds(), { padding: [60, 60], maxZoom: 12 });
}

// Render Bus Route Sequence
function renderBusRoute(busData) {
  if (!busData) return;
  const header = document.getElementById("busRouteHeader");
  header.innerHTML = `
    <div>
      <div class="bus-num-badge">${busData.busNo}</div>
      <div style="font-size:11px; color:#cbd5e1; margin-top:2px;">Interval: ${busData.interval} · Fare: ${busData.fare}</div>
    </div>
    <div style="font-size:11px; font-weight:800; background:#2ed573; color:#000; padding:4px 8px; border-radius:6px;">LIVE TRACKING</div>
  `;

  const seqContainer = document.getElementById("busStopSequence");
  seqContainer.innerHTML = busData.stops.map(stop => `
    <div class="bus-stop-item ${stop.eta.includes('Target') ? 'highlight-dest' : ''}">
      <span class="stop-seq-num">#${stop.seq}</span>
      <div class="stop-names">
        <div class="ko">${stop.ko}</div>
        <div class="en">${stop.en}</div>
      </div>
      <span class="stop-eta">${stop.eta}</span>
    </div>
  `).join("");
}

// Setup Subway Line Selector
function setupSubwayLineSelector() {
  const lineBtns = document.querySelectorAll(".sub-line-btn");
  lineBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      lineBtns.forEach(b => b.classList.remove("active"));
      const target = e.currentTarget;
      target.classList.add("active");
      renderSubwayLine(target.dataset.line);
    });
  });
  renderSubwayLine("arex");
}

function renderSubwayLine(lineKey) {
  const stations = SUBWAY_NETWORK[lineKey] || SUBWAY_NETWORK.arex;
  const listEl = document.getElementById("subwayStationList");
  listEl.innerHTML = stations.map(st => `
    <div class="station-node-card">
      <div class="station-left">
        <span class="station-bullet"></span>
        <div class="station-info">
          <div class="name-ko">${st.ko}</div>
          <div class="name-en">${st.en}</div>
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:10px; color:#94a3b8;">${st.transfer}</div>
        <div class="station-fast-transfer">⚡ ${st.fastCar}</div>
      </div>
    </div>
  `).join("");
}

// Setup Navigation Tabs
function setupNavigationTabs() {
  const tabs = document.querySelectorAll(".feature-tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      tabs.forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".view-panel").forEach(p => p.classList.remove("active"));

      const target = e.currentTarget;
      target.classList.add("active");
      const viewId = `view-${target.dataset.view}`;
      const viewEl = document.getElementById(viewId);
      if (viewEl) viewEl.classList.add("active");
    });
  });
}

// Setup Destination Selector
function setupDestSelector() {
  const select = document.getElementById("destSelect");
  const findBtn = document.getElementById("findRouteBtn");

  const update = () => {
    currentDestKey = select.value;
    renderDestination(currentDestKey);
  };

  select.addEventListener("change", update);
  findBtn.addEventListener("click", update);
}

// Setup Map Layer Switcher
function setupLayerSwitcher() {
  const btnStreet = document.getElementById("btnLayerStreet");
  const btnSubway = document.getElementById("btnLayerSubway");
  const btnSat = document.getElementById("btnLayerSatellite");

  btnStreet.addEventListener("click", () => {
    document.querySelectorAll(".map-mode-tag").forEach(b => b.classList.remove("active"));
    btnStreet.classList.add("active");
    if (leafletMap) leafletMap.setView([36.5, 127.8], 7);
  });

  btnSubway.addEventListener("click", () => {
    document.querySelectorAll(".map-mode-tag").forEach(b => b.classList.remove("active"));
    btnSubway.classList.add("active");
    // Switch to subway tab
    document.querySelector('[data-view="subway_map"]').click();
  });

  btnSat.addEventListener("click", () => {
    document.querySelectorAll(".map-mode-tag").forEach(b => b.classList.remove("active"));
    btnSat.classList.add("active");
    if (leafletMap) leafletMap.setView([37.5547, 126.9706], 12);
  });
}

// Ssam Interactive Game Builder
function setupSsamBuilder() {
  const layerContainer = document.getElementById("ssamLayers");
  const resetBtn = document.getElementById("resetSsamBtn");

  document.querySelectorAll(".ing-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const ingName = e.currentTarget.dataset.ing;
      ssamLayerStack.push(ingName);
      renderSsamLayers();
    });
  });

  resetBtn.addEventListener("click", () => {
    ssamLayerStack = [];
    renderSsamLayers();
  });

  function renderSsamLayers() {
    if (ssamLayerStack.length === 0) {
      layerContainer.innerHTML = `<span class="plate-base">🍽️ Tap ingredients below to layer:</span>`;
      return;
    }
    layerContainer.innerHTML = ssamLayerStack.map((ing, idx) => `
      <span class="layer-chip">#${idx + 1} ${ing}</span>
    `).join(" ➔ ");
  }
}
