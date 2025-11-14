import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//  整个网站的meta信息，动态的可以在各个页面单独设置覆盖
export const metadata: Metadata = {
  title:{
    default: "Lauren's Next.js Blog",
    template: "%s | Lauren's Next.js",
  },
  description: "Welcome to Lauren's Next.js Blog - Your go-to source for tech insights, tutorials, and the latest trends in web development.",
  }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* this container is softblack background set in globals.css */}
        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
