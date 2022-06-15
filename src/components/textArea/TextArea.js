import "./textArea.scss";

const TextArea = ({ setTitle, setText }) => {
  return (
    <div className="textArea-wrapper">
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="title"
        placeholder="제목을 입력하세요"
      />
      <textarea
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="text"
        placeholder="내용을 입력하세요"
      />
    </div>
  );
};
export default TextArea;
