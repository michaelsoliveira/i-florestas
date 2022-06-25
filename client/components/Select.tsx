import React, { Component, useCallback, useContext, useEffect, useState } from 'react';

import AsyncSelect from 'react-select/async';

interface State {
    readonly inputValue: string;
}

export interface OptionType {
    readonly label: string;
    readonly value: string;
}

export type SelectType = {
  label?: string;
  options: any;
  callback: (option: any) => void;
  defaultOptions?: OptionType[];
  initialData?: OptionType;
  selectedValue?: OptionType;
}

export const Select = ({ label, callback, options, defaultOptions, initialData, selectedValue }: SelectType) => {

    return (
      <div>
        <label htmlFor="">{ label }</label>
        <AsyncSelect
            cacheOptions
            loadOptions={options}
            defaultOptions={defaultOptions}
            value={typeof selectedValue?.value !== typeof undefined ? selectedValue : initialData}
            onChange={callback}
            id="category-select"
            instanceId="category-select"
            theme={(theme) => ({
                ...theme,
                // borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary: 'rgb(21 128 61)',
                    primary75: 'rgb(22 163 74)',
                    primary50: 'rgb(21 128 61)',
                    primary25: 'rgb(229 231 235)',
                    },
                })
            }
        />
      </div>
    )
}
