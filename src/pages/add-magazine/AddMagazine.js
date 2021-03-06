import { useState, useCallback } from "react";
import { Card } from "../../components/card/Card";
import "./addMagazine.scss";
import ImageUploader from "../../components/imageUploader/ImageUploader";
import TextArea from "../../components/textArea/TextArea";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const AddMagazine = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState(4);
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "/img/default_img.png",
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
    window.alert("πλ±λ‘μ΄ μλ£λμμ΅λλ€π");
    navigate("/");
  }, [canSubmit]);
  return (
    <div className="addMagazine-wrapper">
      {layout === 4 ? (
        <>
          <div className="addMagazine-layout-header">
            λ μ΄μμμ μ ννμΈμ π
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
                title="λ±μ΄"
                body="λ±μ΄λ κ·μ¬μ"
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
                title="λ±μ΄"
                body="λ±μ΄λ κ·μ¬μ"
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
                title="λ±μ΄"
                body="λ±μ΄λ κ·μ¬μ"
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
            λ μ΄μμ λ€μκ³ λ₯΄κΈ° ποΈ
          </div>
          <div className="submitButton">
            {canSubmit() ? (
              <Button
                onClick={handleSubmit}
                className="success-button"
                variant="contained"
              >
                λ±λ‘νκΈ°π
              </Button>
            ) : (
              <Button
                className="disable-button"
                variant="contained"
                size="large"
              >
                μ¬μ§κ³Ό λ΄μ©μ λͺ¨λ μλ ₯νμΈμπ­
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
