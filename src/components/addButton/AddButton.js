import "./addButton.scss";

export const AddButton = () => {
  return (
    <div
      className="addButton"
      onClick={() => {
        window.location.href = "/add-magazine";
      }}
    >
      +
    </div>
  );
};
export default AddButton;
