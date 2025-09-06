"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import Image from 'next/image';

// A self-contained OnboardingLayout component
interface LeftContent {
    mainTitle: string;
    description?: string;
    bulletPoints?: string[];
    author?: string;
    company?: string;
}

interface OnboardingLayoutProps {
    leftContent: LeftContent;
    children: React.ReactNode;
}



// Data for left side content based on user role
const jobSeekerLeftContent: LeftContent = {
    mainTitle: "Make a lasting impression.",
    bulletPoints: [
        "Your profile picture is the first thing employers see.",
        "A professional photo can increase your visibility.",
        "Stand out from other candidates.",
    ],
};

const employerLeftContent: LeftContent = {
    mainTitle: "Boost your brand.",
    bulletPoints: [
        "A logo helps candidates recognize your company.",
        "Showcases your professionalism and brand identity.",
        "Builds trust and credibility with potential hires.",
    ],
};

// Main component for the image upload page
export default function ImageUploadPage() {
    const [isJobSeeker, setIsJobSeeker] = useState<boolean>(true);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentStep] = useState<number>(3); // This page is step 3 in the flow

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedRole = localStorage.getItem('user_role');
            if (storedRole === 'employer') {
                setIsJobSeeker(false);
            } else if (storedRole === 'job_seeker') {
                setIsJobSeeker(true);
            }
        }
    }, []);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleImageUploadSubmit = () => {
        if (!imagePreview) {
            alert("Please select an image to upload.");
            return;
        }
        console.log("Image uploaded. Navigating to the next step.");
        // In a real app, you would send the image to your backend here
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const totalSteps = isJobSeeker ? 5 : 4;
    const currentProgress = (currentStep / totalSteps) * 100;
    const leftContent = isJobSeeker ? jobSeekerLeftContent : employerLeftContent;

    return (
        <OnboardingLayout leftContent={leftContent}>
            {/* Progress bar and step indicator */}
            <div className="absolute top-12 right-12 z-10 flex flex-col items-end">
                <div className="text-sm text-gray-500 mb-2">
                    Step {currentStep} of {totalSteps} - Next: {isJobSeeker ? "Aircraft Experience" : "Company Photo"}
                </div>
                <Progress value={currentProgress} className="w-48" />
            </div>

            <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                <div className="flex justify-between items-center mb-8 w-full">
                    <Image
                        src={'/logo.svg'}
                        alt='logo'
                        width={200}
                        height={40}
                    />
                </div>
                <div className="flex flex-col mt-3 w-full">
                    <div className="text-xl text-gray-500 font-semibold uppercase">Sign up</div>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tighter my-2">
                        {isJobSeeker ? "Add Your Profile Picture" : "Upload Your Company Logo"}
                    </h1>
                    <p className="text-gray-500 mb-6">
                        This will be used as your {isJobSeeker ? "profile picture" : "company logo"}.
                    </p>
                </div>

                <div
                    className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden mb-6 border-4 border-dashed border-gray-300"
                    onClick={handleButtonClick}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                    />
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                        >
                            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                            <path d="M12 12v9" />
                            <path d="M16 16l-4-4-4 4" />
                        </svg>
                    )}
                </div>
                <Button
                    onClick={handleImageUploadSubmit}
                    className="w-fit py-7 px-10 text-xl font-bold bg-[#1E293B] hover:bg-[#1E293B]/90 mt-6"
                >
                    Finish Setup
                </Button>
            </div>
        </OnboardingLayout>
    );
}

// A simple utility to merge class names, assuming it exists
const cn = (...inputs: any[]) => {
    return inputs.filter(Boolean).join(' ');
};

// A simple utility to merge tailwind classes, assuming it exists
const twMerge = (...inputs: any[]) => {
    return inputs.filter(Boolean).join(' ');
};

// A simple utility to validate a string, assuming it exists
const cva = (...inputs: any[]) => {
    return inputs.filter(Boolean).join(' ');
};

// Dummy components for shadcn
const CheckboxPrimitive = React.forwardRef<
    React.ElementRef<"button">,
    React.ComponentPropsWithoutRef<"button"> & {
        checked?: boolean;
        onCheckedChange?: (checked: boolean) => void;
    }
>(({ checked, onCheckedChange, className, ...props }, ref) => (
    <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
            "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            checked && "bg-primary text-primary-foreground",
            className
        )}
        {...props}
    >
        {checked && (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-white"
            >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        )}
    </button>
));
CheckboxPrimitive.displayName = "CheckboxPrimitive";

const CheckboxComponent = CheckboxPrimitive;