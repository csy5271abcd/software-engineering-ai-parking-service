import React from 'react';
import {
  MapPin,
  Navigation,
  Star,
  CalendarDays,
  Clock,
  Sparkles,
  User,
  Search,
  Menu,
  SlidersHorizontal,
  Mic,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
  Share2,
  Heart,
  Car,
  CircleParking,
  CreditCard,
  Bell,
  Settings,
  AlertCircle,
  WalletCards,
  CircleDollarSign,
  MapPinned,
  Camera,
  ImagePlus,
  House,
  Plus,
  Crosshair,
  Shield,
  FileText,
  Cloud,
  Layers,
  Cpu,
  Flag,
  RefreshCw,
  Check,
  MessageSquare,
  Train,
  QrCode,
  KeyRound,
  SmartphoneNfc,
} from 'lucide-react-native';

export type AppIconName =
  | 'mapPin'
  | 'navigation'
  | 'star'
  | 'calendarDays'
  | 'clock'
  | 'sparkles'
  | 'user'
  | 'search'
  | 'menu'
  | 'slidersHorizontal'
  | 'mic'
  | 'chevronLeft'
  | 'chevronRight'
  | 'chevronUp'
  | 'x'
  | 'share2'
  | 'heart'
  | 'car'
  | 'circleParking'
  | 'creditCard'
  | 'bell'
  | 'settings'
  | 'alertCircle'
  | 'walletCards'
  | 'circleDollarSign'
  | 'mapPinned'
  | 'camera'
  | 'imagePlus'
  | 'house'
  | 'plus'
  | 'crosshair'
  | 'shield'
  | 'fileText'
  | 'cloud'
  | 'layers'
  | 'cpu'
  | 'flag'
  | 'refreshCw'
  | 'check'
  | 'messageSquare'
  | 'train'
  | 'qrCode'
  | 'keyRound'
  | 'smartphoneNfc';

interface AppIconProps {
  name: AppIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
}

const ICON_MAP: Record<AppIconName, React.ElementType> = {
  mapPin: MapPin,
  navigation: Navigation,
  star: Star,
  calendarDays: CalendarDays,
  clock: Clock,
  sparkles: Sparkles,
  user: User,
  search: Search,
  menu: Menu,
  slidersHorizontal: SlidersHorizontal,
  mic: Mic,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  x: X,
  share2: Share2,
  heart: Heart,
  car: Car,
  circleParking: CircleParking,
  creditCard: CreditCard,
  bell: Bell,
  settings: Settings,
  alertCircle: AlertCircle,
  walletCards: WalletCards,
  circleDollarSign: CircleDollarSign,
  mapPinned: MapPinned,
  camera: Camera,
  imagePlus: ImagePlus,
  house: House,
  plus: Plus,
  crosshair: Crosshair,
  shield: Shield,
  fileText: FileText,
  cloud: Cloud,
  layers: Layers,
  cpu: Cpu,
  flag: Flag,
  refreshCw: RefreshCw,
  check: Check,
  messageSquare: MessageSquare,
  train: Train,
  qrCode: QrCode,
  keyRound: KeyRound,
  smartphoneNfc: SmartphoneNfc,
};

export function AppIcon({
  name,
  size = 24,
  color = '#222225',
  strokeWidth = 2,
  fill = 'none',
}: AppIconProps): React.JSX.Element {
  const IconComponent = ICON_MAP[name];
  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      fill={fill}
    />
  );
}
