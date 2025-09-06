"use client"

import { CircleCheckBig } from "lucide-react";

interface LeftContent {
    mainTitle: string;
    description?: string;
    bulletPoints?: string[],
    author?: string,
    company?: string

}
interface OnboardingLayoutProps {
    leftContent: LeftContent;
    children: React.ReactNode;
}

export function OnboardingLayout({ leftContent, children }: OnboardingLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col-reverse md:flex-row bg-white relative ">
            {/* Left fixed section  */}
            <div className="w-full h-96 md:h-screen md:w-1/3 lg:w-[30%]  md:flex-shrink-0 bg-primary text-white flex flex-col items-center justify-center p-8 md:p-12  md:sticky md:top-0">
                <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-2 leading-tight">
                    {leftContent.mainTitle}
                </h1>

                {
                    leftContent.description && <p className="text-gray-300 mt-4 text-xl font-semibold">
                        {leftContent.description}
                    </p>
                }
                {
                    leftContent.bulletPoints && <ul>
                        {
                            leftContent.bulletPoints?.map((item) => <li key={item} className="flex gap-3 mt-3 text-xl ">
                                <CircleCheckBig className="text-green-500" /> {item}
                            </li>)
                        }
                    </ul>
                }
                {
                    leftContent.author && <h1 className="text-xl my-3">{leftContent.author}</h1>
                }
                {
                    leftContent.company && <h1 className="text-xl">{leftContent.company}</h1>
                }
            </div>
            {/* Right dynamic section */}
            <div className="flex-grow p-8 md:p-12  bg-white">
                {children}
            </div>
        </div>
    )
}