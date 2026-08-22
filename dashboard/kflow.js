/**
 * K-FLOW Foreigner Mobility & Gourmet Interactive Simulator Engine
 */

const TRIP_DATA = {
  jeonju: {
    title: "Incheon ➔ Jeonju Heritage & Food Flow",
    totalDuration: "2h 48m",
    totalSteps: 4,
    timeline: [
      {
        time: "09:00",
        spotKo: "인천국제공항 제1/2터미널",
        spotEn: "Incheon Int'l Airport (ICN Gateway)",
        icon: "🛫",
        desc: "Landing & Entry. Buy WOWPASS / T-Money card at B1 Orange Kiosk.",
        transit: "AREX Direct Express Train (43 min) ➔ Seoul Station",
        mode: "SUBWAY (AREX)"
      },
      {
        time: "10:00",
        spotKo: "서울역 (Seoul Central Hub)",
        spotEn: "Seoul Station KTX Hub",
        icon: "🚄",
        desc: "Track 3 transfer. Board KTX-Sancheon 201 with reserved seats.",
        transit: "KTX-Sancheon Express (100 min) ➔ Jeonju Station",
        mode: "KTX TRAIN"
      },
      {
        time: "11:45",
        spotKo: "전주역 광장",
        spotEn: "Jeonju KTX Station Plaza",
        icon: "🏛️",
        desc: "Traditional Hanok-style train station. Exit front gate to Bus Stop #3.",
        transit: "Bus #119 (20 min) ➔ Jeondong Catholic Church / Hanok Village",
        mode: "LOCAL BUS"
      },
      {
        time: "12:15",
        spotKo: "전주 전통 비빔밥 노포 (한국관)",
        spotEn: "50-Year Heritage Jeonju Bibimbap Restaurant",
        icon: "🍚",
        desc: "UNESCO City of Gastronomy signature dish served in traditional brass bowls.",
        transit: "Destination Arrived (Enjoy Gourmet & Walk in Hanok Village)",
        mode: "WALKING"
      }
    ],
    transitGuide: [
      {
        stepNum: 1,
        title: "Airport Transit: AREX Express to Seoul Hub",
        items: [
          "Follow the Orange 'Airport Railroad' signs down to B1 floor.",
          "Use the kiosk to purchase an AREX Express ticket (₩11,000) with credit card/WOWPASS.",
          "Board the direct train (Non-stop, exactly 43 minutes to Seoul Station)."
        ]
      },
      {
        stepNum: 2,
        title: "Seoul Station: KTX High-Speed Train to Jeonju",
        items: [
          "Arrive at Seoul Station B7, take express elevators to the 2F Main Concourse.",
          "Check the big electronic board for your KTX Train Number and Track (Usually Track 3 or 4).",
          "Board Car No. and Seat No. indicated on your digital ticket."
        ]
      },
      {
        stepNum: 3,
        title: "Jeonju Station: Local Bus #119 to Hanok Village",
        items: [
          "Exit Jeonju Station main gate, walk straight to Bus Stop 3.",
          "Hop on Bus #119, tap your T-Money/WOWPASS card on the front reader.",
          "Get off after 8 stops at 'Jeondong Cathedral / Hanok Village' (English voice announcements available)."
        ]
      }
    ],
    gourmet: {
      dishName: "Jeonju Yukhoe Bibimbap (전주 육회비빔밥)",
      price: "₩15,000 (~$11 USD) / MID Range",
      cultureStory: "Ancient 'Obang-saek' (5 directional colors) philosophy: Red (beef), Green (namul), Yellow (egg), White (rice), Black (mushroom). Represents harmony of body and nature.",
      howToEat: [
        "1. Hold chopsticks in both hands and gently mix with circular motions to keep rice fluffy!",
        "2. Once the chili paste is evenly spread, use a spoon to scoop a full bite with side dishes on top.",
        "3. The brass bowl is heavy and hot—do not touch with bare hands!"
      ],
      orderingTip: "If you cannot eat raw beef, ask for 'Ik-hin Bibimbap (Cooked beef)'. For low spice, say: 'Gochujang Ttaro Juseyo' (Chili sauce on the side)."
    },
    phrases: [
      {
        kr: "고추장 따로 주세요!",
        roman: "Gochujang ttaro juseyo!",
        en: "Please put the spicy chili paste on the side."
      },
      {
        kr: "안 맵게 해주세요.",
        roman: "An maep-ge hae-juseyo.",
        en: "Please make it mild / non-spicy."
      },
      {
        kr: "이거 어떻게 먹는 거예요?",
        roman: "I-geo eotteoke meong-neun geoyeyo?",
        en: "How do I eat this dish properly?"
      }
    ]
  },

  busan: {
    title: "Incheon ➔ Busan Coastal & Seafood Flow",
    totalDuration: "3h 10m",
    totalSteps: 4,
    timeline: [
      {
        time: "09:00",
        spotKo: "인천국제공항",
        spotEn: "Incheon Airport (ICN)",
        icon: "🛫",
        desc: "AREX Direct to Seoul Station.",
        transit: "AREX Direct (43 min)",
        mode: "AREX"
      },
      {
        time: "10:15",
        spotKo: "서울역 (Seoul Station)",
        spotEn: "Seoul Station KTX Platform",
        icon: "🚄",
        desc: "Board KTX Gyeongbu Line straight to Busan.",
        transit: "KTX Express (135 min) ➔ Busan Station",
        mode: "KTX"
      },
      {
        time: "12:40",
        spotKo: "부산역 ➔ 자갈치시장",
        spotEn: "Busan Station to Jagalchi Fish Market",
        icon: "🐟",
        desc: "Take Subway Line 1 (Orange line) directly to Jagalchi Station Exit 10.",
        transit: "Subway Line 1 (8 min)",
        mode: "SUBWAY"
      },
      {
        time: "13:00",
        spotKo: "자갈치시장 활어회 & 생선구이 노포",
        spotEn: "Jagalchi Authentic Seafood Alley",
        icon: "🥢",
        desc: "Fresh catch of the day with authentic local wrapping culture.",
        transit: "Destination Arrived (Afternoon stroll to Huinnyeoul Village)",
        mode: "WALKING"
      }
    ],
    transitGuide: [
      {
        stepNum: 1,
        title: "Seoul to Busan KTX Ride",
        items: [
          "Board KTX train at Seoul Station. Sit back and enjoy the scenic mountain-to-coast view.",
          "Arrive at Busan Station 2F concourse."
        ]
      },
      {
        stepNum: 2,
        title: "Busan Subway Line 1 to Jagalchi Market",
        items: [
          "Follow underground signs for Subway Line 1 (Orange Line).",
          "Take train towards Dadaepo Beach, ride 3 stops and exit at Jagalchi Station (Exit 10).",
          "Walk 3 minutes towards the sea breeze into the market."
        ]
      }
    ],
    gourmet: {
      dishName: "Busan Dwaeji Gukbap & Fresh Sashimi (돼지국밥 & 활어회)",
      price: "₩9,000 - ₩25,000 / LOW-MID Range",
      cultureStory: "Born from Busan's resilient port workers. Rich pork broth infused with vitality, and seafood wrapped with perilla leaves.",
      howToEat: [
        "1. For Pork Soup: Add seasoned chives (Jeongguji) and salted shrimp (Saeujeot) to adjust broth flavor!",
        "2. For Sashimi: Place fish on Perilla leaf + dab of Ssamjang + garlic slice, wrap into one bite!"
      ],
      orderingTip: "Ask for 'Gukbap taro juseyo' (Rice served in separate bowl) for the cleanest taste."
    },
    phrases: [
      {
        kr: "돼지국밥 한 그릇 주세요!",
        roman: "Dwaeji gukbap han geureut juseyo!",
        en: "One bowl of pork soup rice, please."
      },
      {
        kr: "새우젓 어디에 넣어요?",
        roman: "Saeujeot eodie neo-eoyo?",
        en: "Where should I put the salted shrimp?"
      }
    ]
  },

  gangneung: {
    title: "Incheon ➔ Gangneung East Sea Coffee & Tofu Flow",
    totalDuration: "2h 55m",
    totalSteps: 4,
    timeline: [
      {
        time: "09:00",
        spotKo: "인천국제공항",
        spotEn: "Incheon Airport (ICN)",
        icon: "🛫",
        desc: "AREX Direct to Seoul Station.",
        transit: "AREX Direct (43 min)",
        mode: "AREX"
      },
      {
        time: "10:15",
        spotKo: "서울역 (Seoul Station)",
        spotEn: "Seoul Station KTX Platform",
        icon: "🚄",
        desc: "Board KTX-Eum Gangneung Line through Taebaek mountains.",
        transit: "KTX-Eum (120 min) ➔ Gangneung Station",
        mode: "KTX-EUM"
      },
      {
        time: "12:20",
        spotKo: "강릉역 ➔ 안목해변 커피거리",
        spotEn: "Gangneung Station to Anmok Beach Coffee Street",
        icon: "☕",
        desc: "Take Bus #223-1 or local taxi for 15 min to coastal coffee promenade.",
        transit: "Bus / Taxi (15 min)",
        mode: "BUS/TAXI"
      },
      {
        time: "12:50",
        spotKo: "초당 순두부 노포 & 오션뷰 카페",
        spotEn: "Chodang Soft Tofu & Coastal Cafe",
        icon: "🍲",
        desc: "Sea-water coagulated artisanal tofu followed by hand-drip ocean coffee.",
        transit: "Destination Arrived",
        mode: "WALKING"
      }
    ],
    transitGuide: [
      {
        stepNum: 1,
        title: "KTX-Eum to Gangneung",
        items: [
          "Super fast, eco-friendly KTX-Eum train leaves from Seoul Station.",
          "Arrive at Gangneung Station B1 underground terminal."
        ]
      },
      {
        stepNum: 2,
        title: "Station to Anmok Beach Coffee Promenade",
        items: [
          "Exit Gate 1, take Taxi (approx ₩7,000 / $5 USD) or Bus #223.",
          "Enjoy the pine trees and open ocean view immediately upon arrival."
        ]
      }
    ],
    gourmet: {
      dishName: "Chodang Sundubu (초당 순두부 & 짬뽕순두부)",
      price: "₩12,000 (~$9 USD)",
      cultureStory: "Made with clean East Sea seawater instead of chemical coagulants since the Joseon dynasty for supreme silky texture.",
      howToEat: [
        "1. Taste the pure white tofu first with just a tiny drop of seasoned soy sauce.",
        "2. If having Jjamppong Sundubu (Spicy), mix the spicy broth with the soft tofu to balance the kick."
      ],
      orderingTip: "Ask for 'Sundubu Baekban' for non-spicy pure tofu, or 'Jjamppong Sundubu' for spicy seafood kick."
    },
    phrases: [
      {
        kr: "초당 순두부 백반 주세요!",
        roman: "Chodang sundubu baekban juseyo!",
        en: "One Chodang Soft Tofu set, please."
      },
      {
        kr: "여기 덜 맵게 되나요?",
        roman: "Yeogi deol maep-ge doenayo?",
        en: "Can you make it less spicy here?"
      }
    ]
  },

  gyeongju: {
    title: "Incheon ➔ Gyeongju Millennium Heritage Flow",
    totalDuration: "2h 45m",
    totalSteps: 4,
    timeline: [
      {
        time: "09:00",
        spotKo: "인천국제공항",
        spotEn: "Incheon Airport (ICN)",
        icon: "🛫",
        desc: "AREX Direct to Seoul Station.",
        transit: "AREX Direct (43 min)",
        mode: "AREX"
      },
      {
        time: "10:15",
        spotKo: "서울역 (Seoul Station)",
        spotEn: "Seoul Station KTX Platform",
        icon: "🚄",
        desc: "Board KTX to Singyeongju Station.",
        transit: "KTX (120 min) ➔ Singyeongju Station",
        mode: "KTX"
      },
      {
        time: "12:20",
        spotKo: "신경주역 ➔ 대릉원 & 황리단길",
        spotEn: "Singyeongju to Daereungwon Royal Tombs & Hwangridan-gil",
        icon: "🏛️",
        desc: "Take Bus #700 or 50 to Daereungwon entrance.",
        transit: "Bus #700 (25 min)",
        mode: "LOCAL BUS"
      },
      {
        time: "12:50",
        spotKo: "황리단길 전통 한옥 맛집",
        spotEn: "Hwangridan-gil Hanok Dining & Night Illumination",
        icon: "🏮",
        desc: "Ancient Shilla dynasty history meets trendy boutique cafes.",
        transit: "Destination Arrived",
        mode: "WALKING"
      }
    ],
    transitGuide: [
      {
        stepNum: 1,
        title: "KTX to Singyeongju Station",
        items: [
          "Board KTX at Seoul Station, disembark at Singyeongju Station.",
          "Singyeongju Station is connected to major city center express bus lines."
        ]
      },
      {
        stepNum: 2,
        title: "Bus #700 to Hwangridan-gil & Daereungwon",
        items: [
          "Take Bus #700 or #50 right in front of the station platform.",
          "Get off at 'Hwangridan-gil / Daereungwon' bus stop (approx 20-25 mins)."
        ]
      }
    ],
    gourmet: {
      dishName: "Gyeongju Tteokgalbi & Ssambap (경주 떡갈비 쌈밥)",
      price: "₩16,000 (~$12 USD)",
      cultureStory: "Royal Shilla culinary legacy: Hand-minced grilled beef patties served with over 10 varieties of organic local ssam leaves.",
      howToEat: [
        "1. Take two layers of ssam leaves (e.g. Red lettuce + Perilla leaf).",
        "2. Place a chunk of savory Tteokgalbi + ssamjang + pickled radish.",
        "3. Fold tightly and eat in one single mouthful for bursting flavor!"
      ],
      orderingTip: "Ask for 'Hanwoo Tteokgalbi Jeongsik' (Korean Beef Royal Set)."
    },
    phrases: [
      {
        kr: "떡갈비 정식 2인분 주세요!",
        roman: "Tteokgalbi jeongsik i-inbun juseyo!",
        en: "Two servings of Grilled Beef Patty Set, please."
      },
      {
        kr: "쌈 채소 리필 되나요?",
        roman: "Ssam chaeso ripil doenayo?",
        en: "Can I get more wrap greens, please?"
      }
    ]
  }
};

