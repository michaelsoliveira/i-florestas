import classNames from "classnames"
import { StepContext } from "contexts/StepContext"
import { useContext } from "react"

const StepperControl = ({ steps }: any) => {
    const { step, nextStep, prevStep, data: dataStep, updateData } = useContext(StepContext)
    return (
        <div className="container flex justify-around mt-4 mb-8">
            <button
                onClick={() => prevStep()}
                className={classNames("text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-200 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out",
                    step === 1 ? "opacity-50 cursor-not-allowed" : "")}
            >
                Voltar
            </button>
            <button
                onClick={() => nextStep()}
                className={classNames("text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-200 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out")}
            >
                { step === steps.length - 1 ? "Finalizar" : "Prosseguir" }
            </button>
        </div>
    )
}

export default StepperControl