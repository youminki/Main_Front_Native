import { Axios } from '../Axios';

/**
 * 관리자 목록을 가져오는 API 함수
 * @param {number} page - 페이지 번호
 * @param {number} limit - 페이지당 항목 수
 * @returns {Promise<Object>} - 관리자 목록 데이터와 전체 항목 수를 반환하는 Promise
 */
export const AdminGet = async (page = 1, limit = 10) => {
  try {
    const response = await Axios.get('/admin', {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin list:', error);
    throw error;
  }
};
