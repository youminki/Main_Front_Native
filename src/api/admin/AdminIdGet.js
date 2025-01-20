// src/api/admin/AdminIdGet.js
import { Axios } from '../Axios';

/**
 * 특정 관리자의 정보를 가져오는 API 함수
 * @param {string} id - 조회할 관리자 ID
 * @returns {Promise<Object>} - 관리자 정보를 반환하는 Promise
 */
export const getAdminById = async (id) => {
  try {
    const response = await Axios.get(`/admin/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Admin not found with id ${id}`);
      return {
        statusCode: 404,
        message: 'Admin not found',
        error: 'Not Found',
      };
    } else {
      console.error(`Error fetching admin with id ${id}:`, error);
      throw error;
    }
  }
};
