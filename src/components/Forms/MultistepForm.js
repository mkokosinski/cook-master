import React, { createContext, useState, useContext, useEffect } from "react"

const MultistepContext = createContext({
  currentStep: 1,
  setCurrentStep: () => {},
  registeredSteps: [],
  registerStep: () => {},
})

const Form = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [registeredSteps, setRegisteredSteps] = useState([])
  const registerStep = (step) =>{
    if (registeredSteps.includes(step)) {
        return;
    }
    setRegisteredSteps([...registeredSteps, step])
  }
  
  const contextValue = {
    currentStep,
    setCurrentStep,
    registeredSteps,
    registerStep,
  }

  return (
    <MultistepContext.Provider value={contextValue}>
      {children}
    </MultistepContext.Provider>
  )
}


const Step = ({ children, step }) => {
  const { currentStep, registerStep } = useContext(MultistepContext)
  useEffect(() => {
    registerStep(step)
  })
  return step === currentStep ? children : null
}


const Buttons = () => {
  const { currentStep, setCurrentStep, registeredSteps } = useContext(
    MultistepContext
  )
  const isLastStep = currentStep === registeredSteps.length
  return (
    <>
      <div
        className="button"
        onClick={() => setCurrentStep(currentStep - 1)}
        disabled={currentStep === 1}
      >
        Wstecz
      </div>
      <div
        className="button"
        onClick={() => setCurrentStep(currentStep + 1)}
        disabled={isLastStep}
      >
        Dalej
      </div>
      {isLastStep && <button className="button" type="submit">Dodaj przepis</button>}
    </>
  )
}

export { Form, Step, Buttons }
