"use client";
import Link from "next/link";
import React from "react";
import { companionName } from "@/app.data.json";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const options: { label: string; path: string }[] = [
        { label: "Inicio", path: "/" },
        { label: "Reservar mesa", path: "/reserve" },
        { label: "Menú", path: "/menu" },
        { label: "Mi cuenta", path: "/myaccount" },
        { label: "Contacto", path: "/contact" },
    ];

    return (
        <nav className="bg-burgundy p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-champagne text-2xl font-bold">
                    <Link href="/">{companionName}</Link>
                </div>
                <ul className="flex space-x-10">
                    {options.map((option, key) => (
                        <li key={key}>
                            <Link
                                href={option.path}
                                className={`text-champagne hover:text-goldy ${
                                    pathname === option.path ? "font-bold" : ""
                                }`}
                            >
                                {option.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
