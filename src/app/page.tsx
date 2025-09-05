"use client";

import { useState } from 'react';
import Image from "next/image";
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Data interfaces
interface RightSideContent {
  title: string;
  subtitle: string;
  bulletPoints: { title: string; description: string }[];
  buttonText: string;
}

// Data for the Job Seeker view
const jobSeekerContent: RightSideContent = {
  title: "Ready to Land Your Dream Job in Aviation?",
  subtitle: "Take your aviation career to new heights with exclusive, verified job opportunities.",
  bulletPoints: [
    {
      title: "Exclusive Listings",
      description: "Manually-validated jobs from over 500 qualified employers.",
    },
    {
      title: "Easy Application Process",
      description: "Apply directly with a streamlined process.",
    },
    {
      title: "Connect with Leading Employers",
      description: "Build direct relationships through our flight department directory.",
    },
  ],
  buttonText: "Get Started",
};

// Data for the Employer view
const employerContent: RightSideContent = {
  title: "Find Top Aviation Talent for Your Business",
  subtitle: "Reach pre-screened aviation professionals and streamline your hiring process.",
  bulletPoints: [
    {
      title: "Targeted Aviation Candidates",
      description: "Access to the largest pool of industry-specific talent.",
    },
    {
      title: "Efficient Hiring Tools",
      description: "Manage applications with ease and save time.",
    },
    {
      title: "Flexible Plans for All Needs",
      description: "Choose a plan that fits your hiring goals.",
    },
  ],
  buttonText: "Get Started",
};

// Content for the left hero section
const leftHeroContent = {
  mainTitle: "Welcome to BizJetJobs. Where Talent and Opportunity Meet.",
  description: "Whether you're here to hire or to find your next role, let's get started.",
};

const RightSide = ({ content, onSwitchView, isJobSeeker }: { content: RightSideContent; onSwitchView: (e: React.MouseEvent<HTMLAnchorElement>) => void; isJobSeeker: boolean }) => {
  return (
    <div className="flex flex-col space-y-8 max-w-lg mx-auto md:max-w-none">
      {/* Top header with logo and links */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex-shrink-0">
          <Image
            src={"/logo.svg"} // Make sure this file exists in your public folder
            alt="BizJetJobs Logo"
            width={200}
            height={40}
            priority
          />
        </div>
        {/* Dynamically render header links based on the view */}
        <div className='flex flex-col gap-y-2 md:flex-row '>
          {isJobSeeker ? (
            <span className="text-sm md:text-xl font-semibold text-gray-700 flex flex-col gap-1 md:flex-row">
              Employer? <Link href="#" className="text-primary hover:underline" onClick={onSwitchView}>Sign up here</Link>
            </span>
          ) : (
            <span className="text-sm md:text-xl font-semibold text-gray-700 flex flex-col gap-y-2 md:flex-row">
              Job Seeker? <Link href="#" className="text-primary hover:underline" onClick={onSwitchView}>Sign up here</Link>
            </span>
          )}
        </div>
      </div>

      {/* Main content section */}
      <div className="flex flex-col mt-5">
        <div className="text-xl  font-semibold uppercase">Sign up</div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tighter my-2">
          {content.title}
        </h1>
        <div className="flex flex-col space-y-4">
          <p className="text-xl font-bold text-gray-600">Already a member? <Link href="#" className="text-primary hover:underline">Log in</Link></p>
          <p className="text-2xl text-gray-600">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* Bullet points section */}
      <ul className="list-none space-y-6 text-gray-700 mt-6">
        {content.bulletPoints.map((point, index) => (
          <li key={index} className="flex flex-col">
            <span className="flex items-center font-bold mb-1 text-xl">
              {point.title}
            </span>
            <p className=" text-gray-500 text-lg">
              {point.description}
            </p>
          </li>
        ))}
      </ul>

      <div className='flex flex-col gap-y-2'>
        {/* Button */}
        <Button className="w-48 mt-8 p-7  text-xl font-bold bg-primary hover:bg-primary/90 rounded-lg shadow-md">
          {content.buttonText}
        </Button>

        {/* Price text */}
        <p className="text-xl text-gray-500">
          Starting at <span className='font-bold'>$10.75</span> a month with an annual subscription
        </p>
      </div>
    </div>
  );
};

export default function Home() {
  // State is now managed here in the parent component
  const [isJobSeeker, setIsJobSeeker] = useState(true);

  const handleSwitchView = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevents the page from reloading
    setIsJobSeeker(!isJobSeeker);
  };

  return (
    <OnboardingLayout leftContent={leftHeroContent}>
      <RightSide
        content={isJobSeeker ? jobSeekerContent : employerContent}
        onSwitchView={handleSwitchView}
        isJobSeeker={isJobSeeker}
      />
    </OnboardingLayout>
  );
}
