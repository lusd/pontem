import React from 'react';
import './index.scss';

interface IInputProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export function Input({ placeholder, value, onChange }: IInputProps) {
  return (
    <input onChange={onChange} value={value} className="input" placeholder={placeholder} />
  );
}
