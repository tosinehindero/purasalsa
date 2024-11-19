import localFont from "next/font/local";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SessionProviderWrapper from "./components/SessionProviderWrapper"; // Import the new wrapper
import "./globals.css";

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
   title: "Purasalsa-MargieColon.com",
   description: "Dance Tutor",
   icons: {
      icon: "/favicon.ico",
   },
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
         >
            <SessionProviderWrapper> {/* Use the wrapper here */}
               <Header />
               {children}
               <Footer />
            </SessionProviderWrapper>
         </body>
      </html>
   );
}

