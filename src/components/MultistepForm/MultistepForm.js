import React, { createContext, useState, useContext, useEffect } from "react"

import * as styles from './MultistepForm.module.scss'

const MultistepContext = createContext({
  currentStep: 1,
  setCurrentStep: () => { },
  registeredSteps: [],
  registerStep: () => { },
})

const Form = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [registeredSteps, setRegisteredSteps] = useState([])
  const registerStep = (step) => {
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


const Buttons = ({ handleSubmit }) => {
  const { currentStep, setCurrentStep, registeredSteps } = useContext(
    MultistepContext
  )
  const isLastStep = currentStep === registeredSteps.length
  const isFirstStep = currentStep === 1;
  return (
    <div className={styles.buttons}>
      {!isFirstStep &&
        <div
          className={`${styles.button} ${styles.buttonPrevious}`}
          onClick={!isFirstStep ? () => setCurrentStep(currentStep - 1) : null}
          disabled={isFirstStep}
        >
          Wstecz
      </div>
      }
      {!isLastStep &&
        <div
          className={`${styles.button} ${styles.buttonNext}`}
          onClick={!isLastStep ? () => setCurrentStep(currentStep + 1) : null}
          disabled={isLastStep}
        >
          Dalej
      </div>
      }
      {isLastStep && <div className={`${styles.button} ${styles.buttonSubmit}`} onClick={handleSubmit} >
      Zatwierdź <i class="fa fa-check" aria-hidden="true"></i>
      </div>}
    </div>
  )
}

export { Form, Step, Buttons }
