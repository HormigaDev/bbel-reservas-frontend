import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
                {children}
            </body>
        </html>
    );
}
