"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Circle, CircleCheckBigIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormContext } from "../contexts/FormContext";

// Zod schemas for validation
const jobSeekerSchema = z.object({
    roles: z.string().min(1, "Please select a role."),
    workTypes: z.array(z.string()).min(1, "Please select at least one work type."),
});

const employerSchema = z.object({
    positionsPerMonth: z.string().min(1, "Please select an option."),
    rolesToFill: z.array(z.string()).min(1, "Please select at least one role to fill."),
});

// Define types for form data
type JobSeekerFormValues = z.infer<typeof jobSeekerSchema>;
type EmployerFormValues = z.infer<typeof employerSchema>;

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

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ leftContent, children }) => {
    return (
        <div className="min-h-screen flex flex-col-reverse md:flex-row bg-white relative font-sans">
            {/* Left fixed section */}
            <div className="w-full h-96 md:h-screen md:w-1/3 lg:w-2/5 md:flex-shrink-0 bg-primary text-white flex flex-col items-center justify-center p-8 md:p-12 md:sticky md:top-0">
                <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-2 leading-tight">
                    {leftContent.mainTitle}
                </h1>
                {leftContent.description && (
                    <p className="text-gray-300 mt-4 text-xl font-semibold">
                        {leftContent.description}
                    </p>
                )}
                {leftContent.bulletPoints && (
                    <ul className="list-none space-y-2">
                        {leftContent.bulletPoints.map((item) => (
                            <li key={item} className="flex gap-3 mt-3 text-xl items-center">
                                <CircleCheckBigIcon className="text-green-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
                {leftContent.author && <h1 className="text-xl">{leftContent.author}</h1>}
                {leftContent.company && <h1 className="text-xl">{leftContent.company}</h1>}
            </div>
            {/* Right dynamic section */}
            <div className="flex-grow p-8 md:p-12 bg-white flex justify-center items-center">
                {children}
            </div>
        </div>
    );
};

// Data for left side content based on user role
const jobSeekerLeftContent: LeftContent = {
    mainTitle: "Built for ease.",
    bulletPoints: [
        "Receive job alerts tailored to your preferences",
        "Easily apply to jobs with a few clicks",
        "Stand out to employers with a complete profile",
    ],
};

const employerLeftContent: LeftContent = {
    mainTitle: "Plan Benefits",
    bulletPoints: [
        "Post jobs in minutes",
        "Easily manage applications",
        "Receive alerts for top candidates",
    ],
};

// Form content for the 'Personalize' step
const jobSeekerFormContent = {
    title: "Personalize your experience",
    roles: ["Pilot", "Flight Attendant", "Aviation Manager"],
    workTypes: ["Full-Time", "Part-Time", "Contract"],
};

const employerFormContent = {
    title: "Personalize your experience",
    positionsPerMonth: ["1-5", "5-10", "10+"],
    rolesToFill: ["Full-time Pilots", "Contract Pilots", "Flight Attendants", "Aviation Managers"],
};

// A reusable component for the form itself
const FormContainer = ({ content, isJobSeeker }: { content: any, isJobSeeker: boolean }) => {
    const router = useRouter();
    const { formState, setFormState } = useFormContext(); // Use the FormContext
    const schema = isJobSeeker ? jobSeekerSchema : employerSchema;
    const form = useForm<JobSeekerFormValues | EmployerFormValues>({
        resolver: zodResolver(schema),
        defaultValues: isJobSeeker ? { roles: "", workTypes: [] } as JobSeekerFormValues : { positionsPerMonth: "", rolesToFill: [] } as EmployerFormValues,
    });

    const onSubmit = (data: any) => {
        console.log("Form data submitted:", data);
        // Update the formState with the new data
        setFormState((prevState) => ({
            ...prevState,
            data: { ...prevState.data, ...data },
        }));
        router.push('/image-upload');
    };

    useEffect(() => {
        // Set default values from context on component load
        if (formState.data) {
            form.reset(formState.data);
        }
    }, [formState.data, form]);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 max-w-lg mx-auto md:max-w-none w-full">
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

                {isJobSeeker ? (
                    <>
                        {/* Job Seeker form fields */}
                        <FormField
                            control={form.control}
                            name="roles"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-bold">What types of roles are you looking for?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-96 p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-16">
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {content.roles.map((option: string) => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="workTypes"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-xl font-bold">Preferred Work Type</FormLabel>
                                    </div>
                                    {content.workTypes.map((item: string) => (
                                        <FormField
                                            key={item}
                                            control={form.control}
                                            name="workTypes"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item
                                                                            )
                                                                        );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-lg">
                                                            {item}
                                                        </FormLabel>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-fit py-7 px-10 text-xl font-bold bg-primary hover:bg-primary/90 mt-6"
                        >
                            Continue to Photo
                        </Button>
                    </>
                ) : (
                    <>
                        {/* Employer form fields */}
                        <FormField
                            control={form.control}
                            name="positionsPerMonth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-bold">How many positions do you typically post each month?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-16">
                                                <SelectValue placeholder="Posts per month" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {content.positionsPerMonth.map((option: string) => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rolesToFill"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-xl font-bold">What types of roles are you looking to fill?</FormLabel>
                                    </div>
                                    {content.rolesToFill.map((item: string) => (
                                        <FormField
                                            key={item}
                                            control={form.control}
                                            name="rolesToFill"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item
                                                                            )
                                                                        );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-lg">
                                                            {item}
                                                        </FormLabel>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-fit py-7 px-10 text-xl font-bold bg-primary hover:bg-primary/90 mt-6"
                        >
                            <Link href="/image-upload">Continue to Company Photo</Link>
                        </Button>
                    </>
                )}
            </form>
        </Form>
    );
};

export default function PersonalizePage() {
    const [isJobSeeker, setIsJobSeeker] = useState<boolean>(true);
    const [currentStep] = useState<number>(2);

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
    const formContent = isJobSeeker ? jobSeekerFormContent : employerFormContent;

    return (
        <OnboardingLayout leftContent={leftContent}>
            {/* Progress bar and step indicator */}
            <div className="absolute top-12 right-12 z-10 flex flex-col items-end">
                <div className="text-sm text-gray-500 mb-2">
                    Step {currentStep} of {totalSteps} - Next: {isJobSeeker ? "Aircraft Experience" : "Company Photo"}
                </div>
                <Progress value={currentProgress} className="w-48" />
            </div>
            <FormContainer content={formContent} isJobSeeker={isJobSeeker} />
        </OnboardingLayout>
    );
}