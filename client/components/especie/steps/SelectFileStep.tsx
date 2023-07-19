import Table from "@/components/Table";
import { StepContext } from "contexts/StepContext";
import { useContext } from "react";

const SelectFileStep = ({columns, data}: any) => {
    const { step, nextStep, prevStep, data: dataStep, updateData } = useContext(StepContext)
      
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      updateData({ [name]: value });
    };
  
    return (
     
    
        <div className="mt-6">
            <Table columns={columns} data={data} />
        </div>
  
  
    );
  };

  export default SelectFileStep