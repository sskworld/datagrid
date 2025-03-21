import { IButton } from "@/types/common";

export const Button: React.FC<IButton> = ({ disabled, onClick, label }) => {
  return (
    <button className="download-btn" disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};