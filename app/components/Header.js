"use client";


import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuthenticated, AUTH_EVENT, logout } from "../utils/auth";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Initial check
        setIsLoggedIn(isAuthenticated());

        // Listen for changes
        const handleAuthChange = () => {
            setIsLoggedIn(isAuthenticated());
        };

        window.addEventListener(AUTH_EVENT, handleAuthChange);

        return () => {
            window.removeEventListener(AUTH_EVENT, handleAuthChange);
        };
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        // Optional: Redirect to home or refresh
        window.location.href = "/";
    };

    return (
        <header className="border-b py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold tracking-tight">
                    <img src="/Assets/img/logo.svg" alt="Logo" className="h-8" />
                </Link>

                {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-muted-foreground">
                            Dashboard
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>MM</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link href="/account">Account Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">Sign out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <Button asChild size="sm">
                        <Link href="/signin">
                            Sign In
                        </Link>
                    </Button>
                )}
            </div>
        </header>
    );
}
