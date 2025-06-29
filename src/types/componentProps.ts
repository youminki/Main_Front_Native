// 컴포넌트 Props 타입 정의

// Modal 관련 Props
export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface MypageModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// ImageSlider Props
export interface ImageSliderProps {
  images: string[];
  currentIndex: number;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

// ProductInfo Props
export interface ProductInfoProps {
  productInfo: {
    brand: string;
    product_num: string;
    name: string;
    retailPrice: number;
    discountPercent: number;
    discountPrice: number;
  };
}

// ProductOptions Props
export interface ProductOptionsProps {
  sizes: { size: string; measurements: Record<string, any> }[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

// ServiceSelection Props
export interface ServiceSelectionProps {
  selectedService: '' | 'rental' | 'purchase';
  onServiceChange: (service: string) => void;
}

// RentalOptions Props
export interface RentalOptionsProps {
  servicePeriod: string;
  onPeriodChange: (period: string) => void;
}

// SizeInfo Props
export interface SizeInfoProps {
  sizePicture: string;
  sizeLabelGuide?: Record<string, string>;
}

// MaterialInfo Props
export interface MaterialInfoProps {
  fabricComposition: Record<'겉감' | '안감' | '배색' | '부속', string>;
}

// ProductDetails Props
export interface ProductDetailsProps {
  elasticity: string;
  transparency: string;
  thickness: string;
  lining: string;
  fit: string;
  color: string;
}

// BottomBar Props
export interface BottomBarProps {
  onCartClick: () => Promise<void>;
  onOrderClick: () => void;
  selectedService: '' | 'rental' | 'purchase';
  selectedSize: string;
  selectedColor: string;
  servicePeriod: string;
}

// Calendar Props
export interface CalendarProps {
  year: number;
  month: number;
  onYearChange: (value: any) => void;
  onMonthChange: (value: any) => void;
}

// Button Props
export interface ButtonProps {
  onPress: () => void;
  children?: React.ReactNode;
}
