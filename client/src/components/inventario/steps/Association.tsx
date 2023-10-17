import List from '@/components/utils/ListItems/List';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import values from 'lodash/values'
import { useState } from 'react';
import { setAssociation } from '@/redux/features/associationSlice';

const Association = ({ columns, upa }: any) => {
    const [selectedFieldCsv, setSelectedFieldCsv] = useState<any>([])
    const [selectedFieldDb, setSelectedFieldDb] = useState<any>([])
    // const [association, setAssociation] = useState<any>([])
    const [disabledItemsDb, setDisabledItemsDb] = useState<any>([])
    const association = useAppSelector((state: RootState) => state.association)
    const columnsCsv = useAppSelector((state: RootState) => state.association.columnsCsv)
    const dispatch = useAppDispatch()

    const dbColumns = upa?.tipo === 1 
        ? ['ut', 'faixa', 'numero_arvore', 'especie', 'dap', 'altura', 'qf', 'orient_x', 'x', 'y', 'obs', 'comentario']
        : ['ut', 'numero_arvore', 'especie', 'dap', 'altura', 'qf', 'latitude', 'longitude', 'obs', 'comentario']
    const fieldCsv = columns[selectedFieldCsv]
    const fieldDb = dbColumns[selectedFieldDb]
        
    const addAssoc = () => {
        dispatch(setAssociation({ ...association, columnsCsv: columns.map((field: any) => field.Header), columnsDb: dbColumns, relation: { ...association.relation, [fieldDb]: { column: { key: selectedFieldDb, value: fieldDb }, relation: { key: selectedFieldCsv, value: fieldCsv }, row: fieldCsv.Header + ' -> ' + fieldDb } } } )  )
    };

    const removeAssoc = () => {
        console.log('remover')
    }

    const displayAssoc = Object.values(association.relation).map((assoc: any) => assoc.row)

//   const assocFields = dbColumns?.map((column: any, index: number) => {
//     return {
//         [fields[index].Header]: column
//     }
//   })
    const fieldsCsv = Object.values(association.relation).map((assoc: any) => assoc.relation.key)
    const fieldsDb = Object.values(association.relation).map((assoc: any) => assoc.column.key)

    const items = columns.map((field: any) => field.Header) || columnsCsv
        
    return (
        <div>
            
            <div className='flex flex-row max-w-6xl mx-auto rounded-md bg-gray-100 items-center py-4 px-8 my-4 text-sm text-gray-800'>
                <div className=''>Para realizar a importação do inventário existem colunas que são obrigatórias e deverão ser utilizadas: 
                    <span className='font-bold'> ut, numero_arvore, especie, dap, altura</span>
                </div>
            </div>
            <div className='grid md:grid-cols-4 grid-cols-2 gap-4 max-w-xl md:max-w-6xl mx-auto'>
                <div className='mt-10'>
                    <div className='mb-2'>Colunas da Planilha</div>
                    <List 
                        items={items} 
                        selected={selectedFieldCsv} 
                        onChange={setSelectedFieldCsv} 
                        className='w-52 md:w-64' 
                        disabled={fieldsCsv}
                    />
                </div>
                <div className='mt-10'>
                    <div className='mb-2'>Colunas do DB</div>
                    <List 
                        items={dbColumns} 
                        selected={selectedFieldDb} 
                        onChange={setSelectedFieldDb} 
                        className='w-52 md:w-64' 
                        disabled={fieldsDb} 
                    />
                </div>
                <div className='flex flex-col w-full justify-center items-center space-y-4 w-24'>
                    <button className='px-4 py-2 rounded-md bg-gray-100 text-sm' onClick={addAssoc}>&gt; &gt;</button>
                    <button className='px-4 py-2 rounded-md bg-gray-100 text-sm' onClick={removeAssoc}>&lt; &lt;</button>
                </div>
                <div className='mt-10'>
                    <div className='mb-2'>Relacionamento</div>
                    <List 
                        items={displayAssoc} 
                        className='w-52 md:w-72' 
                        multiple={true}
                    />
                </div>
            </div>
        </div>
    );
         
}

export default Association