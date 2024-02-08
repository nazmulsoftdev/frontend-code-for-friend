import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import cookie from "js-cookie";
import { UserLoggedIn } from "../featured/auth/authSlice";

function useCheckAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = cookie.get("token1");
    const refreshToken = cookie.get("token2");
    const user = JSON.parse(localStorage.getItem("user"));

    if (accessToken && refreshToken && user) {
      dispatch(
        UserLoggedIn({
          accessToken,
          refreshToken,
          user,
        })
      );
    }
    setIsLoggedIn(true);
  }, [isLoggedIn, dispatch]);

  return isLoggedIn;
}

export default useCheckAuth;
