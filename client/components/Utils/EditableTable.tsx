import classNames from "classnames";
import React, { useState } from "react";
import { useTable } from "react-table";

const EditableTable = ({ columns, data, setData, handleButtonClick }: any) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      initialState: { hiddenColumns: ['id'] }
    });

  const handleInputChange = (event: any, row: any, columnId: any) => {
    const newData = data.map((rowData: any) => {
      if (rowData.id === row.original.id) {
        return { ...rowData, [columnId]: event.target.value };
      }
      return rowData;
    });
    setData(newData);
  }

  const isEven = (idx: number) => idx % 2 === 0

  return (
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-64 overflow-y-auto">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-300 w-full">
            {rows.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className={classNames('hover:bg-indigo-200 hover:bg-opacity-10', isEven(i) ? 'bg-gray-200 bg-opacity-10' : '')}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {cell.column?.editEnable ? (
                          row.original?.isEditing ? (
                            <input
                            type="text"
                            defaultValue={cell.value}
                            onChange={(e) =>
                              handleInputChange(e, row, cell.column.id)
                            }
                            className={classNames([
                              'relative inline-flex px-2 py-1 w-full rounded leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:ring-opacity-30',
                            ])}
                          />
                          ) : (
                            cell.render("Cell")
                          )
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditableTable