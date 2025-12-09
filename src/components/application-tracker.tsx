"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Clock, AlertCircle, Calendar, FileText, User, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export type ApplicationStatus =
  | "not-started"
  | "in-progress"
  | "documents-pending"
  | "interview-scheduled"
  | "completed"

interface ApplicationStep {
  id: string
  title: string
  description: string
  status: ApplicationStatus
  completedDate?: string
  nextAction?: string
  documents?: string[]
  microcopy: {
    notStarted: string
    inProgress: string
    documentsPending: string
    interviewScheduled: string
    completed: string
  }
}

const applicationSteps: ApplicationStep[] = [
  {
    id: "application",
    title: "Submit Application",
    description: "Complete your online application form with basic information",
    status: "completed",
    completedDate: "2025-01-15",
    documents: ["Application Form", "Personal Statement", "Contact Information"],
    microcopy: {
      notStarted: "Ready to begin your aviation journey? Start your application here.",
      inProgress: "Great start! Complete the remaining fields to submit your application.",
      documentsPending: "Application submitted! We're reviewing your information.",
      interviewScheduled: "Application approved and ready for next steps.",
      completed: "Application successfully submitted and approved.",
    },
  },
  {
    id: "documents",
    title: "Document Verification",
    description: "Upload required documents for verification",
    status: "in-progress",
    nextAction: "Upload missing medical certificate",
    documents: ["High School Diploma ✓", "Birth Certificate ✓", "Medical Certificate (Pending)", "Government ID ✓"],
    microcopy: {
      notStarted: "Prepare your documents for a smooth verification process.",
      inProgress: "Almost there! Upload your remaining documents to continue.",
      documentsPending: "Documents received. Our team is verifying your credentials.",
      interviewScheduled: "All documents verified and approved.",
      completed: "Document verification complete. All requirements met.",
    },
  },
  {
    id: "examination",
    title: "Entrance Examination",
    description: "Take the aviation aptitude and knowledge assessment",
    status: "not-started",
    nextAction: "Schedule your entrance exam",
    documents: ["Mathematics Test", "Physics Assessment", "English Proficiency", "Aviation Knowledge"],
    microcopy: {
      notStarted: "Schedule your entrance exam once document verification is complete.",
      inProgress: "Exam in progress. Take your time and do your best!",
      documentsPending: "Exam completed. Results are being processed.",
      interviewScheduled: "Congratulations! You passed the entrance examination.",
      completed: "Entrance examination successfully completed with passing score.",
    },
  },
  {
    id: "medical",
    title: "Medical Examination",
    description: "Complete aviation medical examination with approved physician",
    status: "not-started",
    nextAction: "Book medical appointment",
    documents: ["Vision Test", "Hearing Test", "Cardiovascular Check", "Psychological Assessment"],
    microcopy: {
      notStarted: "Medical examination will be scheduled after passing entrance exam.",
      inProgress: "Medical examination in progress with our approved physician.",
      documentsPending: "Medical exam complete. Awaiting physician's report.",
      interviewScheduled: "Medical clearance received. You're cleared to fly!",
      completed: "Medical examination passed. Aviation medical certificate issued.",
    },
  },
  {
    id: "interview",
    title: "Final Interview",
    description: "Meet with our instructors and complete enrollment process",
    status: "not-started",
    nextAction: "Interview will be scheduled automatically",
    documents: ["Personal Interview", "Program Selection", "Financial Planning", "Class Scheduling"],
    microcopy: {
      notStarted: "Final interview will be scheduled once all requirements are met.",
      inProgress: "Interview day! Meet our team and finalize your program details.",
      documentsPending: "Interview completed. Processing enrollment paperwork.",
      interviewScheduled: "Interview scheduled! Check your email for details.",
      completed: "Welcome to APG International! Enrollment complete.",
    },
  },
]

interface ApplicationTrackerProps {
  currentStep?: number
  applicationId?: string
}

