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
  retailPrice: number; // 기존 정가
  discountPrice: number; // 세일가
  discountPercent: number; // 할인율 (정가 대비)
  product_img: string[];
  sizes: ProductSize[];
  size_picture: string;
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
  return (response.data || []).map((p: ProductListItem) => ({
    ...p,
    image:
      p.image && !p.image.startsWith('http')
        ? `${API_BASE_URL}${p.image}`
        : p.image,
  }));
};

export const getProductInfo = async (
  id: number
): Promise<GetProductInfoResponse> => {
  const res = await Axios.get(`/admin/product/product/info/${id}`);
  const raw = res.data as any;

  // 상대 경로 보정
  if (raw.mainImage && !raw.mainImage.startsWith('http')) {
    raw.mainImage = `${API_BASE_URL}${raw.mainImage}`;
  }
  raw.product_img = raw.product_img.map((img: string) =>
    img && !img.startsWith('http') ? `${API_BASE_URL}${img}` : img
  );
  if (raw.size_picture && !raw.size_picture.startsWith('http')) {
    raw.size_picture = `${API_BASE_URL}${raw.size_picture}`;
  }
  if (raw.product_url && !raw.product_url.startsWith('http')) {
    raw.product_url = `${API_BASE_URL}${raw.product_url}`;
  }

  // 할인 정보 매핑
  const retailPrice: number = raw.retailPrice;
  const discountPrice: number = raw.sale_price ?? retailPrice;
  const discountPercent: number =
    retailPrice > 0
      ? Math.round(((retailPrice - discountPrice) / retailPrice) * 100)
      : 0;

  const product: ProductDetail = {
    ...raw,
    retailPrice,
    discountPrice,
    discountPercent,
  };

  return { product };
};
