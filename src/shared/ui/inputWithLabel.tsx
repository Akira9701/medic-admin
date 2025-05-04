import { FC } from 'react';
import { Input } from './input';
import { Label } from './label';

interface InputWithLabelProps {
  label: string;
  id?: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
const InputWithLabel: FC<InputWithLabelProps> = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        disabled={disabled}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputWithLabel;
