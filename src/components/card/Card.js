import "./card.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import api from "../../utils/api";
import { useMutation, useQueryClient } from "react-query";

export const Card = ({
  board_id,
  username,
  date,
  template,
  img_url,
  title,
  body,
  likes,
  disabled,
  favoritesList,
  loginUserID,
}) => {
  const queryClient = useQueryClient();
  const { mutate: likeBoardMutation } = useMutation(
    () => api.post(`http://13.125.145.83/api/board/${board_id}/like`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("board_list");
      },
    }
  );

  const { mutate: dislikeBoardMutation } = useMutation(
    () => api.delete(`http://13.125.145.83/api/board/${board_id}/like`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("board_list");
      },
    }
  );

  return (
    <div className="card-wrapper">
      <div className="card-header">
        <div className="username">{username}</div>
        <div className="date">{date}</div>
      </div>
      <hr />
      <div className={`card-body-${template}`}>
        <div className="card-body-img">
          <img src={img_url} />
        </div>
        <div className="card-body-contents">
          <div className="card-body-title">{title}</div>
          <div className="card-body-text">{body}</div>
        </div>
      </div>
      <hr />
      <div className="card-footer">
        <div className="card-footer-like">좋아요 +{likes}</div>
        <div className="card-footer-heart">
          {disabled ? (
            <FavoriteIcon
              sx={{ color: "red" }}
              fontSize="large"
              onClick={() => {
                window.alert("😎로그인이 필요합니다😎");
              }}
            />
          ) : favoritesList.includes(loginUserID) ? (
            <FavoriteIcon
              sx={{ color: "hotpink" }}
              fontSize="large"
              onClick={dislikeBoardMutation}
            />
          ) : (
            <FavoriteIcon
              sx={{ color: "gray" }}
              fontSize="large"
              onClick={likeBoardMutation}
            />
          )}
        </div>
      </div>
    </div>
  );
};
