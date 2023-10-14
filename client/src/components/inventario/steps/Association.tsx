import List from '@/components/utils/ListItems/List';
import values from 'lodash/values'

const Association = ({ data, fields, upa }: any) => {
    const dbColumns = upa?.tipo === 1 
        ? ['ut', 'faixa', 'numero_arvore', 'especie', 'dap', 'altura', 'qf', 'orient_x', 'x', 'y', 'obs', 'comentario']
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

          const items = fields.map((field: any) => field.Header)
          
            return (
                <div>
                    <div className='flex flex-row max-w-5xl mx-auto rounded-md bg-gray-100 items-center py-4 px-8 my-4 text-sm text-gray-800'>
                        <div className=''>Para realizar a importação do inventário existem colunas que são obrigatórias e deverão ser utilizadas: 
                            <span className='font-bold'> ut, numero_arvore, especie, dap, altura</span>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-3 grid-cols-2 gap-4 max-w-xl md:max-w-4xl mx-auto'>
                        <div className='mt-10'>
                            <div className='mb-2'>Colunas da Planilha</div>
                            <List items={items} selected={[0]} className='w-52 md:w-64' />
                        </div>
                        <div className='mt-10'>
                            <div className='mb-2'>Colunas do DB</div>
                            <List items={dbColumns} selected={[0]} className='w-52 md:w-64' />
                        </div>
                    </div>
                </div>
            );
         
}

export default Association