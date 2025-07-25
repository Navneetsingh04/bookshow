import { getMe } from "../../api/user";

import {
  userRequest,
  userSuccess,
  userFailure,
  userLogout,
} from "../slices/userSlice";

const fetchUser = () => async (dispatch) => {
  try {
    dispatch(userRequest());
    const user = await getMe();
    if (user.status === 200) {
      dispatch(userSuccess(user.data.result));
    }
    else{
       dispatch(userLogout());
    }
  } catch (error) {
    console.log({ error });
      if (error?.response?.status === 401) {
      dispatch(userLogout());
    } else {
      dispatch(userFailure(error?.response?.data?.message || error.message));
    }
  }
};

export default fetchUser;
