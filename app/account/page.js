"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { isAuthenticated } from "../utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Camera, Mail, User, Building, Calendar, CreditCard } from "lucide-react";

export default function AccountPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        company: "Weblo Inc.",
        role: "Product Designer",
        joinDate: "January 2024",
    });

    useEffect(() => {
        // Check authentication
        if (!isAuthenticated()) {
            router.push('/signin?redirect=/account');
            return;
        }
        setIsLoading(false);
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-lg">Loading...</div>
                </div>
            </div>
        );
    }

    const handleSave = () => {
        // Save logic here
        setIsEditing(false);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <Header />

            <div className="container mx-auto px-6 py-8 max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Account Settings</h1>
                    <p className="text-muted-foreground">Manage your account information and preferences</p>
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your personal details and profile picture
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Avatar Section */}
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <Avatar className="h-24 w-24">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                                            <AvatarFallback className="text-2xl">AM</AvatarFallback>
                                        </Avatar>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                                        >
                                            <Camera className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-lg">{formData.name}</h3>
                                        <p className="text-sm text-muted-foreground">{formData.email}</p>
                                        <Badge variant="secondary" className="mt-1">Pro Plan</Badge>
                                    </div>
                                </div>

                                <Separator />

                                {/* Form Fields */}
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name" className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            Full Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="email" className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            Email Address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="company" className="flex items-center gap-2">
                                            <Building className="h-4 w-4" />
                                            Company
                                        </Label>
                                        <Input
                                            id="company"
                                            value={formData.company}
                                            onChange={(e) => handleChange('company', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="role" className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            Role
                                        </Label>
                                        <Input
                                            id="role"
                                            value={formData.role}
                                            onChange={(e) => handleChange('role', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            Member Since
                                        </Label>
                                        <Input
                                            value={formData.joinDate}
                                            disabled
                                            className="bg-muted"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    {isEditing ? (
                                        <>
                                            <Button onClick={handleSave}>Save Changes</Button>
                                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Billing Tab */}
                    <TabsContent value="billing" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Billing Information</CardTitle>
                                <CardDescription>
                                    Manage your subscription and payment methods
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Current Plan */}
                                <div className="rounded-lg border p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-lg">Pro Plan</h3>
                                            <p className="text-sm text-muted-foreground">$39/month</p>
                                        </div>
                                        <Badge>Active</Badge>
                                    </div>
                                    <Separator />
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-600">✓</span>
                                            5 websites included
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-600">✓</span>
                                            Source code export
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-600">✓</span>
                                            Priority support
                                        </li>
                                    </ul>
                                    <div className="pt-2">
                                        <Button variant="outline" className="w-full">Change Plan</Button>
                                    </div>
                                </div>

                                <Separator />

                                {/* Payment Method */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        Payment Method
                                    </h3>
                                    <div className="rounded-lg border p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-14 rounded bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-xs">
                                                VISA
                                            </div>
                                            <div>
                                                <p className="font-medium">•••• •••• •••• 4242</p>
                                                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </div>
                                    <Button variant="outline" className="w-full">Add Payment Method</Button>
                                </div>

                                <Separator />

                                {/* Billing History */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Billing History</h3>
                                    <div className="space-y-2">
                                        {[
                                            { date: "Dec 1, 2024", amount: "$39.00", status: "Paid" },
                                            { date: "Nov 1, 2024", amount: "$39.00", status: "Paid" },
                                            { date: "Oct 1, 2024", amount: "$39.00", status: "Paid" },
                                        ].map((invoice, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                                                <div>
                                                    <p className="font-medium">{invoice.date}</p>
                                                    <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Badge variant="secondary">{invoice.status}</Badge>
                                                    <Button variant="ghost" size="sm">Download</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>
                                    Manage your password and security preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Change Password</h3>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <Input id="current-password" type="password" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input id="new-password" type="password" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                                            <Input id="confirm-password" type="password" />
                                        </div>
                                    </div>
                                    <Button>Update Password</Button>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="font-semibold">Two-Factor Authentication</h3>
                                    <div className="flex items-center justify-between p-4 rounded-lg border">
                                        <div>
                                            <p className="font-medium">2FA Status</p>
                                            <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                                        </div>
                                        <Button variant="outline">Enable 2FA</Button>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-destructive">Danger Zone</h3>
                                    <div className="rounded-lg border border-destructive/50 p-4 space-y-3">
                                        <div>
                                            <p className="font-medium">Delete Account</p>
                                            <p className="text-sm text-muted-foreground">
                                                Permanently delete your account and all associated data
                                            </p>
                                        </div>
                                        <Button variant="destructive">Delete Account</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
