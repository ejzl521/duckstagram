import { useState, useCallback } from "react";
import { Card } from "../../components/card/Card";
import "./addMagazine.scss";
import ImageUploader from "../../components/imageUploader/ImageUploader";
import TextArea from "../../components/textArea/TextArea";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const AddMagazine = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState(0);
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "img/default_img.png",
  });
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const canSubmit = useCallback(() => {
    return image.image_file !== "" && text !== "" && title !== ""
      ? true
      : false;
  }, [image, title, text]);

  const handleSubmit = useCallback(async () => {
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

    await api.post("http://13.125.145.83/api/board", formData);
    window.alert("😎등록이 완료되었습니다😎");
    navigate("/");
  }, [canSubmit]);
  return (
    <div className="addMagazine-wrapper">
      {layout === 0 ? (
        <>
          <div className="addMagazine-layout-header">
            레이아웃을 선택하세요 😎
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
                img_url="img/duckgugong.png"
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
                img_url="img/duckgugong.png"
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
                img_url="img/duckgugong.png"
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
              window.location.href = "/addMagazine";
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
                등록하기😃
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
            <TextArea setTitle={setTitle} setText={setText} />
          </div>
        </>
      )}
    </div>
  );
};

export default AddMagazine;
