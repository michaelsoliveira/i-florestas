import React, {
    FC,
    forwardRef,
    DetailedHTMLProps,
    InputHTMLAttributes,
    Ref,
    ChangeEventHandler
} from 'react';
import classNames from 'classnames';
import ReactInputMask from 'react-input-mask';
import {
  RegisterOptions,
} from 'react-hook-form';

export type InputSize = 'small' | 'medium' | 'large';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'radio' | 'checkbox';

export type InputProps = {
  id: string;
  name: string;
  label?: string;
  type?: InputType;
  size?: InputSize;
  rules?: RegisterOptions | any;
  className?: string;
  maskFormat?: string;
  register?: any;
  focusOut?: any;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
>;

const sizeMap: { [key in InputSize]: string } = {
  small: 'p-2 text-sm',
  medium: 'p-3 text-base',
  large: 'p-4 text-base',
};

export const InputMask = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { id, name, type = 'text', label, placeholder, size = 'small', rules, maskFormat = "", focusOut, className, register, ...rest}, 
    ref
  ) {
    return (
        <ReactInputMask 
            mask={maskFormat} 
            id={id}   
            name={name}
            type={type}
            aria-label={label}
            placeholder={placeholder}
            ref={ref}
            {...(register && register(name, rules))}
            className={classNames([
                'relative inline-flex w-full rounded leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:ring-opacity-30',
                sizeMap[size],
                className,
            ])} 
            onBlur={focusOut}
            {...rest}
        />
    )
  }
)
