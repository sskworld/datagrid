import React from 'react';

type CheckboxProps = {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, indeterminate, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      ref={(el) => {
        if (el) el.indeterminate = !!indeterminate;
      }}
      onChange={onChange}
    />
  );
};

export default Checkbox;
