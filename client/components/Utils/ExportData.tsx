import * as fs from 'fs';
import Papa from 'papaparse';

interface CSVRow {
  [key: string]: string | number | boolean;
}

function convertToCSV(data: CSVRow[], config?: any): string {
  if (data.length === 0) {
    throw new Error('Data array is empty');
  }

  // Extract column names from the first row (object keys)
  const columns = Object.keys(data[0]);

  // Convert data array to array of arrays
  const dataArray: (string | number | boolean)[][] = [];
  dataArray.push(columns);

  data.forEach((obj) => {
    const values = columns.map((col) => obj[col]);
    dataArray.push(values);
  });

  return Papa.unparse(dataArray, config);
}

export function exportToCSV(data: CSVRow[], filename: string, config?: any): void {
  var csvData = convertToCSV(data, config);
  var link

        if (csvData == null) return;
        filename = filename || 'export.csv';

        if (!csvData.match(/^data:text\/csv/i)) {
                csvData = 'data:text/csv;charset=utf-8,' + csvData;
        }
        link = document.createElement('a');

        link = document.createElement('a');
        link.setAttribute('href', encodeURI(csvData));
        link.setAttribute('download', filename);
        link.click();

//   fs.writeFile(filename, csvData, (err) => {
//     if (err) {
//       console.error('Error exporting to CSV:', err);
//     } else {
//       console.log(`Data exported to ${filename}`);
//     }
//   });
}