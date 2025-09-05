import { icons } from 'lucide-react';
import './globals.css';
import { Inter, Vollkorn } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const volkron = Vollkorn({ subsets: ['latin'] })
export const metadata = {
  title: 'BizJetJobs Onboarding',
  description: 'A multi-step onboarding wizard for job seekers and employers.',
  icons:{
    icon:"/favicon.svg"
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
        {children}
      </body>
    </html>
  );
}
