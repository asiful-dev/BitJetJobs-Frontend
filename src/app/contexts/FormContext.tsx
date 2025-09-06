"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface JobSeekerFormData {
    email: string;
    password: string;
    name: string;
    phone?: string
}

interface EmployerFormData {
    email: string;
    password: string;
    name: string;
    phone?: string;
}

interface FormState {
  isJobSeeker: boolean | null;
  data: JobSeekerFormData | EmployerFormData | null;
  profileImage: File | null;
}

interface FormContextType {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formState, setFormState] = useState<FormState>({
    isJobSeeker: null,
    data: null,
    profileImage: null,
  });

  const resetForm = () => {
    setFormState({
      isJobSeeker: null,
      data: null,
      profileImage: null,
    });
  };

  return (
    <FormContext.Provider value={{ formState, setFormState, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};