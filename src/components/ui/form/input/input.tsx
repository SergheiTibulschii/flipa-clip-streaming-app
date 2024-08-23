import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import './styles/index.scss';

type InputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'onClick'
  | 'onInput'
  | 'placeholder'
  | 'className'
  | 'name'
  | 'value'
  | 'disabled'
  | 'required'
  | 'type'
>;

export const Input = ({ className, ...inputProps }: InputProps) => {
  const cns = clsx('input', className, 'disabled:opacity-50');
  return <input {...inputProps} className={cns} />;
};
