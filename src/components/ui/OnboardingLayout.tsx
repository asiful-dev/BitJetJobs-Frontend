"use client"

interface LeftContent {
    mainTitle: string;
    description: string;
}
interface OnboardingLayoutProps {
    leftContent: LeftContent;
    children: React.ReactNode;
}

export function OnboardingLayout({ leftContent, children }: OnboardingLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col-reverse md:flex-row bg-white relative ">
            {/* Left fixed section  */}
            <div className="w-full h-96 md:h-screen md:w-1/3 lg:w-2/5  md:flex-shrink-0 bg-primary text-white flex flex-col items-center justify-center p-8 md:p-12  md:sticky md:top-0">
                <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-2 leading-tight">
                    {leftContent.mainTitle}
                </h1>
                <p className="text-gray-300 mt-4 text-xl font-semibold">
                    {leftContent.description}
                </p>
            </div>
            {/* Right dynamic section */}
            <div className="flex-grow p-8 md:p-12  bg-white">
                {children}
            </div>
        </div>
    )
}