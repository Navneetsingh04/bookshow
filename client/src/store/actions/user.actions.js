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
  } catch (error) {
    console.log({ error });
    dispatch(userFailure(error.data?.response?.result || error.message));
  }
};

export default fetchUser;
