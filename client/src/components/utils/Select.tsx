'use client'

import AsyncSelect from 'react-select/async';
import classNames from '@/components/utils/classNames';

interface State {
    readonly inputValue: string;
}

export interface OptionType {
    readonly label: string;
    readonly value: string | Number | undefined;
}

export type SelectType = {
  label?: string;
  callback: (option: any) => void;
  defaultOptions?: OptionType[];
  placeholder?: string;
  selectedValue?: any;
  options?: any;
  isMulti?: boolean;
  initialData?: any;
  styleLabel?: string;
  selectStyle?: string;
}

export const Select = ({ label, callback, options, defaultOptions, placeholder, styleLabel, selectedValue, selectStyle, isMulti = false , initialData, ...props }: SelectType) => {
    return (
      <div>
        <label className={classNames("text-sm", styleLabel)} htmlFor="">{ label }</label>
        <AsyncSelect
            isMulti={isMulti}
            loadOptions={options}
            className={classNames("text-sm origin-top-right absolute right-0", selectStyle)}
            defaultOptions={defaultOptions}
            placeholder={placeholder}
            value={typeof selectedValue !== typeof undefined ? (selectedValue?.length > 1 ? selectedValue?.map((data: any) => {
              return {
                label: data.label,
                value: data.value
              }
            }) : 
            selectedValue
              ) : initialData
            }
            onChange={callback}
            id="category-select"
            instanceId="category-select"
            theme={(theme) => ({
                ...theme,
                // borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary: 'rgb(83 114 53)', //rgb(67 83 5)
                    primary75: 'rgb(109 128 58)',
                    primary50: 'rgb(158 179 132)',
                    primary25: 'rgb(206 222 189)',
                    },
                })
            }
            {...props}
        />
      </div>
    )
}
