import { axiosInstance } from ".";

export const RegisterUser = async (user) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_BASE_URL}/api/users/register`,
      user
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const LoginUser = async (user) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_BASE_URL}/api/users/login`,
      user
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_BASE_URL}/api/users/get-current-user`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_BASE_URL}/api/users/get-all-users`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const UpdateProfilePicture = async (image) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_BASE_URL}/api/users/update-profile-picture`,
      {
        image,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
