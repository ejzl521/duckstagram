import React, { useState } from "react";
import "../home/home.scss";
import "./myMagazine.scss";
import { Card } from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import { useUserBoardQuery } from "../../react-query/useUserBoardQuery";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

const MyMagazine = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [deleteBoardID, setDeleteBoardID] = useState(0);

  const { getUserBoard, getUserBoardIsSuccess, deleteUserBoardMutation } =
    useUserBoardQuery();

  return (
    <div className="home-wrapper">
      <Dialog open={show}>
        <DialogContent style={{ position: "relative" }}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => setShow(false)}
          >
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
          <div className="modal">
            <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
            <div className="modal-button">
              <Button
                onClick={() => {
                  deleteUserBoardMutation(deleteBoardID);
                  setShow(false);
                }}
                variant="contained"
                color="error"
              >
                예
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShow(false)}
              >
                아니오
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {getUserBoardIsSuccess && getUserBoard.data
        ? getUserBoard.data.map((item, idx) => (
            <div className="my-magazine" key={idx}>
              <div className="my-magazine-focus">
                <Card
                  board_id={item.board_id}
                  username={item.username}
                  date={item.createdDate.substr(0, 10)}
                  template={item.template}
                  img_url={item.img_url}
                  title={item.title}
                  body={item.body}
                  likes={item.favoritesList.length}
                  disabled={true}
                  favoritesList={item.favoritesList.map((item) => item.user_id)}
                  loginUserID={null}
                />
              </div>
              <div className="my-magazine-fix-delete">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate(`/edit-magazine/${item.board_id}`);
                  }}
                >
                  수정⚙️
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setShow(true);
                    setDeleteBoardID(item.board_id);
                  }}
                >
                  삭제🗑️
                </Button>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
export default MyMagazine;
