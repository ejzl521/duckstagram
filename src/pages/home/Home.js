import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/card/Card";
import "../../components/card/card.scss";
import "./home.scss";
import { tokenState } from "../../recoil/store";
import { useRecoilState } from "recoil";
import { jwtUtils } from "../../utils/JwtUtils";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Home = () => {
  const { data, isSuccess } = useQuery(["board_list"], () =>
    axios.get("http://13.125.145.83/api/board")
  );
  const [token, setToken] = useRecoilState(tokenState);
  const [disabled, setDisabled] = useState(true);
  const [loginUserID, setLoginUserID] = useState(null);
  useEffect(() => {
    setDisabled(!jwtUtils.isAuth(token));
    if (jwtUtils.isAuth(token)) {
      setLoginUserID(jwtUtils.getId(token));
    }
  }, []);
  return (
    <div className="home-wrapper">
      {isSuccess
        ? data.data.map((item, idx) => (
            <Card
              key={idx}
              board_id={item.board_id}
              username={item.username}
              date={item.createdDate.substr(0, 10)}
              template={item.template}
              img_url={item.img_url}
              title={item.title}
              body={item.body}
              likes={item.favoritesList.length}
              disabled={disabled}
              favoritesList={item.favoritesList.map((item) => item.user_id)}
              loginUserID={loginUserID}
            />
          ))
        : null}
    </div>
  );
};
export default Home;
