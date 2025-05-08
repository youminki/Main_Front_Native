// src/api/upload/productApi.ts
import { Axios } from '../Axios';

export interface ProductListItem {
  id: number;
  image: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  isLiked: boolean;
}

export interface ProductSize {
  size: string;
  measurements: Record<string, any>;
}

export interface ProductDetail {
  id: number;
  name: string;
  product_num: string;
  brand: string;
  mainImage: string;
  retailPrice: number;
  discountPrice: number;
  discountPercent: number;
  product_img: string[];
  sizes: ProductSize[];
  size_picture: string;
  /** 서버에서 내려오는 수정된 사이즈 라벨 가이드 */
  size_label_guide?: Record<string, string>;
  category: string;
  season: string;
  manufacturer: string;
  description: string;
  fabricComposition: string[];
  elasticity: string;
  transparency: string;
  thickness: string;
  lining: string;
  fit: string;
  color: string;
  product_url: string;
}

export interface GetProductInfoResponse {
  product: ProductDetail;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

export const getProducts = async (
  category?: string
): Promise<ProductListItem[]> => {
  const response = await Axios.get('/admin/product/product/list', {
    params: { category },
  });
  return (response.data || []).map((p: any) => ({
    id: p.id,
    image:
      p.image && !p.image.startsWith('http')
        ? `${API_BASE_URL}${p.image}`
        : p.image,
    brand: p.brand,
    description: p.description,
    category: p.category,
    price: p.price,
    discount: p.discount,
    isLiked: Boolean(p.isLiked),
  }));
};

export const getProductInfo = async (
  id: number
): Promise<GetProductInfoResponse> => {
  const res = await Axios.get(`/admin/product/product/info/${id}`);
  const raw = res.data as any;

  // --- URL 보정 ---
  if (raw.mainImage && !raw.mainImage.startsWith('http')) {
    raw.mainImage = `${API_BASE_URL}${raw.mainImage}`;
  }
  raw.product_img = (raw.product_img || []).map((img: string) =>
    img && !img.startsWith('http') ? `${API_BASE_URL}${img}` : img
  );
  if (raw.size_picture && !raw.size_picture.startsWith('http')) {
    raw.size_picture = `${API_BASE_URL}${raw.size_picture}`;
  }
  if (raw.product_url && !raw.product_url.startsWith('http')) {
    raw.product_url = `${API_BASE_URL}${raw.product_url}`;
  }

  // --- 가격 계산 ---
  const retailPrice: number = raw.retailPrice;
  const discountPrice: number = raw.sale_price ?? retailPrice;
  const discountPercent: number =
    retailPrice > 0
      ? Math.round(((retailPrice - discountPrice) / retailPrice) * 100)
      : 0;

  // --- size_label_guide 추출 (서버에서 내려주는 경우) ---
  const size_label_guide: Record<string, string> | undefined =
    raw.size_label_guide;

  // --- 최종 ProductDetail 객체 구성 ---
  const product: ProductDetail = {
    id: raw.id,
    name: raw.name,
    product_num: raw.product_num,
    brand: raw.brand,
    mainImage: raw.mainImage,
    retailPrice,
    discountPrice,
    discountPercent,
    product_img: raw.product_img,
    sizes: raw.sizes,
    size_picture: raw.size_picture,
    size_label_guide,
    category: raw.category,
    season: raw.season,
    manufacturer: raw.manufacturer,
    description: raw.description,
    fabricComposition: raw.fabricComposition,
    elasticity: raw.elasticity,
    transparency: raw.transparency,
    thickness: raw.thickness,
    lining: raw.lining,
    fit: raw.fit,
    color: raw.color,
    product_url: raw.product_url,
  };

  return { product };
};
export default {
  getProducts,
  getProductInfo,
};
