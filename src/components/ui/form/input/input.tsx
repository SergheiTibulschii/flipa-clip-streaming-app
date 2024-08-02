import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import './styles/index.scss';

type InputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'onClick' | 'onInput' | 'placeholder' | 'className' | 'name' | 'value'
>;

export const Input = ({ className, ...inputProps }: InputProps) => {
  const cns = clsx('input', className);
  return <input {...inputProps} className={cns} />;
};
