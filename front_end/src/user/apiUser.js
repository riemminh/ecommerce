import axios from "axios";
// get user by id
export const getUserById = userId => {
  return axios.get(`/api/users/get_user/${userId}`);
};

// update user
export const updateUserById = (userId, newData) => {
  return axios.put(`/api/users/update_user/${userId}`, newData);
};

// get history order
export const getHistoryUser = userId => {
  return axios.get(`/api/users/get_order/${userId}`);
};
