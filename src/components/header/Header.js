import "./header.scss";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenState } from "../../recoil/localStorage/store";
import { useCallback, useEffect, useState } from "react";
import { jwtUtils } from "../../utils/JwtUtils";

const Header = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [isAuth, setIsAuth] = useState(false);
  // token을 추적해서 인증된 사용자인지 검증 후 boolean을 이용해서 메뉴를 다르게 보임
  useEffect(() => {
    setIsAuth(jwtUtils.isAuth(token));
  }, [token]);
  // 로그아웃 - 토큰 비우기
  const logout = () => {
    setToken("");
    window.alert("😎로그아웃 되었습니다😎");
    window.href.location = "/";
  };
  return (
    <div className="header-wrapper">
      <div className="header-title">
        <Link to="/">
          <span>Duckstagram</span>
        </Link>
      </div>
      <div className="header-menu">
        {isAuth ? (
          <>
            <Link to="my-magazine">내 게시물</Link>
            <Link onClick={logout} to="#">
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/sign-up">회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
