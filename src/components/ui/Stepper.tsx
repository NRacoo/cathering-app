    "use client"

    import * as React from "react"
    import { Check } from "lucide-react"
    import { cn } from "@/lib/utils"

    interface StepperProps {
    steps: Array<{
        title: string
        description?: string
    }>
    currentStep: number
    className?: string
    }

    export function Stepper({ steps, currentStep, className }: StepperProps) {
    return (
        <div className={cn("w-full", className)}>
        <div className="flex items-center justify-between">
            {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            const isUpcoming = stepNumber > currentStep

            return (
                <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                    <div
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200",
                        {
                        "border-green-600 bg-green-600 text-white": isCompleted,
                        "border-green-600 bg-green-50 text-green-600": isCurrent,
                        "border-gray-300 bg-white text-gray-400": isUpcoming,
                        },
                    )}
                    >
                    {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
                    </div>
                    <div className="mt-2 text-center">
                    <div
                        className={cn("text-sm font-medium", {
                        "text-green-600": isCompleted || isCurrent,
                        "text-gray-400": isUpcoming,
                        })}
                    >
                        {step.title}
                    </div>
                    {step.description && (
                        <div
                        className={cn("text-xs", {
                            "text-green-500": isCompleted || isCurrent,
                            "text-gray-400": isUpcoming,
                        })}
                        >
                        {step.description}
                        </div>
                    )}
                    </div>
                </div>
                {index < steps.length - 1 && (
                    <div
                    className={cn("h-0.5 flex-1 mx-4 transition-all duration-200", {
                        "bg-green-600": stepNumber < currentStep,
                        "bg-gray-300": stepNumber >= currentStep,
                    })}
                    />
                )}
                </React.Fragment>
            )
            })}
        </div>
        </div>
    )
    }
