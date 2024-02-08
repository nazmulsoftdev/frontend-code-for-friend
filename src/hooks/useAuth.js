import { useSelector } from "react-redux";

function useAuth() {
  const { accessToken, refreshToken, user } = useSelector(
    (state) => state.auth
  );

  if (accessToken && refreshToken && user) {
    return true;
  } else {
    return false;
  }
}

export default useAuth;
