import { Axios } from '../Axios';

/**
 * 어드민을 삭제하는 API 함수
 * @param {string} id - 삭제할 어드민 ID
 * @returns {Promise<Object>} - 삭제 결과를 반환하는 Promise
 */
export const deleteAdmin = async (id) => {
  try {
    const response = await Axios.delete(`/admin/${id}`);
    return response.data; // 삭제 결과 메시지 반환
  } catch (error) {
    console.error('Error deleting admin:', error);
    throw error;
  }
};
