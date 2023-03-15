import { useState } from "react";

type CsvImportType = {
    delimiter: string | ';';
    encoding: string | 'utf-8'
}

const CsvImport = ({ delimiter, encoding }: CsvImportType) => {
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);

    const fileReader = new FileReader();

    const handleOnChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const csvFileToArray = (data: any) => {
        const csvHeader = data.slice(0, data.indexOf("\n")).split(delimiter);
        const csvRows = data.slice(data.indexOf("\n") + 1).split("\n");

        const array = csvRows.map((i: any) => {
        const values = i.split(delimiter);
        const obj = csvHeader.reduce((object: any, header: any, index: any) => {
            object[header] = values[index];
            return object;
        }, {});
        return obj;
        });

        setArray(array);
    };

    const handleOnSubmit = (e: any) => {
        e.preventDefault();

        if (file) {
        fileReader.onload = function (event: any) {
            const data = event.target.result;
            csvFileToArray(data);
        };

        fileReader.readAsText(file, "iso-8859-1");
        }
    };

    const headerKeys = Object.keys(Object.assign({}, ...array));

    return (
        <div style={{ textAlign: "center" }}>
          <h1>REACTJS CSV IMPORT EXAMPLE </h1>
          <form>
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnChange}
            />
    
            <button
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              IMPORT CSV
            </button>
          </form>
    
          <br />
    
          <table>
            <thead>
              <tr key={"header"}>
                {headerKeys.map((key: any) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
    
            <tbody>
              {array.map((item: any) => (
                <tr key={item.id}>
                  {Object.values(item).map((val: any) => (
                    <td key={val}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    
}

export default CsvImport