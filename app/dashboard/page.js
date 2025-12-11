"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadData } from "../utils/wizardData";
import { isAuthenticated } from "../utils/auth";
import Header from "../components/Header";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
    const router = useRouter();
    const [recentProject, setRecentProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check authentication
        if (!isAuthenticated()) {
            router.push('/signin?redirect=/dashboard');
            return;
        }

        setIsLoading(false);
        const data = loadData();
        if (data.businessName && data.plan) {
            setRecentProject(data);
        }
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

    return (
        <>
            <Header />

            <div className="container dashboard-container">
                {/* Toolbar */}
                <div className="dashboard-toolbar">
                    <h1 className="dashboard-welcome">Hello, Alex</h1>
                    <div className="dashboard-actions">
                        <div className="search-wrapper">
                            <svg
                                className="search-icon"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input type="text" className="search-input" placeholder="Search" />
                        </div>
                        <Link href="/wizard" className="btn btn-dark btn-sm">
                            Create New Site
                        </Link>
                    </div>
                </div>

                <div className="dashboard-grid" id="websiteGrid">
                    {/* Recent Project (Dynamic) */}
                    {recentProject && (
                        <div className="project-card">
                            <div className="project-preview" style={{ backgroundColor: "#e0f7fa" }}></div>
                            <div className="project-info">
                                <div className="project-title">{recentProject.businessName}</div>
                                <div className="project-meta">
                                    <span>Just Created</span>
                                    <span><DropdownMenu>
                                        <DropdownMenuTrigger className="eclipse-dot">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Archive</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu></span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Example: Completed Site */}
                    <div className="project-card">
                        <div className="project-preview"></div>
                        <div className="project-info">
                            <div className="project-title">SweetCrust</div>
                            <div className="project-meta">
                                <span>Completed</span>
                                <span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="eclipse-dot">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Archive</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Example: Error Site */}
                    <div className="project-card">
                        <div className="project-preview"></div>
                        <div className="project-info">
                            <div className="project-title">Rockify</div>
                            <div className="project-meta">
                                <span>Error</span>
                                <span><DropdownMenu>
                                    <DropdownMenuTrigger className="eclipse-dot">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Archive</DropdownMenuItem>
                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu></span>
                            </div>
                        </div>
                    </div>

                    {/* Example: In Progress Site */}
                    <div className="project-card">
                        <div className="project-preview"></div>
                        <div className="project-info">
                            <div className="project-title">Fast Food Restaurant</div>
                            <div className="project-meta">
                                <span>In Progress</span>
                                <span><DropdownMenu>
                                    <DropdownMenuTrigger className="eclipse-dot">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Archive</DropdownMenuItem>
                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