let currentCity = "jeonju";

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  renderCityData(currentCity);
  setupEventListeners();
  startClock();
});

function startClock() {
  const clockEl = document.getElementById("deviceClock");
  const update = () => {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    if (clockEl) clockEl.textContent = `${hrs}:${mins}`;
  };
  update();
  setInterval(update, 10000);
}

function setupEventListeners() {
  // City Selectors
  document.querySelectorAll(".city-chip").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".city-chip").forEach(c => c.classList.remove("active"));
      const chip = e.currentTarget;
      chip.classList.add("active");
      currentCity = chip.dataset.city;
      renderCityData(currentCity);
    });
  });

  // App Tabs inside phone
  document.querySelectorAll(".tab-btn").forEach(tab => {
    tab.addEventListener("click", (e) => {
      document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));

      const targetTab = e.currentTarget;
      targetTab.classList.add("active");
      const contentId = `tab-${targetTab.dataset.tab}`;
      const contentEl = document.getElementById(contentId);
      if (contentEl) contentEl.classList.add("active");
    });
  });

  // Generate Button Click
  const runBtn = document.getElementById("runSimulatorBtn");
  if (runBtn) {
    runBtn.addEventListener("click", () => {
      renderCityData(currentCity);
      // Play a quick highlight effect
      const screen = document.querySelector(".device-screen");
      screen.style.opacity = "0.5";
      setTimeout(() => {
        screen.style.opacity = "1";
      }, 150);
    });
  }
}

