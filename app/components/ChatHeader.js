"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatHeader({ projectName = "SweetCrust" }) {
    const router = useRouter();

    const handleBack = () => {
        router.push("/dashboard");
    };

    return (
        <header className="border-b bg-background sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBack}
                        className="h-8 w-8"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-lg font-semibold tracking-tight">{projectName}</h1>
                </div>

                <div className="flex items-center gap-9">
                    <div className="canvas-header-button-group">
                        <div className="browser-code-view">
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="#333" stroke-width="1" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-code">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M7 8l-4 4l4 4" />
                                    <path d="M17 8l4 4l-4 4" />
                                    <path d="M14 4l-4 16" />
                                </svg>
                            </a>
                        </div>
                        <div class="browser-code-view">
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-message-circle">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path
                                        d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
                                </svg>
                            </a>
                        </div>

                        <div class="browser-bar">../</div>

                        <div class="browser-code-view">
                            <a href="#">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.25 6H3.75C2.92157 6 2.25 6.67157 2.25 7.5V15C2.25 15.8284 2.92157 16.5 3.75 16.5H8.25C9.07843 16.5 9.75 15.8284 9.75 15V7.5C9.75 6.67157 9.07843 6 8.25 6Z"
                                        stroke="#252525" stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M3.75 3C3.75 2.60218 3.90804 2.22064 4.18934 1.93934C4.47064 1.65804 4.85218 1.5 5.25 1.5H14.25C14.6478 1.5 15.0294 1.65804 15.3107 1.93934C15.592 2.22064 15.75 2.60218 15.75 3V15C15.75 15.3978 15.592 15.7794 15.3107 16.0607C15.0294 16.342 14.6478 16.5 14.25 16.5H12.45"
                                        stroke="#252525" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6 13.5H6.0075" stroke="#252525" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </a>
                        </div>
                        <div>
                            <a href="#" class="btn-text btn-prompt-builder">Save Code</a>
                        </div>
                    </div>

                </div>


            </div>
        </header>
    );
}