export function ApplicationTracker({ applicationId = "APG-2025-001234" }: ApplicationTrackerProps) {
  const [steps] = useState(applicationSteps)

  const completedSteps = steps.filter((step) => step.status === "completed").length
  const totalSteps = steps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5 text-green-600" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
      case "documents-pending":
        return <FileText className="w-5 h-5 text-yellow-600" />
      case "interview-scheduled":
        return <Calendar className="w-5 h-5 text-purple-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "documents-pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "interview-scheduled":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const getStatusText = (status: ApplicationStatus) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "documents-pending":
        return "Under Review"
      case "interview-scheduled":
        return "Scheduled"
      default:
        return "Not Started"
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">Application Progress</CardTitle>
              <CardDescription>Application ID: {applicationId}</CardDescription>
            </div>
            <Badge className="bg-primary text-primary-foreground w-fit">
              {completedSteps} of {totalSteps} Steps Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium text-foreground">{Math.round(progressPercentage)}%</span>
            </div>
            <progress
              value={completedSteps}
              max={totalSteps}
              aria-valuenow={completedSteps}
              aria-valuemin={0}
              aria-valuemax={totalSteps}
              className="h-3 w-full overflow-hidden rounded-full bg-muted [&::-webkit-progress-bar]:bg-muted [&::-webkit-progress-value]:bg-aviation-red [&::-moz-progress-bar]:bg-aviation-red"
            />
            <p className="text-sm text-muted-foreground">
              {completedSteps === totalSteps
                ? "Congratulations! Your application is complete. Welcome to APG International!"
                : `${totalSteps - completedSteps} step${totalSteps - completedSteps !== 1 ? "s" : ""} remaining to complete your application.`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <Card
            key={step.id}
            className={cn(
              "transition-all duration-200",
              step.status === "in-progress" && "ring-2 ring-blue-200 shadow-md",
              step.status === "completed" && "bg-green-50/50",
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Step Number & Icon */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                      step.status === "completed" && "bg-green-600 text-white",
                      step.status === "in-progress" && "bg-blue-600 text-white",
                      step.status === "documents-pending" && "bg-yellow-600 text-white",
                      step.status === "interview-scheduled" && "bg-purple-600 text-white",
                      step.status === "not-started" && "bg-gray-200 text-gray-600",
                    )}
                  >
                    {index + 1}
                  </div>
                  {getStatusIcon(step.status)}
                </div>

                {/* Step Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    <Badge className={cn("w-fit", getStatusColor(step.status))}>{getStatusText(step.status)}</Badge>
                  </div>

                  {/* Microcopy */}
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {step.microcopy[step.status.replace("-", "") as keyof typeof step.microcopy] ||
                        step.microcopy.notStarted}
                    </p>
                  </div>

                  {/* Documents/Requirements */}
                  {step.documents && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Requirements:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.documents.map((doc, docIndex) => (
                          <div key={docIndex} className="flex items-center gap-2 text-sm">
                            {doc.includes("✓") ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : doc.includes("Pending") ? (
                              <Clock className="w-4 h-4 text-yellow-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-gray-400" />
                            )}
                            <span
                              className={cn(
                                "text-muted-foreground",
                                doc.includes("✓") && "text-green-700",
                                doc.includes("Pending") && "text-yellow-700",
                              )}
                            >
                              {doc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Action */}
                  {step.nextAction && step.status !== "completed" && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        size="sm"
                        className={cn(
                          step.status === "in-progress" ? "btn-aviation-primary" : "btn-aviation-secondary",
                        )}
                      >
                        {step.nextAction}
                      </Button>
                      {step.status === "in-progress" && (
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          Need Help?
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Completion Date */}
                  {step.completedDate && (
                    <div className="text-xs text-green-700">
                      Completed on{" "}
                      {new Date(step.completedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Need Assistance?</h3>
          <p className="text-muted-foreground mb-4">
            Our admissions team is here to help you through every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Call Admissions: +63 2 8123 4567
            </Button>
            <Button variant="outline">
              <User className="w-4 h-4 mr-2" />
              Chat with Counselor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