function renderCityData(cityKey) {
  const data = TRIP_DATA[cityKey] || TRIP_DATA.jeonju;

  // Title
  document.getElementById("currentSelectedTripTitle").textContent = data.title;

  // 1. Timeline Tab
  const timelineEl = document.getElementById("timelineList");
  timelineEl.innerHTML = data.timeline.map((item, idx) => `
    <div class="timeline-card">
      <div class="time-header">
        <span class="time-badge">${item.time}</span>
        <span class="duration-badge">Stop ${idx + 1}</span>
      </div>
      <div class="spot-title-row">
        <span class="spot-icon">${item.icon}</span>
        <div>
          <div class="spot-name-ko">${item.spotKo}</div>
          <div class="spot-name-en">${item.spotEn}</div>
        </div>
      </div>
      <p style="font-size: 12px; color: #cbd5e1; line-height: 1.4;">${item.desc}</p>
      <div class="transit-connector">
        <span class="connector-mode">➔ ${item.mode}:</span> ${item.transit}
      </div>
    </div>
  `).join("");

  // 2. Transit Guide Tab
  const transitEl = document.getElementById("transitGuideContent");
  transitEl.innerHTML = data.transitGuide.map(guide => `
    <div class="transit-step-box">
      <span class="step-num-badge">STEP ${guide.stepNum}</span>
      <h4 class="transit-title">${guide.title}</h4>
      <div class="transit-instruction-list">
        ${guide.items.map(item => `
          <div class="instruction-item">
            <span class="bullet">✔</span>
            <span>${item}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  // 3. Gourmet Tab
  const gourmetEl = document.getElementById("gourmetContent");
  const g = data.gourmet;
  gourmetEl.innerHTML = `
    <div class="food-hero-card">
      <div class="dish-header">
        <h3 class="dish-name">${g.dishName}</h3>
        <span style="font-size: 11px; color: #94a3b8; font-weight: 700;">${g.price}</span>
      </div>
      <div class="cultural-story">
        <strong>📖 Cultural Narrative:</strong><br/>
        ${g.cultureStory}
      </div>
      <div class="how-to-eat-steps">
        <h4 style="font-size: 13px; font-weight: 800; color: #00ff88;">🥢 How to Eat (Step-by-Step):</h4>
        ${g.howToEat.map(s => `<div class="eat-step">${s}</div>`).join("")}
      </div>
      <div style="background: rgba(0, 229, 255, 0.1); border: 1px dashed rgba(0, 229, 255, 0.4); border-radius: 10px; padding: 10px; font-size: 11px; color: #e2e8f0; line-height: 1.4;">
        <strong>💡 Ordering Tip for Foreigners:</strong><br/>
        ${g.orderingTip}
      </div>
    </div>
  `;

  // 4. Korean Phrase Card Tab
  const phraseEl = document.getElementById("phraseContent");
  phraseEl.innerHTML = `
    <p style="font-size: 12px; color: #94a3b8; margin-bottom: 12px;">
      👉 Show this screen directly to local restaurant staff when ordering!
    </p>
    ${data.phrases.map(p => `
      <div class="phrase-card">
        <span class="show-staff-badge">SHOW TO STAFF</span>
        <div class="phrase-kr">"${p.kr}"</div>
        <div class="phrase-roman">Pronunciation: ${p.roman}</div>
        <div class="phrase-en">Meaning: ${p.en}</div>
      </div>
    `).join("")}
  `;
}
