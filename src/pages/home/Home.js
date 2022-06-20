import React from "react";
import { useEffect, useState } from "react";
import { Card } from "../../components/card/Card";
import "../../components/card/card.scss";
import "./home.scss";
import { tokenState } from "../../recoil/localStorage/store";
import { useRecoilState } from "recoil";
import { jwtUtils } from "../../utils/JwtUtils";
import { useBoardQuery } from "../../react-query/useBoardQuery";
import { useInView } from "react-intersection-observer";

const Home = () => {
  // recoilState로 토큰을 가져옴
  const [token, setToken] = useRecoilState(tokenState);
  // Card 컴포넌트에 넘겨줄 disabled: 하트를 누를 수 있는지
  const [disabled, setDisabled] = useState(true);
  const [loginUserID, setLoginUserID] = useState(null);
  // 무한스크롤 사용: infiniteQuery, intersection-observer
  // getBoard: data, getNextPage: fetchNextPage, getBoardIsSuccess: isSuccess
  const { getBoard, getNextPage, getBoardIsSuccess, getNextPageIsPossible } =
    useBoardQuery();
  const [ref, isView] = useInView();
  useEffect(() => {
    // 맨 마지막 요소를 보고있고 맨 마지막 페이지에서 리턴한 isLast가 false가 아니면
    if (isView && getNextPageIsPossible) {
      getNextPage();
    }
  }, [isView, getBoard]);

  useEffect(() => {
    // user가 로그인한 상태면 disabled: false
    setDisabled(!jwtUtils.isAuth(token));
    if (jwtUtils.isAuth(token)) {
      // user가 로그인한 상태면 토큰을 해독해서 userID를 넣어줌
      setLoginUserID(jwtUtils.getId(token));
    }
  }, []);
  return (
    <div className="home-wrapper">
      {
        // 데이터를 불러오는데 성공하고 데이터가 0개가 아닐 때 렌더링
        getBoardIsSuccess && getBoard.pages
          ? getBoard.pages.map((page_data, page_num) => {
              const board_page = page_data.board_page;
              return board_page.map((item, idx) => {
                if (
                  // 마지막 요소에 ref 달아주기
                  page_num === getBoard.pages.length - 1 &&
                  idx === board_page.length - 1
                ) {
                  return (
                    // 마지막 요소에 ref 넣기 위해 div로 감싸기
                    <div ref={ref} key={item.board_id}>
                      <Card
                        board_id={item.board_id}
                        username={item.username}
                        date={item.createdDate.substr(0, 10)}
                        template={item.template}
                        img_url={item.img_url}
                        title={item.title}
                        body={item.body}
                        likes={item.favoritesList.length}
                        disabled={disabled}
                        favoritesList={item.favoritesList.map(
                          (item) => item.user_id
                        )}
                        loginUserID={loginUserID}
                      />
                    </div>
                  );
                } else {
                  return (
                    <Card
                      key={item.board_id}
                      board_id={item.board_id}
                      username={item.username}
                      date={item.createdDate.substr(0, 10)}
                      template={item.template}
                      img_url={item.img_url}
                      title={item.title}
                      body={item.body}
                      likes={item.favoritesList.length}
                      disabled={disabled}
                      favoritesList={item.favoritesList.map(
                        (item) => item.user_id
                      )}
                      loginUserID={loginUserID}
                    />
                  );
                }
              });
            })
          : null
      }
    </div>
  );
};
export default Home;
