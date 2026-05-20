export type CongestionLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';

export type ScenarioKey =
  | '빠른 주차'
  | '저렴한 주차'
  | '곧 비워질 자리'
  | 'NFC 가능'
  | '오래 주차'
  | '혼잡도 낮은 곳';

export interface TimeCongestionPrediction {
  label: '지금' | '15분 후' | '30분 후' | '1시간 후';
  congestionLevel: CongestionLevel;
  congestionScore: number;
  successRate: number;
  predictedAvailableSpaces: number;
}

export interface AiScoreBreakdown {
  distance: number;
  price: number;
  availability: number;
  congestion: number;
  soonAvailable: number;
}

export interface AiInfluenceFactor {
  label: string;
  sentiment: 'positive' | 'neutral' | 'warning';
}

export interface AiRecommendationInsight {
  parkingLotId: string;
  displayName: string;
  displayAddress: string;
  regionName: string;
  congestionLevel: CongestionLevel;
  congestionScore: number;
  recommendationScore: number;
  successRate: number;
  currentAvailableSpaces: number;
  walkingMinutes: number;
  distanceMeters?: number;
  pricePerHour: number;
  maxDailyPrice?: number;
  accessMethod?: string;
  nfcAvailable?: boolean;
  isSoonAvailable?: boolean;
  expectedExitMinutes?: number;
  updatedAt: string;
  timePredictions: TimeCongestionPrediction[];
  scoreBreakdown: AiScoreBreakdown;
  reasons: string[];
  scenarioReasons?: Partial<Record<ScenarioKey, string>>;
  influenceFactors: AiInfluenceFactor[];
}

export interface AiRegionSummary {
  regionName: string;
  overallSuccessRate: number;
  overallCongestionLevel: CongestionLevel;
  bestLotId: string;
  bestLotName: string;
  bestLotSuccessRate: number;
  bestLotWalkingMinutes: number;
  bestLotAvailableSpaces: number;
  updatedAt: string;
  summaryMessage: string;
}

export interface ScenarioRecommendation {
  scenarioKey: ScenarioKey;
  label: string;
  description: string;
  bestParkingLotId: string;
  reasonSummary: string;
  sortedParkingLotIds: string[];
}

export const SCENARIO_HINT: Record<ScenarioKey, string> = {
  '빠른 주차':      '도보 3분으로 주변에서 가장 빠른 주차 가능',
  '저렴한 주차':    '시간당 ₩1,500으로 주변에서 가장 저렴',
  '곧 비워질 자리': '2면 출차 예정 · 8분 이내 입차 가능',
  'NFC 가능':      'NFC 태그로 대기 없이 즉시 입차 가능',
  '오래 주차':     '일 최대 ₩9,000 적용으로 장기 주차 유리',
  '혼잡도 낮은 곳': '현재 12면 여유 · 혼잡도 낮음 지속 예상',
};

export const SCENARIO_FIRST_REASON: Record<ScenarioKey, string> = {
  '빠른 주차':      '목적지까지 도보 3분으로 이동 시간이 가장 짧습니다.',
  '저렴한 주차':    '시간당 ₩1,500으로 주변 평균 대비 40% 저렴합니다.',
  '곧 비워질 자리': '2면이 8분 내 출차 예정으로 빠른 입차가 가능합니다.',
  'NFC 가능':      'NFC 인증으로 대기 없이 즉시 입차할 수 있습니다.',
  '오래 주차':     '일 최대 ₩9,000 적용으로 장기 주차 비용이 가장 유리합니다.',
  '혼잡도 낮은 곳': '현재 이용 가능 공간이 12면으로 혼잡도가 낮게 유지됩니다.',
};

export const SCENARIO_DESCRIPTION: Record<ScenarioKey, string> = {
  '빠른 주차':      '도보 시간과 현재 빈자리를 우선으로 분석했어요.',
  '저렴한 주차':    '시간당 요금과 장시간 이용 비용을 우선으로 분석했어요.',
  '곧 비워질 자리': '곧 비워질 자리와 출차 예정 시간을 우선으로 분석했어요.',
  'NFC 가능':      'NFC 이용 가능 여부와 빠른 입차 조건을 우선으로 분석했어요.',
  '오래 주차':     '일 최대 요금과 혼잡도 안정성을 우선으로 분석했어요.',
  '혼잡도 낮은 곳': '혼잡도 예측과 주차 성공률을 우선으로 분석했어요.',
};

export const SCENARIO_BEST_MESSAGE: Record<ScenarioKey, string> = {
  '빠른 주차':      '빠른 주차 조건에서 가장 짧은 도보 거리예요.',
  '저렴한 주차':    '저렴한 주차 조건에서 가장 낮은 요금이에요.',
  '곧 비워질 자리': '가장 빨리 빈자리가 생기는 주차장이에요.',
  'NFC 가능':      'NFC 입차 가능 주차장 중 가장 추천돼요.',
  '오래 주차':     '장시간 주차 비용이 가장 유리한 주차장이에요.',
  '혼잡도 낮은 곳': '혼잡도가 가장 낮고 성공률이 높은 주차장이에요.',
};
