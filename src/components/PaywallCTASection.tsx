// src/components/PaywallCTASection.tsx

import React, { useState } from 'react';

/**
 * @description 3단계 결제 유도(Funnel) 프로토타입 컴포넌트.
 * 무료 결과 -> 정보 결핍 -> 해결책 제시 흐름을 구현합니다.
 */
const PaywallCTASection: React.FC = () => {
  // State 관리: 0 (Free), 1 (Gap), 2 (Paid)
  const [funnelStage, setFunnelStage] = useState<number>(0);

  /**
   * Stage 0 -> Stage 1 전환 로직: 무료 결과를 확인한 후 Paywall을 인지하게 함.
   */
  const handleDiscoverGap = () => {
    setFunnelStage(1);
  };

  /**
   * Stage 1 -> Stage 2 전환 로직: 해결책 제시를 클릭하여 최종 결제 단계로 진입.
   */
  const handleRevealSolution = () => {
    setFunnelStage(2);
  };

  // --- UI 렌더링 분기 처리 ---

  let content;
  let title = "✨ Advanced Trip Planner Report 결과";

  switch (funnelStage) {
    case 0: // Stage 1: Free View - 무료 정보 제공
      content = (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-indigo-700 mb-3">✅ 기본 경로 분석 결과</h3>
          <p>인천공항에서 서울 주요 지역까지의 예상 이동 시간이 **평균 60분**이며, 가장 저렴한 대중교통 옵션이 제시되었습니다.</p>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>🚌 공항철도 + 환승: 비용 효율적 (₩5,000 내외)</li>
            <li>🚕 일반 택시: 가장 빠르고 편리함 (약 70분 소요 예상)</li>
          </ul>
        </div>
      );
      break;

    case 1: // Stage 2: Information Gap - 정보 결핍 유도
      content = (
        <div className="p-8 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow-xl transition duration-300 transform hover:shadow-2xl">
          <h3 className="text-2xl font-bold text-red-600 mb-3 flex items-center">
            ⚠️ 놓치고 계신 정보가 있습니다! 🐛
          </h3>
          <p className="text-lg mb-4 text-gray-700">
            현재 결과는 기본적인 옵션만을 제공합니다. 하지만, **실시간 교통량 데이터**와 **비용 대비 최적의 시간대별 대체 루트(Hidden Gem)**를 분석해야만 진정한 '경제적 최적 대안'을 찾을 수 있습니다.
          </p>
          <button 
            onClick={handleRevealSolution} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-200 shadow-lg cursor-pointer transform hover:scale-105"
          >
            숨겨진 최적 루트 분석 보고서 받기 (Paywall 진입) ⚙️
          </button>
        </div>
      );
      break;

    case 2: // Stage 3: Solution Presented - 최종 CTA 및 가치 제시
      content = (
        <div className="p-10 bg-indigo-50 border-4 border-indigo-600 rounded-xl shadow-2xl text-center">
          <h2 className="text-4xl font-extrabold text-indigo-800 mb-3">💰 완벽한 최적 대안을 발견하세요.</h2>
          <p className="text-xl text-gray-700 mb-6">
            **Advanced Report Premium 구독** 시, 실시간 API 연동 기반의 딥러닝 분석 결과와 비용 절감 시뮬레이션이 즉시 제공됩니다.
          </p>
          
          {/* 가격표 섹션 */}
          <div className="flex justify-center space-x-6 mb-8">
            <div className="bg-white p-5 rounded-lg shadow max-w-xs border">
              <p className="text-sm text-gray-500">무료</p>
              <h4 className="text-3xl font-bold mt-1">$0</h4>
              <p className="text-sm text-green-600">기본 분석</p>
            </div>
            <div className="bg-indigo-600 p-8 rounded-lg shadow-2xl transform scale-105 border-4 border-yellow-400 max-w-xs">
              <span className="text-sm text-yellow-400 font-semibold block mb-1">⭐ 추천</span>
              <h3 className="text-4xl font-extrabold text-white">$9.99</h3>
              <p className="text-lg text-indigo-200 mt-2">Advanced Report (월)</p>
            </div>
          </div>

          <button 
            className="bg-red-500 hover:bg-red-600 text-white font-extrabold py-4 px-12 rounded-full text-xl transition duration-300 shadow-lg cursor-pointer transform hover:scale-105"
          >
            지금 바로 최적 대안 보고서 받기! (결제) 💸
          </button>

          <p className="text-sm text-gray-400 mt-6">환불 정책 확인 | 약관 동의 필수</p>
        </div>
      );
      break;
  }

  return (
    <section id="paywall-cta" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">{title}</h2>

        {/* Dynamic Content Area */}
        {content}
        
        {/* 단계별 가이드 (디버깅용) */}
        <div className="mt-12 p-4 bg-gray-100 rounded-lg text-left max-w-md mx-auto">
            <p className="text-sm font-mono text-indigo-700">
                [현재 Funnel Stage: {funnelStage}] - 상태에 따라 UI가 전환됩니다. ⚙️
            </p>
        </div>
      </div>
    </section>
  );
};

export default PaywallCTASection;