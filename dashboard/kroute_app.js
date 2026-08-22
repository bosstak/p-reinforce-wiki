/**
 * K-ROUTE Interactive Map & Travel Experience Engine
 * Designed by AI Design Director SIA (시아)
 */

const DESTINATION_DATABASE = {
  jeonju_hanok: {
    city: "Jeonju (전주)",
    title: "Jeonju Hanok Village & Gourmet Flow",
    totalTime: "2h 48m",
    totalFare: "₩44,800 (~$33.20)",
    transfers: "2 Times",
    mapCoords: { x: 360, y: 380, path: "M 120 180 Q 220 220 280 200 T 360 380" },
    steps: [
      {
        tag: "AREX EXPRESS",
        tagClass: "tag-arex",
        duration: "43 min (₩11,000)",
        title: "1. Incheon Airport ➔ Seoul Station",
        desc: "Take the Orange Line AREX Express. Non-stop comfort with free high-speed Wi-Fi.",
        tip: "💡 Tip: Purchase WOWPASS card at B1 kiosk to pay for both AREX and KTX seamlessly."
      },
      {
        tag: "KTX-SANCHEON",
        tagClass: "tag-ktx",
        duration: "1h 40m (₩32,300)",
        title: "2. Seoul Station ➔ Jeonju Station",
        desc: "Board KTX Jeolla line from Track 3. Scenic views through agricultural heartland.",
        tip: "💡 Tip: Power outlets & USB ports are available under every window seat."
      },
      {
        tag: "LOCAL BUS #119",
        tagClass: "tag-bus",
        duration: "20 min (₩1,500)",
        title: "3. Jeonju Station ➔ Hanok Village",
        desc: "Take Bus 119 right outside the Hanok station exit. English voice broadcast enabled.",
        tip: "💡 Tip: Tag your card when boarding (front door) and getting off (rear door)."
      }
    ],
    spots: [
      {
        name: "Jeonju Hanok Village (전주 한옥마을)",
        badge: "K-DRAMA SPOT",
        photoBadge: "📸 Retro Hanbok",
        story: "Filming location of 'Twenty-Five Twenty-One' (스물다섯 스물하나) & 'Mr. Sunshine'. Over 700 traditional wooden houses offering tranquil alley walks."
      },
      {
        name: "Gyeonggijeon Shrine (경기전)",
        badge: "ROYAL HERITAGE",
        photoBadge: "🌿 Bamboo Forest",
        story: "Sacred shrine preserving King Taejo’s portrait. The serene bamboo groove was featured in 'Moonlight Drawn by Clouds' (구르미 그린 달빛)."
      },
      {
        name: "Jeondong Catholic Cathedral (전동성당)",
        badge: "ROMANESQUE",
        photoBadge: "⛪ Gothic Brick",
        story: "Stunning 1914 Romanesque cathedral built on historic grounds, showcasing breathtaking architectural contrast against traditional tile roofs."
      }
    ],
    gourmet: [
      {
        name: "Traditional Jeonju Yukhoe Bibimbap (전주 육회비빔밥)",
        price: "₩15,000 (~$11.00)",
        howTo: "🥢 Use chopsticks to fluff and mix ingredients in circular motion. Do not press with spoon!",
        noPhotoTip: "📋 Show this phrase: '육회비빔밥 1인분, 고추장 따로 주세요' (Yukhoe Bibimbap 1 serving, Gochujang on side)."
      },
      {
        name: "Nambu Market Bean Sprout Soup (전주 콩나물국밥)",
        price: "₩8,000 (~$5.90)",
        howTo: "🥢 Pour 3 spoons of hot broth into the soft poached egg (수란), stir with seaweed flakes and sip first!",
        noPhotoTip: "📋 Show this phrase: '안 맵게 해주세요, 오징어 사리 추가요' (Mild please, with extra diced squid)."
      }
    ]
  },

  busan_haeundae: {
    city: "Busan (부산)",
    title: "Busan Coastal Sky Capsule & Jagalchi Fish Market",
    totalTime: "3h 10m",
    totalFare: "₩62,800 (~$46.50)",
    transfers: "2 Times",
    mapCoords: { x: 580, y: 460, path: "M 120 180 Q 220 220 280 200 T 580 460" },
    steps: [
      {
        tag: "AREX EXPRESS",
        tagClass: "tag-arex",
        duration: "43 min",
        title: "1. Incheon Airport ➔ Seoul Station",
        desc: "Fast airport transfer straight to the high-speed rail hub.",
        tip: "💡 Tip: Direct luggage delivery service to Busan hotels available at Seoul Station."
      },
      {
        tag: "KTX GYEONGBU",
        tagClass: "tag-ktx",
        duration: "2h 15m (₩59,800)",
        title: "2. Seoul Station ➔ Busan Station",
        desc: "Non-stop 300 km/h bullet train traversing South Korea from north to south.",
        tip: "💡 Tip: Ocean-side seats (Row A/B) offer glimpses of the southern sea upon arrival."
      },
      {
        tag: "SUBWAY LINE 1",
        tagClass: "tag-bus",
        duration: "10 min (₩1,600)",
        title: "3. Busan Station ➔ Jagalchi Market",
        desc: "Orange subway line towards Dadaepo. Exit 10 directly leads to the harbor.",
        tip: "💡 Tip: Tap T-Money or WOWPASS at turnstiles."
      }
    ],
    spots: [
      {
        name: "Haeundae Blueline Park (해운대 블루라인파크)",
        badge: "K-DRAMA & TREND",
        photoBadge: "🚡 Ocean Capsule",
        story: "Colorful coastal sky capsules overlooking the East Sea. Featured in viral global travel vlogs and romantic dramas."
      },
      {
        name: "Huinnyeoul Culture Village (영도 흰여울문화마을)",
        badge: "FILM 'THE ATTORNEY'",
        photoBadge: "🌊 Cliffside Alley",
        story: "Former refugee sanctuary turned into cliffside art village with pristine sunset views and quiet seaside stairs."
      }
    ],
    gourmet: [
      {
        name: "Busan Dwaeji Gukbap (부산 돼지국밥)",
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
    mapCoords: { x: 520, y: 150, path: "M 120 180 Q 220 220 280 200 T 520 150" },
    steps: [
      {
        tag: "AREX EXPRESS",
        tagClass: "tag-arex",
        duration: "43 min",
        title: "1. Incheon Airport ➔ Seoul Station",
        desc: "Smooth express transit into central Seoul.",
        tip: "💡 Tip: Smooth indoor transfer from AREX to KTX platform."
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
        desc: "Direct bus to the famous Anmok seaside coffee street.",
        tip: "💡 Tip: Taxis are also very affordable (around ₩7,000 / $5 USD)."
      }
    ],
    spots: [
      {
        name: "Jumunjin Breakwater (주문진 방파제)",
        badge: "DRAMA 'GUARDIAN: GOBBLIN'",
        photoBadge: "🧣 Red Scarf Spot",
        story: "The iconic scene where Kim Shin meets Eun-tak with buckwheat flowers and red scarf overlooking crashing blue waves."
      },
      {
        name: "Anmok Coffee Street (안목해변 커피거리)",
        badge: "CAFÉ CULTURE",
        photoBadge: "☕ Ocean View Balcony",
        story: "Over 30 artisan roasteries lining the white sandy coastline. Listen to the ocean breeze while sipping specialty drip coffee."
      }
    ],
    gourmet: [
      {
        name: "Chodang Artisanal Soft Tofu (초당 순두부)",
        price: "₩12,000 (~$8.90)",
        howTo: "🥢 Taste the pure tofu first to savor the subtle sweetness of East Sea mineral water.",
        noPhotoTip: "📋 Show: '초당 순두부 백반 2인분 주세요' (2 servings of Chodang soft tofu set)."
      }
    ]
  },

  gyeongju_hwangridan: {
    city: "Gyeongju (경주)",
    title: "Gyeongju Royal Heritage & Hwangridan-gil",
    totalTime: "2h 45m",
    totalFare: "₩54,000 (~$40.00)",
    transfers: "2 Times",
    mapCoords: { x: 530, y: 390, path: "M 120 180 Q 220 220 280 200 T 530 390" },
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
        desc: "KTX bullet train straight to the ancient capital of the Shilla Dynasty.",
        tip: "💡 Tip: Singyeongju bus terminal connects directly to historic downtown."
      },
      {
        tag: "BUS #700",
        tagClass: "tag-bus",
        duration: "20 min (₩1,600)",
        title: "3. Singyeongju ➔ Daereungwon Royal Tombs",
        desc: "Express bus arriving at the heart of Hwangridan-gil alleyways.",
        tip: "💡 Tip: Rent a bicycle or electric scooter to explore royal tomb complexes easily."
      }
    ],
    spots: [
      {
        name: "Donggung Palace & Wolji Pond (동궁과 월지)",
        badge: "DRAMA 'THE RED SLEEVE'",
        photoBadge: "🏮 Night Illumination",
        story: "Stunning royal palace illuminated over reflective lotus pond at night. Best night photography point in Korea."
      },
      {
        name: "Hwangridan-gil Hanok Alleys (황리단길)",
        badge: "TRENDY HANOK",
        photoBadge: "☕ Rooftop Cafe",
        story: "Historic 1960s tiled roof alleys transformed into bohemian cafes, photo booths, and fusion restaurants."
      }
    ],
    gourmet: [
      {
        name: "Gyeongju Hanwoo Tteokgalbi Ssambap (경주 떡갈비 쌈밥)",
        price: "₩16,000 (~$11.90)",
        howTo: "🥢 Double wrap: place beef patty inside lettuce + perilla leaf with ssamjang for supreme umami.",
        noPhotoTip: "📋 Show: '떡갈비 쌈밥 정식 주세요' (Tteokgalbi Ssambap set, please)."
      }
    ]
  },

  seoul_myeongdong: {
    city: "Seoul (서울)",
    title: "Seoul Central Myeongdong & N Seoul Tower",
    totalTime: "52m",
    totalFare: "₩11,000 (~$8.15)",
    transfers: "1 Time",
    mapCoords: { x: 280, y: 200, path: "M 120 180 Q 200 190 280 200" },
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
        tip: "💡 Tip: Exit 3 for Namsan Cable Car shuttle."
      }
    ],
    spots: [
      {
        name: "N Seoul Tower (N서울타워)",
        badge: "DRAMA 'MY LOVE FROM THE STAR'",
        photoBadge: "🔒 Love Locks",
        story: "Panoramic 360-degree skyline view over the capital. Famous romantic love lock terrace."
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

let currentDestKey = "jeonju_hanok";
let ssamLayerStack = [];

document.addEventListener("DOMContentLoaded", () => {
  renderDestination(currentDestKey);
  setupNavigationTabs();
  setupDestSelector();
  setupSsamBuilder();
  setupCustomScheduleGenerator();
  setupFloatingStepNav();
});

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

function renderDestination(key) {
  const data = DESTINATION_DATABASE[key] || DESTINATION_DATABASE.jeonju_hanok;

  // 1. Update Transit Stats
  document.getElementById("routeTotalTime").textContent = data.totalTime;
  document.getElementById("routeTotalFare").textContent = data.totalFare;
  document.getElementById("routeTransfers").textContent = data.transfers;

  // 2. Render Transit Steps
  const transitContainer = document.getElementById("transitStepsContainer");
  transitContainer.innerHTML = data.steps.map((s, idx) => `
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

  // 3. Render Spots & K-Drama Cards
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

  // 4. Render Gourmet Cards
  const gourmetContainer = document.getElementById("gourmetCardContainer");
  gourmetContainer.innerHTML = data.gourmet.map(g => `
    <div class="spot-detail-card" style="border-left: 3px solid #00f2fe;">
      <div class="spot-tag-row">
        <span class="photo-badge" style="background: rgba(255, 165, 2, 0.2); color: #ffa502;">🍽️ LOCAL SPECIALTY</span>
        <span style="font-size: 11px; font-weight: 700; color: #fff;">${g.price}</span>
      </div>
      <h4 class="spot-name" style="color: #00f2fe;">${g.name}</h4>
      <p class="spot-story">${g.howTo}</p>
      <div class="step-tip-box" style="border-left-color: #ffa502; background: rgba(0,0,0,0.5); color: #ffbe76;">
        ${g.noPhotoTip}
      </div>
    </div>
  `).join("");

  // 5. Update Map Visuals (SVG Line & Marker Position)
  const pathEl = document.getElementById("routePathSvg");
  const destCircle = document.getElementById("destMapCircle");
  const destPin = document.getElementById("destMapPin");
  const destPinText = document.getElementById("destMapPinText");

  if (data.mapCoords) {
    pathEl.setAttribute("d", data.mapCoords.path);
    destCircle.setAttribute("cx", data.mapCoords.x);
    destCircle.setAttribute("cy", data.mapCoords.y);
    destPin.style.left = `${data.mapCoords.x - 30}px`;
    destPin.style.top = `${data.mapCoords.y - 35}px`;
    destPinText.textContent = `📍 ${data.city}`;
  }

  // 6. Update Bottom Floating Step Card
  if (data.steps && data.steps.length > 0) {
    document.getElementById("floatingStepTitle").textContent = data.steps[0].title;
    document.getElementById("floatingStepDesc").textContent = data.steps[0].desc;
  }
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

// Custom AI Schedule Generator
function setupCustomScheduleGenerator() {
  const genBtn = document.getElementById("generateCustomScheduleBtn");
  const resultsContainer = document.getElementById("customScheduleResults");

  genBtn.addEventListener("click", () => {
    const data = DESTINATION_DATABASE[currentDestKey];
    resultsContainer.innerHTML = `
      <div style="background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 12px; padding: 14px; margin-top: 12px;">
        <h4 style="font-size: 13px; font-weight: 800; color: #00f2fe; margin-bottom: 8px;">
          ✨ AI-Optimized 1-Day Itinerary for ${data.city}
        </h4>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #cbd5e1;">
          <div>⏱️ <strong>09:00 - 11:48</strong> : Express Transit from ICN to ${data.city}</div>
          <div>🍚 <strong>12:00 - 13:30</strong> : Local Signature Lunch & Ssam Experience</div>
          <div>🏛️ <strong>14:00 - 16:30</strong> : ${data.spots[0] ? data.spots[0].name : 'Heritage Walk'} Photo Exploration</div>
          <div>☕ <strong>17:00 - 18:30</strong> : Golden Hour Sunset Cafe & Relaxation</div>
          <div>🏮 <strong>19:00 - 21:00</strong> : Traditional Night Market Food Tour</div>
        </div>
      </div>
    `;
  });
}

// Floating step navigator
let currentStepIdx = 0;
function setupFloatingStepNav() {
  const nextBtn = document.getElementById("nextStepBtn");
  nextBtn.addEventListener("click", () => {
    const data = DESTINATION_DATABASE[currentDestKey];
    if (!data.steps) return;
    currentStepIdx = (currentStepIdx + 1) % data.steps.length;
    const step = data.steps[currentStepIdx];
    document.getElementById("floatingStepTitle").textContent = step.title;
    document.getElementById("floatingStepDesc").textContent = step.desc;
  });
}
