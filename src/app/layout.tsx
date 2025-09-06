import { icons } from 'lucide-react';
import './globals.css';
import { Inter, Vollkorn } from 'next/font/google';
import { Toaster } from 'sonner';
import { FormProvider } from './contexts/FormContext';

const inter = Inter({ subsets: ['latin'] });
const volkron = Vollkorn({ subsets: ['latin'] })
export const metadata = {
  title: 'BizJetJobs',
  description: 'A multi-step onboarding wizard for job seekers and employers.',
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={volkron.className}>
        <FormProvider>
          <main>
            {children}
          </main>
          <Toaster position='top-center' richColors expand={true}
            toastOptions={{
              style: { fontSize: '16px', padding: "16px" }
            }}
          />
        </FormProvider>
      </body>
    </html>
  );
}
