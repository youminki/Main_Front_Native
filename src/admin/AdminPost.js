import { Axios } from '../Axios';

/**
 * 어드민을 생성하는 API 함수
 * @param {Object} adminData - 생성할 어드민 정보
 * @returns {Promise<Object>} - 생성된 어드민 정보를 반환하는 Promise
 */
export const createAdmin = async (adminData) => {
  try {
    const response = await Axios.post('/admin', adminData);
    return response.data; // 생성된 어드민 데이터 반환
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
};
