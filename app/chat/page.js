"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loadData } from "../utils/wizardData";
import { isAuthenticated } from "../utils/auth";
import { loadPaymentStatus } from "../utils/wizardData"; // Assuming we might move this or just use searchParams

import Header from "../components/Header";
import ChatHeader from "../components/ChatHeader";

function ChatContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [prompt, setPrompt] = useState("");
    const [stage, setStage] = useState("impl_plan");
    const [expandedAccordion, setExpandedAccordion] = useState("impl_plan");
    const [simulationSteps, setSimulationSteps] = useState([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [projectName, setProjectName] = useState("SweetCrust");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    // States for canvas visibility
    const [visibleCanvasSections, setVisibleCanvasSections] = useState({
        nav: false,
        hero: false,
        grid: false,
        form: false,
        theme: false,
    });

    useEffect(() => {
        // Check if user is logged in
        setIsUserLoggedIn(isAuthenticated());

        const storedPrompt = localStorage.getItem("weblo_prompt");
        if (storedPrompt) {
            setPrompt(storedPrompt);
            // Extract project name from prompt (simple extraction)
            const nameMatch = storedPrompt.match(/called\s+([A-Za-z0-9\s]+)/i);
            if (nameMatch && nameMatch[1]) {
                setProjectName(nameMatch[1].trim());
            }
            localStorage.removeItem("weblo_prompt");
        } else {
            // Fallback prompt if none
            if (!prompt) {
                setPrompt(
                    "Create a website for my bakery called SweetCrust..."
                );
            }
        }

        if (searchParams.get("status") === "paid") {
            setStage("simulation");
            setExpandedAccordion("progress");
            startSimulation();
        }
    }, [searchParams]);

    const toggleAccordion = (id) => {
        setExpandedAccordion(expandedAccordion === id ? null : id);
    };

    const handleConfirmImpl = () => {
        setStage("select_plan");
        setExpandedAccordion("select_plan");
    };

    const handleSelectPlan = (planType) => {
        if (isAuthenticated()) {
            router.push(`/payment?plan=${planType}`);
        } else {
            router.push(`/signin?redirect=/payment?plan=${planType}`);
        }
    };

    const startSimulation = async () => {
        setIsSimulating(true);
        const steps = [1, 2, 3, 4, 5, 6];

        for (const stepId of steps) {
            setSimulationSteps((prev) => [...prev, stepId]);

            if (stepId === 1) setVisibleCanvasSections((p) => ({ ...p, nav: true }));
            if (stepId === 2) setVisibleCanvasSections((p) => ({ ...p, nav: true, hero: true }));
            if (stepId === 3) setVisibleCanvasSections((p) => ({ ...p, grid: true }));
            if (stepId === 4) setVisibleCanvasSections((p) => ({ ...p, form: true }));
            if (stepId === 6) setVisibleCanvasSections((p) => ({ ...p, theme: true }));

            await new Promise((r) => setTimeout(r, 1500));
        }

        setIsSimulating(false);
        setShowSuccess(true);
    };

    return (
        <>
            {isUserLoggedIn ? <ChatHeader projectName={projectName} /> : <Header />}

            <div className="chat-layout">
                <div className="chat-panel-left">
                    <div className="chat-history">
                        <div className="chat-message-user">{prompt || "Create a website for my bakery called SweetCrust..."}</div>

                        <div className="chat-message-system" style={{ marginTop: "24px", animation: "fadeIn 0.5s ease-out" }}>
                            <div className="plans-list">
                                <div className="plan-item-single accepted" style={{ marginBottom: "16px" }}>
                                    <div className="plan-header-single">
                                        <div className="plan-header-title">What the System Understands & Extracts</div>
                                    </div>
                                </div>

                                <AccordionItem
                                    id="impl_plan"
                                    title={stage === "impl_plan" ? "Implementation Plan" : "Implementation plan accepted"}
                                    expanded={expandedAccordion === "impl_plan"}
                                    accepted={stage !== "impl_plan"}
                                    onToggle={() => toggleAccordion("impl_plan")}
                                >
                                    <ImplementationPlanContent />
                                </AccordionItem>

                                {stage !== "impl_plan" && searchParams.get("status") !== "paid" && (
                                    <AccordionItem
                                        id="select_plan"
                                        title="Select a Plan"
                                        expanded={expandedAccordion === "select_plan"}
                                        onToggle={() => toggleAccordion("select_plan")}
                                    >
                                        <PlanSelectionContent onSelect={handleSelectPlan} />
                                    </AccordionItem>
                                )}

                                {searchParams.get("status") === "paid" && (
                                    <div className="plan-item-single accepted" style={{ marginBottom: "16px" }}>
                                        <div className="plan-header-single">
                                            <div className="plan-header-title">Payment Completed</div>
                                        </div>
                                    </div>
                                )}

                                {searchParams.get("status") === "paid" && (
                                    <AccordionItem
                                        id="progress"
                                        title="Progress"
                                        expanded={expandedAccordion === "progress"}
                                        accepted={!isSimulating && showSuccess}
                                        onToggle={() => toggleAccordion("progress")}
                                    >
                                        <ProgressContent currentSteps={simulationSteps} isFinished={!isSimulating && showSuccess} />
                                    </AccordionItem>
                                )}
                            </div>

                            {showSuccess && (
                                <div className="chat-message-system" id="success-message" style={{ marginTop: "24px", animation: "fadeIn 0.5s ease-out" }}>
                                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>🎉 Your Website Is Ready, SweetCrust!</div>
                                    <div style={{ fontSize: "14px", color: "#444", lineHeight: "1.5", marginBottom: "12px" }}>
                                        Weblo AI has clarified your brand, filled details, optimized structure, and built a friendly bakery website for families and office workers.
                                        <br /><br />
                                        SweetCrust now has a complete, user-friendly online presence that helps customers explore pastries and place custom cake orders effortlessly.
                                        <br /><br />
                                        Want to refine anything? Just tell me what you’d like to adjust next
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {stage === "impl_plan" && (
                        <div className="chat-confirm-wrapper">
                            <div className="confirm-text">Do you like it?</div>
                            <div className="confirm-actions">
                                <button className="btn btn-dark" onClick={handleConfirmImpl}>Confirm</button>
                                <button className="btn btn-light-gray">Have doubts</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="chat-panel-right">
                    <CanvasSimulation visibleSections={visibleCanvasSections} />
                </div>
            </div>
        </>
    );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChatContent />
        </Suspense>
    );
}

// ... Reuse existing sub-components (AccordionItem, etc) ...
// We need to re-declare them since write_to_file overwrites fully

function AccordionItem({ id, title, expanded, accepted, onToggle, children }) {
    return (
        <div className={`plan-item-single ${expanded ? "selected" : ""} ${accepted ? "accepted" : ""}`}>
            <div className="plan-header-single" onClick={onToggle}>
                <div className="plan-header-title">{title}</div>
            </div>
            <div className="plan-details-single">
                <div style={{ padding: "0 24px 24px 24px" }}>{children}</div>
            </div>
        </div>
    );
}

function ImplementationPlanContent() {
    return (
        <>
            <PlanGroup title="Brand Setup" text="Apply SweetCrust name, warm tone, pastel colour theme. Use soft rounded font pairing" />
            <PlanGroup title="Homepage" text="Hero message: “Freshly baked happiness, made just for you.” Highlight pastries + primary CTA for custom cake orders" />
            <PlanGroup title="Menu Page" text="Showcase pastries in simple categories. Add a “Most Loved” section for families & office workers" />
            <PlanGroup title="Custom Cake Order Page" text="Guided form (size → flavour → decoration → notes). Quick price estimate + preview card. Pickup/delivery options" />
            <PlanGroup title="Contact Page" text="Location, timings, quick-call button. Optional Google Maps embed" />
            <PlanGroup title="Theme & Tone" text="Friendly microcopy across all pages. Warm visuals, pastel colours, cozy bakery mood" />
        </>
    );
}

function PlanGroup({ title, text, status }) {
    return (
        <div className={`plan-group ${status || ''}`}>
            <div className="plan-group-status">{status === 'completed' ? '✓' : ''}</div>
            <div className="plan-group-title">{title}</div>
            <div className="plan-group-text">{text}</div>
        </div>
    )
}

function PlanSelectionContent({ onSelect }) {
    return (
        <div className="plans-list-chat" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="plan-card" onClick={() => onSelect('Starter')} style={{ border: "2px solid #222", borderRadius: "8px", padding: "12px", cursor: "pointer", background: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div style={{ fontWeight: 700, fontSize: "15px" }}>Starter</div>
                    <div style={{ fontWeight: 700 }}>$149</div>
                </div>
                <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.4" }}>One-time build, 5 pages, hosting included.</div>
            </div>

            <div className="plan-card" onClick={() => onSelect('Business')} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "12px", cursor: "pointer", background: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div style={{ fontWeight: 700, fontSize: "15px" }}>Business</div>
                    <div style={{ fontWeight: 700 }}>$39<span style={{ fontSize: "11px", fontWeight: 400, color: "#777" }}>/mo</span></div>
                </div>
                <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.4" }}>5 sites, source code export, priority support.</div>
            </div>
            <button className="btn btn-dark btn-block" style={{ marginTop: 16 }} onClick={() => onSelect('Starter')}>Continue to Payment</button>
        </div>
    )
}

function ProgressContent({ currentSteps, isFinished }) {
    const steps = [
        { id: 1, title: "Brand Setup", text: "Configuring brand assets..." },
        { id: 2, title: "Homepage", text: "Building hero & layout..." },
        { id: 3, title: "Menu Page", text: "Setting up product grid..." },
        { id: 4, title: "Custom Cake Order Page", text: "Generating forms..." },
        { id: 5, title: "Contact Page", text: "Adding location data..." },
        { id: 6, title: "Theme & Tone", text: "Applying styles..." },
    ];

    return (
        <>
            {steps.map(s => {
                let status = '';
                if (isFinished) status = 'completed';
                else if (currentSteps.includes(s.id)) {
                    const isLast = currentSteps[currentSteps.length - 1] === s.id;
                    status = isLast ? 'loading' : 'completed';
                }
                return (
                    <div key={s.id} className={`plan-group ${status}`}>
                        <div className="plan-group-status">
                            {status === 'loading' && <div className="spinner"></div>}
                            {status === 'completed' && <span className="checkmark-icon">✓</span>}
                        </div>
                        <div className="plan-group-title">{s.title}</div>
                        <div className="plan-group-text" style={{ display: status === 'completed' ? 'none' : 'block' }}>{s.text}</div>
                    </div>
                );
            })}
        </>
    )
}

function CanvasSimulation({ visibleSections }) {
    const { nav, hero, grid, form, theme } = visibleSections;

    return (
        <div className={`canvas-container ${nav ? 'visible' : ''} ${theme ? 'theme-applied' : ''}`} id="simulation-canvas">

            <div className="canvas-body">
                <div className={`sk-el sk-nav ${nav ? 'visible' : ''}`} id="sk-nav">
                    <div className="sk-logo"></div>
                    <div className="sk-links">
                        <div className="sk-link"></div><div className="sk-link"></div><div className="sk-link"></div>
                    </div>
                </div>

                <div className={`sk-el sk-hero ${hero ? 'visible' : ''}`} id="sk-hero">
                    <div className="sk-hero-title"></div>
                    <div className="sk-hero-sub"></div>
                </div>

                <div className={`sk-el sk-grid ${grid ? 'visible' : ''}`} id="sk-grid">
                    <div className="sk-card"></div><div className="sk-card"></div><div className="sk-card"></div>
                </div>

                <div className={`sk-el sk-form ${form ? 'visible' : ''}`} id="sk-form">
                    <div className="sk-input"></div><div className="sk-input"></div><div className="sk-button"></div>
                </div>
            </div>
        </div>
    );
}
