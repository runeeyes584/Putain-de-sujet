"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Step {
  id: string
  title: string
  description: string
}

interface GigCreationWizardProps {
  children: React.ReactNode[]
  steps: Step[]
  onComplete?: () => void
}

export function GigCreationWizard({ children, steps, onComplete }: GigCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      onComplete?.()
      router.push("/seller-dashboard")
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const goToStep = (index: number) => {
    setCurrentStep(index)
    window.scrollTo(0, 0)
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-1 items-center">
              <button
                onClick={() => index < currentStep && goToStep(index)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                  index <= currentStep
                    ? "bg-emerald-500 text-white"
                    : "border border-gray-300 bg-white text-gray-500 dark:border-gray-700 dark:bg-gray-800"
                } ${index < currentStep ? "cursor-pointer" : ""}`}
                disabled={index > currentStep}
              >
                {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 ${index < currentStep ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-700"}`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="hidden grid-cols-2 gap-4 sm:grid md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`text-center text-sm ${
                index === currentStep
                  ? "font-medium text-emerald-600 dark:text-emerald-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>
        <div className="mt-2">
          <h2 className="text-xl font-bold">{steps[currentStep].title}</h2>
          <p className="text-gray-600 dark:text-gray-400">{steps[currentStep].description}</p>
        </div>
      </div>

      {/* Content */}
      <Card className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {children[currentStep]}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={goToPreviousStep} disabled={currentStep === 0}>
          Back
        </Button>
        <Button type="button" className="bg-emerald-500 hover:bg-emerald-600" onClick={goToNextStep}>
          {currentStep === steps.length - 1 ? "Publish Gig" : "Continue"}
        </Button>
      </div>
    </div>
  )
}
