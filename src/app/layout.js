import localFont from "next/font/local";
import Header from "./components/Header";
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
      icon: "/favicon.ico", // Path to your favicon in the public folder
   },
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-custom-light-blue to-custom-dark-blue`}
         ><Header />
            {children}
         </body>
      </html>
   );
}
