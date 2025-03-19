"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User, Phone, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

const INTERESTS = [
  { id: "tech", label: "Tech" },
  { id: "finance", label: "Finance" },
  { id: "health", label: "Health" },
  { id: "food", label: "Food" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "fashion", label: "Fashion" },
  { id: "business", label: "Business" },
  { id: "nature", label: "Nature" },
  { id: "travel", label: "Travel" },
  { id: "politics", label: "Politics" },
  { id: "ai", label: "AI" },
  { id: "films", label: "Films" },
];

export function CompleteProfile() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    interests: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleNextStep = () => {
    if (step === 1 && formData.username && formData.phoneNumber) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.interests.length === 0) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Handle profile completion logic here
  };

  return (
    <Card className="border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-white">
            Complete Your Profile
          </CardTitle>
          <span className="text-sm text-blue-400">Step {step} of 2</span>
        </div>
        <Progress value={step === 1 ? 50 : 100} className="h-1 bg-gray-700">
          <div className="h-full bg-blue-500 transition-all duration-300 ease-in-out" />
        </Progress>
        <CardDescription className="text-gray-400">
          {step === 1 ? "Tell us about yourself" : "Choose your interests"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={step === 1 ? handleNextStep : handleSubmit}
          className="space-y-4"
        >
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username"
                    className="pl-10 bg-gray-900/50 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-white">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="pl-10 bg-gray-900/50 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!formData.username || !formData.phoneNumber}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <Label className="text-white">Select Your Interests</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {INTERESTS.map((interest) => (
                    <Button
                      key={interest.id}
                      type="button"
                      variant="outline"
                      className={`
                        h-auto py-2 px-3 border-2 
                        ${
                          formData.interests.includes(interest.id)
                            ? "border-blue-500 bg-blue-500/20 text-blue-400"
                            : "border-gray-700 bg-gray-900/50 text-gray-400 hover:border-blue-500/50"
                        }
                      `}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      {interest.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 bg-gray-700 hover:bg-gray-600"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading || formData.interests.length === 0}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Completing...
                    </>
                  ) : (
                    "Complete"
                  )}
                </Button>
              </div>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
