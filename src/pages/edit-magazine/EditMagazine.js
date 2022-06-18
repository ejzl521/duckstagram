import { useState, useCallback, useEffect } from "react";
import { Card } from "../../components/card/Card";
import "../add-magazine/addMagazine.scss";
import ImageUploader from "../../components/imageUploader/ImageUploader";
import TextArea from "../../components/textArea/TextArea";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useBoardQuery } from "../../react-query/useBoardQuery";
import api from "../../utils/api";

const EditMagazine = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [layout, setLayout] = useState(4);
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "/img/default_img.png",
  });
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    // 수정하기 전 데이터를 보여줌
    const getPreviousBoard = async () => {
      const { data } = await api.get(`http://13.125.145.83/api/board/${id}`);
      setTitle(data.title);
      setText(data.body);
      setImage({ ...image, preview_URL: data.img_url });
      setLayout(data.template);
    };
    getPreviousBoard();
  }, []);

  const canSubmit = useCallback(() => {
    return text !== "" && title !== "" ? true : false;
  }, [image, title, text]);

  const handleSubmit = useCallback(async () => {
    // 백엔드에 사진 선택 안하면 DB의 사진은 변경하지말고 제목과 내용만 변경하기
    const formData = new FormData();
    formData.append("files", image.image_file);
    formData.append(
      "board",
      JSON.stringify({
        title: title,
        body: text,
        template: layout,
      })
    );
    try {
      await api.put(`http://13.125.145.83/api/board/${id}`, formData);
      window.alert("😎수정이 완료되었습니다😎");
      navigate("/my-magazine");
    } catch (e) {
      window.alert(" 😢수정에 실패했습니다 😢");
    }
  }, [canSubmit]);
  return (
    <div className="addMagazine-wrapper">
      {layout === 4 ? (
        <>
          <div className="addMagazine-layout-header">
            변경할 레이아웃을 선택하세요 😎
          </div>
          <div className="addMagazine-layout-contents">
            <div
              onClick={() => {
                setLayout(1);
              }}
            >
              <Card
                template={1}
                username="duckgugong"
                date="2022-06-14"
                title="뚱이"
                body="뚱이는 귀여워"
                img_url="/img/duckgugong.png"
                likes={49}
                disabled={true}
              />
            </div>
            <div
              onClick={() => {
                setLayout(2);
              }}
            >
              <Card
                template={2}
                username="duckgugong"
                date="2022-06-14"
                title="뚱이"
                body="뚱이는 귀여워"
                img_url="/img/duckgugong.png"
                likes={49}
                disabled={true}
              />
            </div>
            <div
              onClick={() => {
                setLayout(3);
              }}
            >
              <Card
                template={3}
                username="duckgugong"
                date="2022-06-14"
                title="뚱이"
                body="뚱이는 귀여워"
                img_url="/img/duckgugong.png"
                likes={49}
                disabled={true}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="addMagazine-header"
            onClick={() => {
              setLayout(4);
            }}
          >
            레이아웃 다시고르기 🖊️
          </div>
          <div className="submitButton">
            {canSubmit() ? (
              <Button
                onClick={handleSubmit}
                className="success-button"
                variant="contained"
              >
                수정하기😃
              </Button>
            ) : (
              <Button
                className="disable-button"
                variant="contained"
                size="large"
              >
                사진과 내용을 모두 입력하세요😭
              </Button>
            )}
          </div>
          <div className="addMagazine-body">
            <ImageUploader
              setImage={setImage}
              preview_URL={image.preview_URL}
            />
            <TextArea
              setTitle={setTitle}
              setText={setText}
              title={title}
              text={text}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EditMagazine;
