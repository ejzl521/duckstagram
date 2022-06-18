import "./textArea.scss";

const TextArea = ({ setTitle, setText, title, text }) => {
  return (
    <div className="textArea-wrapper">
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="title"
        placeholder="제목을 입력하세요"
        value={title}
      />
      <textarea
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="text"
        placeholder="내용을 입력하세요"
        value={text}
      />
    </div>
  );
};
export default TextArea;
