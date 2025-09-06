"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { useFormContext } from '../contexts/FormContext';
import { Eye, EyeOff } from 'lucide-react'; // Import the icons

// Zod schemas for validation
const passwordSchema = z.string()
    .min(8, "At least 8 characters")
    .regex(/[0-9]/, "At least 1 number")
    .regex(/[a-z]/, "At least 1 lowercase letter")
    .regex(/[A-Z]/, "At least 1 uppercase letter")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "At least 1 special character");

const jobSeekerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const employerSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    businessEmail: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


// Data for left side content based on user role
const jobSeekerLeftContent = {
    mainTitle: "Plan Benefits",
    bulletPoints: [
        "Search from manually-validated jobs from over 500 qualified employers",
        "Get notified with job alerts",
        "Up-to-date resources and industry insights",
        "Connect with employers through our flight department directory",
        "Plans start at just $10/month with an annual plan",
    ],
};

const employerLeftContent = {
    mainTitle: "Plan Benefits",
    bulletPoints: [
        "Reach top-tier pilots and crew.",
        "Save Time with Pre-Screened Candidates",
        "Boost your job posts to get more visibility",
        "Get priority support from our dedicated hiring experts.",
    ],
};

// Form content for the 'Create Account' step
const createAccountContent = {
    title: "Create your account",
    inputs: [
        { type: "text", placeholder: "Enter your name", name: "name" },
        { type: "email", placeholder: "Enter your email", name: "email" },
        { type: "tel", placeholder: "Enter your phone number (optional)", name: "phone" },
        { type: "password", placeholder: "Choose a password", name: "password" },
        { type: "password", placeholder: "Confirm password", name: "confirmPassword" },
    ],
    passwordRequirements: [
        "At least 8 characters",
        "At least 1 number",
        "At least 1 lowercase letter",
        "At least 1 uppercase letter",
        "At least 1 special character",
    ],
};

const employerCreateAccountContent = {
    title: "Create your account",
    inputs: [
        { type: "text", placeholder: "Enter Company Name", name: "companyName" },
        { type: "email", placeholder: "Enter Business Email", name: "businessEmail" },
        { type: "password", placeholder: "Choose a password", name: "password" },
        { type: "password", placeholder: "Confirm password", name: "confirmPassword" },
    ],
    passwordRequirements: [
        "At least 8 characters",
        "At least 1 number",
        "At least 1 lowercase letter",
        "At least 1 uppercase letter",
        "At least 1 special character",
    ],
};


// A reusable component for the form itself
const FormContainer = ({ content, isJobSeeker }) => {
    const { setFormState } = useFormContext();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const router = useRouter();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    const schema = isJobSeeker ? jobSeekerSchema : employerSchema;
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const watchedPassword = watch("password", "");

    const isPasswordRuleValid = (rule) => {
        switch (rule) {
            case "At least 8 characters":
                return watchedPassword.length >= 8;
            case "At least 1 number":
                return /[0-9]/.test(watchedPassword);
            case "At least 1 lowercase letter":
                return /[a-z]/.test(watchedPassword);
            case "At least 1 uppercase letter":
                return /[A-Z]/.test(watchedPassword);
            case "At least 1 special character":
                return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(watchedPassword);
            default:
                return false;
        }
    };

    const onSubmit = (data) => {
        if (!termsAccepted) {
            console.log("Terms and conditions not accepted.");
            return;
        }
        
        setFormState(prevState => ({
            ...prevState,
            data: data,
            isJobSeeker: isJobSeeker
        }));
        
        router.push('/personalize');
    };

    const RequirementItem = ({ text, isValid }) => (
        <li className={`flex items-center space-x-2 text-lg ${isValid ? 'text-green-500' : 'text-gray-500'}`}>
            {isValid ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            )}
            <span>{text}</span>
        </li>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-8 max-w-lg mx-auto md:max-w-none w-full">
            <div className="flex justify-between items-center mb-8">
                <div className="flex-shrink-0">
                    <Image
                        src={'/logo.svg'}
                        alt='logo'
                        width={200}
                        height={40}
                    />
                </div>
            </div>

            <div className="flex flex-col mt-3">
                <div className="text-xl text-gray-500 font-semibold uppercase">Sign up</div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tighter my-2">
                    {content.title}
                </h1>
            </div>

            <div className='w-full flex flex-col items-end md:flex-row gap-6'>
                <div className="flex flex-col space-y-4 flex-1">
                    {content.inputs.map((input, index) => (
                        <div key={index} className="relative">
                            <input
                                type={
                                    input.name === 'password'
                                    ? (passwordVisible ? 'text' : 'password')
                                    : input.name === 'confirmPassword'
                                    ? (confirmPasswordVisible ? 'text' : 'password')
                                    : input.type
                                }
                                placeholder={input.placeholder}
                                {...register(input.name)}
                                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                                
                            />
                            {(input.name === 'password') && (
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                >
                                    {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            )}
                            {(input.name === 'confirmPassword' && confirmPasswordFocused) && (
                                <button
                                    type="button"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                >
                                    {confirmPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            )}
                            {errors[input.name] && (
                                <p className="text-red-500 text-sm mt-1">{String(errors[input.name]?.message)}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col md:space-x-4">
                    <div>
                        <ul className="list-none space-y-2 mt-4 md:mt-0">
                            {content.passwordRequirements.map((req, index) => (
                                <RequirementItem
                                    key={index}
                                    text={req}
                                    isValid={isPasswordRuleValid(req)}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2 mt-4">
                <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-primary rounded"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms" className="text-gray-600 text-xl">I accept the <a href="#" className="text-primary hover:underline">Terms and Conditions</a></label>
            </div>

            <Button
                type="submit"
                className="w-fit py-7 px-10 text-xl font-bold bg-primary hover:bg-primary/90 mt-6"
            >
                Confirm your account
            </Button>
        </form>
    );
};

export default function SignupPage() {
    const [isJobSeeker, setIsJobSeeker] = useState(true);
    const [currentStep] = useState(1);
    const router = useRouter();

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

    const totalSteps = isJobSeeker ? 5 : 4;
    const currentProgress = (currentStep / totalSteps) * 100;
    const leftContent = isJobSeeker ? jobSeekerLeftContent : employerLeftContent;
    const formContent = isJobSeeker ? createAccountContent : employerCreateAccountContent;

    return (
        <OnboardingLayout leftContent={leftContent}>
            {/* Progress bar and step indicator */}
            <div className="absolute top-12 right-12 z-10 flex flex-col items-end">
                <div className="text-sm text-gray-500 mb-2">
                    Step {currentStep} of {totalSteps} - Next: Personalization
                </div>
                <Progress value={currentProgress} className="w-48" />
            </div>
            <FormContainer content={formContent} isJobSeeker={isJobSeeker} />
        </OnboardingLayout>
    );
}