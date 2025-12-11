"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { login } from "../utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

function SignInContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({

        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Simulate login
            login(formData.email);

            // Check for redirect URL
            const redirectUrl = searchParams.get("redirect") || "/dashboard";
            router.push(redirectUrl);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <Link href="/" className="inline-block mb-4">
                        <img src="/Assets/img/logo.svg" alt="Logo" className="h-8 mx-auto" />
                    </Link>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                className={errors.password ? "border-destructive" : ""}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start space-x-2">
                            <Checkbox
                                id="terms"
                                checked={formData.agreeToTerms}
                                onCheckedChange={(checked) => handleChange('agreeToTerms', checked)}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember Me
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" type="button">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" type="button">
                            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </Button>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/signup" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div>Loading...</div></div>}>
            <SignInContent />
        </Suspense>
    );
}
// "use client";

// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState, Suspense } from "react";
// import { login } from "../utils/auth";

// function SignInContent() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [email, setEmail] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Simulate login
//         login(email);

//         // Redirect logic
//         const redirectUrl = searchParams.get("redirect") || "/dashboard";
//         router.push(redirectUrl);
//     };

//     return (
//         <div className="auth-split-layout">
//             <div className="auth-left">
//                 <div className="auth-logo">
//                     <Link href="/">
//                         <img src="/Assets/img/logo.svg" alt="Logo" />
//                     </Link>
//                 </div>
//                 {/* Image Placeholder */}
//             </div>
//             <div className="auth-right">
//                 <div className="auth-container">
//                     <h1 className="auth-title">Welcome back</h1>
//                     <p className="auth-subtitle">Enter your details to access your account</p>

//                     <form className="auth-form" onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label htmlFor="email" className="form-label">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 className="form-control"
//                                 placeholder="name@example.com"
//                                 required
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="password" className="form-label">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 className="form-control"
//                                 placeholder="Enter your password"
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <input type="checkbox" id="remember" className="form-check-input" />
//                             <label htmlFor="remember" className="form-check-label" style={{ marginLeft: "8px" }}>
//                                 Remember me
//                             </label>
//                         </div>
//                         <div className="form-group">
//                             <button type="submit" className="btn btn-dark btn-block">
//                                 Sign In
//                             </button>
//                         </div>
//                         <p className="auth-footer">
//                             Don't have an account?{" "}
//                             <Link href="/signup" className="auth-link">
//                                 Sign up
//                             </Link>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default function SignIn() {
//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <SignInContent />
//         </Suspense>
//     );
// }
