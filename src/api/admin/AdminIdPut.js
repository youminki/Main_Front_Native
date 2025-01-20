import { Axios } from '../Axios';

/**
 * 특정 관리자를 업데이트하는 API 함수
 * @param {string} id - 업데이트할 관리자 ID
 * @param {Object} updateData - 업데이트할 데이터 (이메일, 권한 등급, 상태)
 * @returns {Promise<Object>} - 업데이트된 관리자 정보를 반환하는 Promise
 */
export const updateAdmin = async (id, updateData) => {
  try {
    const response = await Axios.put(`/admin/${id}`, updateData);
    return response.data; // 업데이트된 관리자 데이터 반환
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Admin not found with id ${id}`);
      throw new Error('관리자를 찾을 수 없습니다.');
    } else {
      console.error(`Error updating admin with id ${id}:`, error);
      throw error;
    }
  }
};
