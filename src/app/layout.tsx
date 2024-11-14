import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
    title: 'Teste',
    description: 'Restaurante para cenas reservadas',
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
                <div
                    className="w-full h-screen fixed top-0 left-0 z-[-10] bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url(/images/restaurant.jpg)' }}
                ></div>
                {children}
            </body>
        </html>
    );
}
