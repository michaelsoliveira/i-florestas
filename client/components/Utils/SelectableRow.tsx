import React, { useState } from 'react';

function SelectItem({ data, onSelect }: any) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onSelect(data, !isSelected);
  };

  return (
    <tr onClick={handleClick} style={{ background: isSelected ? 'lightblue' : 'white' }}>
      {Object.values(data).map((value, index) => (
        <td key={index}>{value}</td>
      ))}
    </tr>
  );
}

function SelectableRow() {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelect = (rowData: any, isSelected: any) => {
    if (isSelected) {
      setSelectedRows((prevSelectedRows): any => [...prevSelectedRows, rowData]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((row) => row !== rowData)
      );
    }
  };

  const rowData = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Bob Johnson', age: 35 },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, index) => (
            <SelectItem
              key={index}
              data={row}
              onSelect={handleRowSelect}
            />
          ))}
        </tbody>
      </table>

      <div>
        <h3>Selected Rows:</h3>
        <ul>
          {selectedRows.map((row: any, index) => (
            <li key={index}>{row.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SelectableRow;