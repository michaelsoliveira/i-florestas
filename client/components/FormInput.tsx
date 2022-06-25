import React, { useRef } from 'react';
import classNames from 'classnames';
import get from 'lodash.get';

import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Input, InputProps } from './atoms/input';
import { FormErrorMessage } from './atoms/form-error-message';

export type FormInputProps<TFormValues> = {
    label?: Path<TFormValues>;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  layout?: 'default' | 'floatLabel',
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, 'name'>;

export const FormInput = <TFormValues extends Record<string, unknown>>({
    label,
  name,
  register,
  rules,
  errors,
  className,
  layout,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
      <div className={classNames('', className)} aria-live="polite">
            <label
                    htmlFor={label}
                    className='text-primary placeholder-gray-gray4 pt-1.5'
                >
                    {label} {rules?.required && <span className='text-red'>*</span>}
            </label>
          <Input
              label={label}
              name={name}
              aria-invalid={hasError}
              className={classNames({
              'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600':
                  hasError,
              })}
              {...props}
              {...(register && register(name, rules))}
          />
        <ErrorMessage
            errors={errors}
            
            name={name as any}
            render={({ message }) => (
            <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
            )}
        />
    </div>
  );
};
                