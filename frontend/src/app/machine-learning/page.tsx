'use client'

import withAuthentication from "@/components/utils/withAuthentication"
import MLIndex from "@/components/machine-learning/Index"

const MachineLearning = () => {
    return (<MLIndex />)
} 

export default withAuthentication(MachineLearning)