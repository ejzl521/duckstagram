import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { jwtUtils } from "../utils/JwtUtils";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../recoil/store";

const PrivateRoute = (props) => {
  // 넘어오는 props를 파악하는게 중요.
  // path, component ....
  const [token, setToken] = useRecoilState(tokenState);
  const { component: RouteComponent, path } = props;
  // redirectUrl은 로그인이 성공후 돌아갈 화면이다.
  if (!jwtUtils.isAuth(token)) {
    alert("로그인이 필요한 페이지입니다");
    return <Navigate to={`/login?redirectUrl=${path}`} />;
  }
  return <RouteComponent />;
};

export default PrivateRoute;
