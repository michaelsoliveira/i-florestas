'use client'

import React, { useRef, Ref, createRef, forwardRef } from 'react';
import classNames from 'classnames';
const lodash: any = require('lodash');

import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
  FieldValues,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Input, InputProps } from '@/components/atoms/input';
import { FormErrorMessage } from '@/components/atoms/form-error-message';
import { InputMask } from '../atoms/input-mask';

export type FormInputProps<TFormValues extends FieldValues> = {
    label?: string;
    name: Path<TFormValues>;
    rules?: RegisterOptions | any;
    innerRef?: any;
    register?: UseFormRegister<TFormValues>;
    layout?: 'default' | 'floatLabel',
    errors?: Partial<DeepMap<TFormValues, FieldError>>;
    maskFormat?: string;
    onFocus?: any;
} & Omit<InputProps, 'name'>;

export const FormInputMask = 
  <TFormValues extends Record<string, unknown>>({
    label,
    name,
    register,
    rules,
    errors,
    onFocus,
    innerRef,
    className,
    layout = 'default',
    maskFormat,    
    ...props
  }: FormInputProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = lodash.get(errors, name) as any;
  const hasError = !!(errors && errorMessages);
  const inputRef = createRef<HTMLInputElement>();

  return (
      <div className={classNames('flex', layout === 'floatLabel' ? 'flex-row items-center' : 'flex-col', className)} aria-live="polite">
          <label
              htmlFor={label}
              className='text-primary placeholder-gray-gray4 pt-1.5 text-sm py-1 w-[10rem]'
          >
                {label} {rules?.required && <span className='text-red'>*</span>}
          </label>
          <InputMask
              label={label}
              name={name}
              aria-invalid={hasError}
              rules={rules}
              maskFormat={maskFormat}
              register={register}
              ref={innerRef}
              onFocus={onFocus}
              className={classNames([{
              'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600':
                  hasError
              }])}
              {...props}
          />
          {errors && (
            <ErrorMessage
              errors={errors}
              
              name={name as any}
              render={({ message }) => (
                <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
              )}
            />
          )}
          
    </div>
  );
}
                