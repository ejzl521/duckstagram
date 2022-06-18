import "./card.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLikeBoardQuery } from "../../react-query/useLikeBoardQuery";
import { useNavigate } from "react-router-dom";

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
  const { likeBoardMutation, dislikeBoardMutation } = useLikeBoardQuery();
  const navigate = useNavigate();
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
                navigate("/login");
              }}
            />
          ) : favoritesList.includes(loginUserID) ? (
            <FavoriteIcon
              sx={{ color: "hotpink" }}
              fontSize="large"
              onClick={() => {
                dislikeBoardMutation(board_id);
              }}
            />
          ) : (
            <FavoriteIcon
              sx={{ color: "gray" }}
              fontSize="large"
              onClick={() => {
                likeBoardMutation(board_id);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
