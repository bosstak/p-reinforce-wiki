import React, { useState } from 'react';

// ====================================================
// 📐 Type Definitions (API Schema 기반)
// ====================================================
interface KPI {
  name: string; // 예: 평균 여행 기간, 비자 발급 시간 등
  standardValue: number | string; // 표준 경로의 값
  recommendedValue: number | string; // 추천 경로의 값
  unit?: string; // 단위 (일, 원, %, 건)
}

interface AdvancedReportData {
  kpis: KPI[];
  hiddenCost: {
    description: string;
    amount: number; // 손실액 수치
    currency: string;
  };
  potentialSavingsDays: number; // 시간적 효용 (일)
  comparisonSummary: string; // 핵심 요약 문구
}

// ====================================================
// 🚀 Mock Data & Handlers (Integration Test Focus)
// ====================================================

/**
 * @description 비동기적으로 고급 보고서 데이터를 모킹합니다. 실제 API 호출을 대체합니다.
 */
const fetchAdvancedReportDataMock = (): Promise<AdvancedReportData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // 1초 지연을 통해 로딩 상태 시뮬레이션
      // 성공 케이스: 모든 데이터가 정상적으로 돌아왔다고 가정합니다.
      const mockData: AdvancedReportData = {
        kpis: [
          { name: "평균 여행 준비 기간", standardValue: 30, recommendedValue: 14, unit: "일" },
          { name: "비자 신청 성공률 (초기)", standardValue: "75%", recommendedValue: "98%", unit: "" },
          { name: "예상 통관 지연 일수", standardValue: 2, recommendedValue: 0.5, unit: "일" },
        ],
        hiddenCost: {
          description: "불필요한 대기 시간 및 기회비용으로 인한 예상 손실액",
          amount: 1250, // 가상의 금액
          currency: "USD",
        },
        potentialSavingsDays: 16, // 시간적 효용 (일)
        comparisonSummary: "표준 방식 대비 평균 4주 이상의 시간 절약 및 $1250의 비용 절감 효과가 예상됩니다.",
      };
      resolve(mockData);

    }, 1000);
  });
};


// ====================================================
// ✨ Component Structure
// ====================================================

/**
 * @description KPI를 비교하고 시각적으로 손실을 강조하는 섹션
 */
