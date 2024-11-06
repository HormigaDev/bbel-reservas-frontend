import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Teste",
    description: "Restaurante para cenas reservadas",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-gradient-to-b from-greydark to-greygrey h-screen">
                <Navbar />
                <div className="w-full h-screen fixed top-0 left-0 z-[-10]">
                    <Image
                        src="/images/restaurant.jpg"
                        alt="Restaurant background"
                        fill
                        className="w-full"
                    />
                </div>
                {children}
            </body>
        </html>
    );
}
