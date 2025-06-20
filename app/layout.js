import localFont from "next/font/local";
import "./globals.css";
import{Outfit} from 'next/font/google';
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "AI PDF Note Taker",
  description: "Transform your PDF reading experience with AI-powered summaries. Save time, boost productivity, and focus on what truly matters.",
};

const outfit =Outfit({subsets:['latin']});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
       <Provider>
        {children}
        </Provider>
        <Toaster/> 
      </body>
    </html>
    </ClerkProvider>
  );
}