const ComparisonTable: React.FC<{ kpis: KPI[]; isPremium: boolean }> = ({ kpis, isPremium }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">📊 핵심 지표 비교: 표준 경로 vs. 추천 경로</h3>
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-sm font-medium text-gray-700 w-1/3">{`지표`}</th>
          <th className={`px-6 py-3 text-center text-sm font-bold ${isPremium ? 'text-indigo-600' : 'text-red-500'}`}>표준 경로 (위험)</th>
          <th className={`px-6 py-3 text-center text-sm font-bold ${isPremium ? 'text-green-600' : 'text-blue-600'}`}>추천 경로 (안전/최적)</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {kpis.map((kpi, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`${kpi.name}`}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-red-700">
              {kpi.standardValue} {kpi.unit || ''}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-green-700">
              {kpi.recommendedValue} {kpi.unit || ''}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * @description 시간적/경제적 손실을 종합하여 사용자에게 위기감을 고취시키는 섹션
 */
const LossAndBenefitSummary: React.FC<{ data: AdvancedReportData }> = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    {/* 💰 경제적 손실 강조 */}
    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-red-800 mb-2 flex items-center">
        ⚠️ 놓치고 있는 기회비용 (Hidden Cost) 
        <span className="ml-3 text-sm">(Loss Inception Point)</span>
      </h4>
      <p className="text-gray-600 mb-4">{`표준 경로 선택 시, ${data.hiddenCost.description}으로 인한 예상 손실액이 발생합니다.`}</p>
      <div className="text-4xl font-extrabold text-red-700 flex items-baseline">
        {data.hiddenCost.amount.toLocaleString()} 
        <span className="ml-2 text-2xl">{data.hiddenCost.currency}</span>
      </div>
    </div>

    {/* ⏳ 시간적 효용 강조 */}
    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
        ✅ 절약 가능한 시간적 가치 (Potential Gain)
        <span className="ml-3 text-sm">(Time Saving Proof Point)</span>
      </h4>
      <p className="text-gray-600 mb-4">{`추천 경로를 통해 평균적으로 ${data.potentialSavingsDays}일의 시간을 확보할 수 있습니다.`}</p>
      <div className="text-4xl font-extrabold text-green-700 flex items-baseline">
        {data.potentialSavingsDays} 
        <span className="ml-2 text-2xl">{`일`}</span>
      </div>
    </div>
  </div>
);


/**
 * @description Paywall Funnel의 최종 목적지: 유료 전환을 유도하는 섹션 (가장 중요)
 */
const PaywallTriggerSection: React.FC<{ isPaid: boolean }> = ({ isPaid }) => {
  if (isPaid) {
    return <div className="p-8 bg-indigo-600 text-white rounded-xl shadow-2xl mt-10 text-center">🎉 Premium 기능이 활성화되었습니다!</div>;
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // 핵심 로직: 정보 결핍을 극대화하여 구매를 유도해야 함.
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  return (
    <div className="mt-12 p-8 bg-yellow-50 border-l-4 border-red-600 rounded-xl shadow-lg">
      <h3 className="text-3xl font-bold text-gray-900 mb-4">
        🚨 [경고] 이 보고서는 아직 '부분 공개' 상태입니다.
      </h3>
      <p className="text-xl text-red-700 mb-6 font-medium">
        이처럼 중요한 핵심 지표와 손실액 데이터는 
        ✨ **Advanced Report Premium** ✨ 에만 접근 가능합니다.
      </p>
      
      {/* 카피라이팅 통합 */}
      <div className="bg-white p-4 rounded mb-6 border border-dashed text-center">
        <p className="text-lg italic text-gray-700">{`"${"AdvancedReportData".toFixed(2)} 데이터는 시간적 기회비용을 수치화하여 가장 정확한 최적 대안만을 제시합니다."`}</p>
      </div>

      {/* CTA Button */}
      <button 
        className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-200 shadow-md"
        onClick={() => alert("결제 페이지로 이동합니다.")} // 실제로는 라우터 사용
      >
        💸 Advanced Report Premium 기능 잠금 해제하기 (₩XXX,XXX)
      </button>
    </div>
  );
};


/**
 * @description 메인 컴포넌트: 전체 통합 테스트 환경을 관리하는 컨테이너
 */
const AdvancedReportComparisonUI: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState<AdvancedReportData | null>(null);

  // 1. 데이터 로딩 시뮬레이션 (최초 마운트 시 실행)
  React.useEffect(() => {
    setIsLoading(true);
    fetchAdvancedReportDataMock()
      .then((data) => {
        setReportData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("데이터 로딩 실패:", error);
        // 에러 상태 처리 로직 추가 가능
        setIsLoading(false); 
      });
  }, []);

  // 2. UI 렌더링 제어 (상태 기계 역할)
  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center p-10 text-xl text-gray-500">⚙️ 고급 보고서 데이터를 로딩 중입니다... 잠시만 기다려 주세요.</div>;
    }

    if (!reportData) {
        return <div className="p-10 bg-red-100 border-l-4 border-red-600 text-red-800">❌ 데이터 로딩에 실패했습니다. 시스템을 확인해주세요.</div>;
    }
    
    // Mock 데이터를 기반으로 UI를 구성합니다.
    return (
        <div className="space-y-12">
            {/* 1. 비교 테이블 섹션 */}
            <ComparisonTable kpis={reportData.kpis} isPremium={true} />

            {/* 2. 손실/이득 요약 섹션 (FOMO 유발) */}
            <LossAndBenefitSummary data={reportData} />

            {/* 3. 최종 Paywall Funnel 트리거 */}
            <PaywallTriggerSection isPaid={false} /> {/* 현재는 Mockup 상태로 비활성화 */}

             {/* 추가 섹션: 요약 문구 등 */}
             <div className="p-6 bg-gray-50 rounded-xl shadow-md border">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">✨ 종합 분석 결과</h4>
                <p className="text-gray-700">{reportData.comparisonSummary}</p>
             </div>

        </div>
    );
  };


  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">
        📈 Advanced Report 분석 결과 (통합 테스트 Mockup)
      </h1>

      {renderContent()}
    </div>
  );
};

export default AdvancedReportComparisonUI;