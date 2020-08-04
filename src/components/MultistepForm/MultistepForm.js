import React, { createContext, useState, useContext, useEffect } from "react"

import cx from "classnames"

import * as styles from "./MultistepForm.module.scss"

const MultistepContext = createContext({
  currentStep: 1,
  setCurrentStep: () => {},
  registeredSteps: [],
  registerStep: () => {},
})

const Form = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [registeredSteps, setRegisteredSteps] = useState([])
  const registerStep = step => {
    if (registeredSteps.includes(step)) {
      return
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

const ProgressBar = () => {
  const { currentStep, registeredSteps } = useContext(MultistepContext)

  const value = Math.round((currentStep / registeredSteps.length) * 100)

  const isCompleted = value >= 100;

  console.log(value, currentStep, registeredSteps)

  const barClasses = cx(`${styles.bar} progress`, {
    "is-success": !isCompleted,
    "is-link": isCompleted,
  })

  return (
    <progress className={barClasses} value={value} max="100">
     {currentStep} / {registeredSteps.length}
    </progress>
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
  const isFirstStep = currentStep === 1
  return (
    <div className={`buttons is-centered ${styles.buttons}`}>
      {!isFirstStep && (
        <div
          className={`button is-rounded is-white`}
          onClick={!isFirstStep ? () => setCurrentStep(currentStep - 1) : null}
          disabled={isFirstStep}
        >
          <span class="icon is-small ml-0">
            <i class="fas fa-angle-left"></i>
          </span>
          <span>Wstecz</span>
        </div>
      )}
      {!isLastStep && (
        <div
          className={`button is-rounded is-success`}
          onClick={!isLastStep ? () => setCurrentStep(currentStep + 1) : null}
          disabled={isLastStep}
        >
          <span>Dalej</span>
          <span class="icon is-small">
            <i class="fas fa-angle-right"></i>
          </span>
        </div>
      )}
      {isLastStep && (
        <div className={`button is-rounded is-link`} onClick={handleSubmit}>
          <span class="icon is-small">
            <i class="fas fa-check"></i>
          </span>
          <span>Zatwierdź</span>
        </div>
      )}
    </div>
  )
}

export { Form, Step, Buttons, ProgressBar }
