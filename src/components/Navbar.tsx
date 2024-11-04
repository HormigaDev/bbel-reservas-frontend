"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { companionName } from "@/app.data.json";
import { usePathname } from "next/navigation";
import SessionService from "@/services/sessionService";
import makeStyles from "@/utils/MakeStyles";

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const authenticated = SessionService.isAuthenticated();
    const options: { label: string; path: string }[] = [
        { label: "Inicio", path: "/" },
        { label: "Reservar mesa", path: "/reserve" },
        { label: "Menú", path: "/menu" },
        { label: "Contacto", path: "/contact" },
        { label: authenticated ? "Mi cuenta" : "Entrar", path: "/myaccount" },
    ];
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`transition-colors duration-300 ease-in-out p-4 fixed top-0 w-full z-10 ${
                isScrolled ? "bg-burgundy shadow-lg" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-champagne text-2xl font-bold">
                    <Link href="/">{companionName}</Link>
                </div>
                <ul className="flex space-x-10">
                    {options.map((option, key) => {
                        const isActive = {
                            condition: pathname === option.path,
                            onTrue: "font-bold text-gold",
                            onFalse: "",
                        };
                        return (
                            <li key={key}>
                                <Link
                                    href={option.path}
                                    className={makeStyles([
                                        "text-champagne",
                                        "hover:text-gold",
                                        "transition-colors",
                                        "duration-200",
                                        "ease-in-out",
                                        isActive,
                                    ])}
                                >
                                    {option.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
