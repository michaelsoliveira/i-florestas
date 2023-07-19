import { AuthContext } from "contexts/AuthContext"
import { LoadingContext } from "contexts/LoadingContext"
import { useModalContext } from "contexts/ModalContext"
import { ProjetoContext } from "contexts/ProjetoContext"
import { CSSProperties, forwardRef, useContext, useMemo, useState } from "react"
import { useCSVReader } from "react-papaparse"
import alertService from '../../services/alert'
import { Button } from "../Utils/Button"
import Table from "../Table"
import { StepContext } from "contexts/StepContext"
import SelectFileStep from "./steps/SelectFileStep"
import Errors from "./steps/Errors"
import Finalizar from "./steps/Finalizar"
import Stepper from "../Stepper"
import StepperControl from "../StepperControl"

type ImportModalType = {
    loadEspecies?: any;
    steps: any;
}

const ImportModal = forwardRef<any, ImportModalType>(
    function ChangeActive({ loadEspecies, steps }, ref) {
    const { client } = useContext(AuthContext)
    const { showModal, hideModal, store } = useModalContext()
    const { visible } = store
    const { setLoading } = useContext(LoadingContext)
    const { projeto } = useContext(ProjetoContext)
    const { CSVReader } = useCSVReader()
    const [encoding, setEncoding] = useState('iso-8859-1')
    
    const [uploading, setUploading] = useState<boolean>(false)
    const [duplicates, setDuplicates] = useState([])
    const { step, nextStep, prevStep, data: dataStep, updateData } = useContext(StepContext)
    
    const [columnData, setColumnData] = useState([])
    const [rowData, setRowData] = useState([])
    const columns = useMemo(() => columnData, [columnData])
    const data = useMemo(() => rowData, [rowData])

    const styles = {
        csvReader: {
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 10,
        } as CSSProperties,
        progressBarBackgroundColor: {
          backgroundColor: 'green',
        } as CSSProperties,
    };

    const handleImportEspecies = async () => {
        try {
            setLoading(true)
            await client.post(`/especie/import?projetoId=${projeto?.id}`, {
                columns: columns,
                data: data
            })
            .then((result: any) => {
                const { data } = result
                
                setLoading(false)
                if (!data.error) {
                    alertService.success(data?.message)
                    loadEspecies()
                    hideModal()
                } else {
                    if (data?.errorType && data?.errorType === 'duplicates') {
                        setDuplicates(data?.duplicates)
                    }
                    alertService.warn(data?.message)
                }
            }).catch((error: any) => {
                console.log('Esse error: ', error.message)
            })
        } catch(e: any) {
            alertService.error(e.message)
        }
    }
      
      const Step2 = () => {
        const { data, updateData, nextStep, prevStep } = useContext(
          StepContext
        );
      
        const handleChange = (e: any) => {
          const { name, value } = e.target;
          updateData({ [name]: value });
        };
      
        return (
          <div>
            <h2>Step 2: Inconscistencias</h2>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={data.nome}
              onChange={handleChange}
            />
            <br />
            <button onClick={prevStep}>Anterior</button>
            <button onClick={nextStep}>Próximo</button>
          </div>
        );
      };
      
      const Step3 = () => {
        const { data, prevStep, resetData } = useContext(StepContext);
      
        const handleSubmit = (e: any) => {
          e.preventDefault();
          // Perform form submission logic here
          console.log(data);
          // Reset form data and step
          resetData();
        };
      
        return (
          <div>
            <h2>Step 3: Confirmation</h2>
            <p>Name: {data.nome}</p>
            <p>Email: {data.nome_orgao}</p>
            <p>Address: {data.nome_vulgar}</p>
            <button onClick={prevStep}>Anterior</button>
            <button onClick={handleSubmit}>Enviar</button>
          </div>
        );
      };

    const displayStep = () => {
        const { step } = useContext(StepContext);
        const renderStep = () => {
            switch (step) {
              case 1:
                return <SelectFileStep columns={columns} data={data} />;
              case 2:
                return <Errors />;
              case 3:
                return <Finalizar />;
              default:
                return null;
            }
          };
        
          return renderStep()
    }

    const onUploadAccepted = async (result: any) => {
        const columns = result.data[0].map((col: any, index: any) => {
            const accessor = col.normalize("NFD").replace(/[^0-9a-zA-Z\s]/g, "").split(" ").join("_").toLowerCase()

            return {
                Header: col,
                accessor
            }
        })

        const rows = result.data.slice(1).map((row: any) => {
            return row.reduce((acc: any, curr: any, index: any) => {
                acc[columns[index].accessor] = curr;
                return acc;
            }, {})
        })
        
        setColumnData(columns)
        setRowData(rows)

    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center justify-center px-4 py-2 bg-gray-100">
                <div className="flex flex-row justify-center items-center">
                    <CSVReader 
                        config={
                            {
                                encoding
                            }
                        }
                        onUploadAccepted={onUploadAccepted}
                    >
                    {({
                        getRootProps,
                        acceptedFile,
                        ProgressBar,
                        getRemoveFileProps,
                    }: any) => (
                        <>
                        <div className="flex flex-col lg:flex-row items-center justify-center">
                            <div className="px-2 w-36">
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1"
                                    value={encoding}
                                    onChange={e => {
                                        setEncoding(String(e.target.value))
                                    }}
                                >
                                    {["iso-8859-1", "utf-8"].map(enconding => (
                                    <option key={enconding} value={enconding}>
                                        {enconding}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center justify-center mt-2 lg:mt-0">
                                <a 
                                    {...getRootProps()} 
                                    className="bg-indigo hover:bg-indigo-dark text-green-700 font-bold px-4 inline-flex align-middle hover:cursor-pointer"
                                >
                                    <svg className="fill-green-700 w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                                    </svg>
                                    <span className="ml-2">{uploading ? "Abrindo..." : "Abrir Planilha"}</span>
                                </a>
                                </div>
                                <div className="flex flex-row items-center justify-center px-2 space-x-2">
                                   
                                    { acceptedFile && (
                                        <>
                                            <span>{acceptedFile.name}</span>
                                            <Button {...getRemoveFileProps()}
                                                className="text-red-700 hover:cursor-pointer justify-center w-24"
                                            >
                                                <span 
                                                    onClick={() => {  
                                                        setColumnData([])
                                                        setRowData([]) 
                                                    }}
                                                >
                                                    Remove
                                                </span>
                                            </Button>
                                    </>
                                    )}
                                   
                                </div>
                                <div className="col-span-4 pt-1">
                                    <ProgressBar style={styles.progressBarBackgroundColor} />
                                </div>
                            </div>
                        </>
                    )}
                </CSVReader>  
                </div>
                
            </div>
            <div>
                <Stepper
                    steps= { steps }
                />
                <div>
                    {displayStep()}
                </div>
                <StepperControl steps={steps} />
            </div>
            <span
                className="hidden"
                ref={ref}
                onClick={handleImportEspecies}
            >
                Importar
            </span>
           
        </div>
    )
})

export default ImportModal