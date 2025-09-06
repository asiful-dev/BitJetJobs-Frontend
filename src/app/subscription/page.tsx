"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Dot } from 'lucide-react';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';

// A simple utility to merge class names
const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

// Dummy components for shadcn to make the file self-contained
const Button = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<'button'> & { asChild?: boolean }
>(({ asChild, className, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "w-full py-6 text-lg font-bold bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors",
                className
            )}
            {...props}
        />
    );
});
Button.displayName = 'Button';

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("rounded-xl border bg-card text-card-foreground shadow", className)} {...props} />
);
const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);
const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
);
const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);
const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("p-6 pt-0", className)} {...props} />
);
const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);

const Progress = ({ value, className }: { value: number, className?: string }) => (
    <div className={cn("w-full h-2 bg-gray-200 rounded-full overflow-hidden", className)}>
        <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${value}%` }}
        />
    </div>
);

// Data for left side content based on user role
const jobSeekerLeftContent = {
    mainTitle: "Start Your Aviation Career Today",
    bulletPoints: [
        "Exclusive Job Listings",
        "Verified Employers",
        "Easy Application Process",
        "Tailored Job Alerts",
    ],
};

const employerLeftContent = {
    mainTitle: "Find Top Aviation Talent",
    description: "We lost one of our long-time pilots to the airlines recently. I engaged Bizjetjobs.com to help me find a replacement pilot. BJJ did a fantastic job of finding qualified candidates with the right hours and technical skills and more importantly a candidate that fit our organization and culture",
    author:"Breck Collingsworth",
    company:"RLC Aviation"
};

const plans = [
    {
        name: 'Monthly',
        price: '$350',
        frequency: 'No commitment',
        description: 'Perfect for businesses with occasional hiring needs. Post jobs and connect with aviation talent on your schedule.',
        features: [
            'Flexible Commitment',
            'Unlimited Job Posts',
            'Basic Support'
        ],
        isHighlighted: false,
        link: '#',
        id: 'monthly'
    },
    {
        name: 'Annual',
        price: '$3,000',
        frequency: '$250/mth',
        description: 'Ideal for companies with ongoing hiring needs. Save with an annual plan and enjoy extra perks.',
        features: [
            'Save 29%',
            'Unlimited Job Posts',
            'Priority Support'
        ],
        isHighlighted: true,
        link: '#',
        id: 'annual'
    },
    {
        name: 'No Hassle Recruitment',
        price: 'Customized Pricing to Meet Your Needs',
        description: 'We\'ll Do the Work for You',
        features: [
            'Full-service candidate sourcing',
            'Dedicated account manager',
            'Customized recruitment strategy'
        ],
        isHighlighted: false,
        link: '#',
        id: 'custom'
    },
];

const quotes = [
    {
        text: "We lost one of our long-time pilots to the airlines recently. I engaged Bizjetjobs.com to help me find a replacement pilot. BJJ did a fantastic job of finding qualified candidates with the right hours and technical skills and more importantly a candidate that fit our organization and culture.",
        author: "Breck Collingsworth",
        company: "RLC Aviation"
    }
];

// OnboardingLayout component defined as a self-contained function


// The main page component that is the default export
export default function SubscriptionsPage() {
    const [userRole, setUserRole] = useState('employer'); // Example state, can be from context or localStorage

    // A check to grab the user role from localStorage
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedRole = localStorage.getItem('user_role');
            if (storedRole) {
                setUserRole(storedRole);
            }
        }
    }, []);

    const leftContent = userRole === 'job_seeker' ? jobSeekerLeftContent : employerLeftContent;

    return (
        <OnboardingLayout leftContent={leftContent}>
            <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
                <div className="absolute top-12 right-12 z-10 flex flex-col items-end">
                    <div className="text-sm text-gray-500 mb-2">Step 4 of 4 - Next: Post confidentially</div>
                    <Progress value={100} className="w-48" />
                </div>
                <div className="flex justify-between items-center mb-8 w-full">
                    <Image src="/logo.svg" alt="logo" width={200} height={40} />

                </div>

                <div className="flex flex-col mt-3 w-full items-center">
                    <div className="text-xl text-gray-500 font-semibold uppercase">Sign up</div>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tighter my-2">
                        Choose your plan
                    </h1>
                    <p className="text-gray-500 mb-6 flex gap-3">
                        <span className='font-bold hover:underline'>
                            <Link href={"#"}>I'll do this later.</Link>
                        </span>
                    </p>
                    <div className="flex items-center space-x-2 mb-8 text-gray-500">
                        <Dot />
                        <p>95% of employers find a candidate in less than 10 days.</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
                    {plans.map((plan) => (
                        <Card
                            key={plan.id}
                            className={cn(
                                "relative w-full flex-1 p-6 md:p-8 rounded-xl shadow-lg border-2",
                                plan.isHighlighted ? "border-blue-600 ring-4 ring-blue-200" : "border-gray-200"
                            )}
                        >
                            {plan.isHighlighted && (
                                <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full transform rotate-12">
                                    Best Value
                                </div>
                            )}
                            <CardHeader className="p-0 mb-4">
                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                <CardDescription className="text-gray-500">
                                    {plan.frequency && <span className="font-semibold text-lg">{plan.price}</span>}
                                    {plan.frequency && <span className="text-sm text-gray-500"> {plan.frequency}</span>}
                                    {!plan.frequency && <span className="font-semibold text-lg">{plan.price}</span>}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                                <ul className="space-y-2 mb-6">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <Check className="h-4 w-4 mr-2 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="p-0">
                                {plan.id !== 'custom' ? (
                                    <Button
                                        asChild
                                        className="w-full text-white py-6 text-lg font-bold bg-primary hover:bg-primary/90 rounded-xl transition-colors"
                                    >
                                        <Link href={plan.link}>Get Started</Link>
                                    </Button>
                                ) : (
                                    <div className="flex flex-col w-full space-y-2">
                                        <Button
                                            asChild
                                            className="text-white w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 rounded-xl transition-colors"
                                        >
                                            <Link href={plan.link}>Call (402) 253-7809</Link>
                                        </Button>
                                        <Button
                                            asChild
                                            className="w-full text-white bg-primary hover:bg-primary/90 py-6 text-lg font-bold rounded-xl transition-colors"
                                        >
                                            <Link href={plan.link}>Chat</Link>
                                        </Button>
                                    </div>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                
            </div>
        </OnboardingLayout>
    );
}
