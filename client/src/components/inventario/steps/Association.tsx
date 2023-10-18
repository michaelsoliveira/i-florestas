import List from '@/components/utils/ListItems/List';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import values from 'lodash/values'
import { useRef, useState } from 'react';
import { setAssociation } from '@/redux/features/associationSlice';

const Association = ({ upa }: any) => {
    const [selectedFieldCsv, setSelectedFieldCsv] = useState<any>([])
    const [selectedFieldDb, setSelectedFieldDb] = useState<any>([])
    const [selectedAssoc, setSelectedAssoc] = useState<any>([])
    const association = useAppSelector((state: RootState) => state.association)
    const columnsCsv = useAppSelector((state: RootState) => state.association.columnsCsv)
    const dispatch = useAppDispatch()
    const handleClearAssoc = useRef<any>()
    const handleClearCsv = useRef<any>()
    const handleClearDb = useRef<any>()
    const handleDisable = useRef<any>()

    const dbColumns = upa?.tipo === 1 
        ? ['ut', 'faixa', 'numero_arvore', 'especie', 'dap', 'altura', 'qf', 'orient_x', 'x', 'y', 'obs', 'comentario']
        : ['ut', 'numero_arvore', 'especie', 'dap', 'altura', 'qf', 'latitude', 'longitude', 'obs', 'comentario']
    const fieldCsv = association.columnsCsv.map((field: any, index: any) => field)[selectedFieldCsv]
    const fieldDb = dbColumns[selectedFieldDb]
        
    const addAssoc = () => {
        dispatch(setAssociation({ ...association, columnsDb: dbColumns, relation: { ...association.relation, [selectedFieldCsv]: { column: { key: selectedFieldDb, value: fieldDb }, relation: { key: selectedFieldCsv, value: fieldCsv }, row: fieldCsv.Header + ' -> ' + fieldDb } } } )  )
    };

    const removeAssoc = () => {
        let data: any = []
        for (let [key, row] of Object.entries(association.relation)) {
            data.push(row)
        }

        const relation = data.filter((row: any, key: number) => !selectedAssoc.includes(key))

        dispatch(setAssociation({ ...association, relation }))
        handleClearAssoc.current.click()
        handleClearCsv.current.click()
        handleClearDb.current.click()
        setSelectedFieldDb([])
        setSelectedFieldCsv([])
    }

    const displayAssoc = Object.values(association.relation).map((assoc: any) => assoc.row)

    const fieldsCsv = Object.values(association.relation).map((assoc: any) => Number(assoc.relation.key))
    const fieldsDb = Object.values(association.relation).map((assoc: any) => Number(assoc.column.key))

    const items = columnsCsv.map((col: any) => col.Header)
        
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
                        handleClear={handleClearCsv}
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
                        handleClear={handleClearDb}
                    />
                </div>
                <div className='flex flex-col w-full justify-center items-center space-y-4 w-24'>
                    <button className='px-4 py-2 rounded-md bg-gray-100 text-sm' onClick={addAssoc}>&gt; &gt;</button>
                    <button className='px-4 py-2 rounded-md bg-gray-100 text-sm' onClick={removeAssoc}>&lt; &lt;</button>
                </div>
                <div className='mt-10'>
                    <div className='mb-2'>Relacionamento</div>
                    <List 
                        selected={selectedAssoc}
                        onChange={setSelectedAssoc}
                        items={displayAssoc} 
                        className='w-52 md:w-72' 
                        multiple={true}
                        handleClear={handleClearAssoc}
                    />
                </div>
            </div>
        </div>
    );
         
}

export default Association