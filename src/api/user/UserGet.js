import { Axios } from '../Axios';

/**
 * @param {number} page - 페이지 번호
 * @param {number} limit - 페이지당 항목 수
 * @returns {Promise<Object>} - 유저 목록 데이터와 전체 항목 수를 반환하는 Promise
 */
export const UserGet = async (page = 1, limit = 10) => {
  try {
    const response = await Axios.get('/user', {
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
