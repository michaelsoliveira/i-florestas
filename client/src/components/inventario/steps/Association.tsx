import values from 'lodash/values'

const Association = ({ data, fields, upa }: any) => {
    const dbColumns = upa?.tipo === 1 
        ? ['ut', 'faixa', 'numero_arvore', 'especie', 'dap', 'altura', 'qf', 'orient_x', 'latitude', 'longitude', 'obs', 'comentario']
        : ['ut', 'numero_arvore', 'especie', 'dap', 'altura', 'qf', 'latitude', 'longitude', 'obs', 'comentario']

        const datatest = [
            { "Column1 Header": "Value1", "Column2 Header": "Value2", "Column3 Header": "Value3" },
            // Add more data rows
          ];
        
          const headerToField = {
            "Column1 Header": "field1",
            "Column2 Header": "field2",
            "Column3 Header": "field3",
            // Add more headers and fields as needed
          };
        
          const assocFields = dbColumns.map((column: any, index: number) => {
            return {
                [fields[index].Header]: column
            }
          })

          const items = values(fields)
          
            return (
                <div>
                    <span>{JSON.stringify(assocFields)}</span>
                     <table className="mt-10">
                        <thead>
                        <tr>
                            {Object.values(fields).map((header: any) => (
                            <th key={header.accessor}>{header.Header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row: any, index: number) => (
                            <tr key={index}>
                            {Object.values(fields).map((header: any, idx: number) => (
                                <td key={idx}>{row[header.accessor]}</td>
                            ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
             
            );
         
}

export default Association