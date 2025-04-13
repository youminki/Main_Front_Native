// src/api/upload/productApi.ts
import { Axios } from '../Axios';

export interface ProductListItem {
  id: number;
  image: string; // 예: "/uploads/product-images/unique-image-name.jpg" 또는 절대 URL
  brand: string;
  description: string;
  category: string;
  price: number;
  discount: number;
}

export interface ProductPrice {
  originalPrice: number;
  discountRate: number;
  finalPrice: number;
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
  price: ProductPrice;
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
  product_url: string; // 명세에 추가된 필드
}

export interface GetProductInfoResponse {
  product: ProductDetail;
}

export interface UploadProductImageResponse {
  filePath: string;
}

// Vite 환경에서는 import.meta.env를 사용합니다.
// .env 파일에 VITE_API_URL=http://your-api-domain 입력
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

/**
 * 전체 제품(또는 카테고리 필터 적용된) 목록을 불러오는 API 함수
 * @param category 선택된 카테고리 ('all'인 경우 전체 조회)
 * @returns 제품 목록 (ProductListItem[])
 */
export const getProducts = async (
  category?: string
): Promise<ProductListItem[]> => {
  const response = await Axios.get('/admin/product/product/list', {
    params: { category },
  });
  // 응답이 배열 형태라고 가정하고, image가 상대경로이면 API_BASE_URL을 붙여줍니다.
  const products: ProductListItem[] = (response.data || []).map(
    (product: ProductListItem) => ({
      ...product,
      image:
        product.image && !product.image.startsWith('http')
          ? `${API_BASE_URL}${product.image}`
          : product.image,
    })
  );
  return products;
};

/**
 * 제품 상세 정보를 불러오는 API 함수
 * @param id 제품의 id
 * @returns 제품 상세정보 (GetProductInfoResponse)
 */
export const getProductInfo = async (
  id: number
): Promise<GetProductInfoResponse> => {
  const response = await Axios.get(`/admin/product/product/info/${id}`);
  const product: ProductDetail = response.data;

  // mainImage, product_img, size_picture, product_url의 상대경로 보정
  product.mainImage =
    product.mainImage && !product.mainImage.startsWith('http')
      ? `${API_BASE_URL}${product.mainImage}`
      : product.mainImage;
  product.product_img = product.product_img.map((img) =>
    img && !img.startsWith('http') ? `${API_BASE_URL}${img}` : img
  );
  product.size_picture =
    product.size_picture && !product.size_picture.startsWith('http')
      ? `${API_BASE_URL}${product.size_picture}`
      : product.size_picture;
  product.product_url =
    product.product_url && !product.product_url.startsWith('http')
      ? `${API_BASE_URL}${product.product_url}`
      : product.product_url;

  return { product };
};
