import { ICheckbox } from "@/types/common";

export const Checkbox: React.FC<ICheckbox> = ({ checked, onChange }) => {
  return <input type="checkbox" className="custom-checkbox" checked={checked} onChange={onChange} />;
};