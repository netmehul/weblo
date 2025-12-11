"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WizardLayout from "../../components/WizardLayout";
import { loadData, saveData } from "../../utils/wizardData";
import { isAuthenticated } from "../../utils/auth";

const PLANS = [
    {
        name: "Starter",
        price: 149,
        tagline: "Pay-per-build, ideal for 1-time website creation.",
        features: [
            "1 AI-generated website (up to 5 pages recommended)",
            "Mobile-responsive design",
            "Basic SEO (titles, descriptions)",
            "Standard templates",
            "14-day post-delivery edit window",
        ],
    },
    {
        name: "Business",
        price: 39,
        period: "/ Month",
        tagline: "Build up to 5 websites + export source code.",
        features: [
            "Up to 5 AI-generated websites",
            "Source code export",
            "Premium template access",
            "Advanced SEO controls",
            "Team seats (2–5 members)",
        ],
    },
    {
        name: "Enterprise",
        price: 79,
        period: "/ Month",
        tagline: "Everything from above + white-label, SLA, and advanced features.",
        features: [
            "Unlimited websites",
            "White-label editor",
            "SLA-backed uptime",
            "Dedicated account manager",
            "Custom integrations",
        ],
    },
];

export default function WizardPlan() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState("Starter");

    useEffect(() => {
        const data = loadData();
        if (data.plan) {
            setSelectedPlan(data.plan);
        } else {
            saveData({ ...data, plan: "Starter", planPrice: 149 });
        }
    }, []);

    const handleSelect = (planName, price) => {
        setSelectedPlan(planName);
        const data = loadData();
        saveData({ ...data, plan: planName, planPrice: price });
    };

    const handleContinue = () => {
        if (isAuthenticated()) {
            router.push("/payment");
        } else {
            router.push("/signin?redirect=/payment");
        }
    };

    return (
        <WizardLayout currentStep={6}>
            <div className="wizard-top-bar">
                <Link href="/wizard/step5" className="go-back">
                    ← Go Back
                </Link>
                <Link href="/" className="btn btn-dark btn-sm exit-btn">
                    Exit
                </Link>
            </div>

            <h1 className="wizard-title">Almost Done</h1>
            <p className="step-subtitle">Select a plan to launch your website.</p>

            <div className="plans-list">
                {PLANS.map((plan) => (
                    <div
                        key={plan.name}
                        className={`plan-item ${selectedPlan === plan.name ? "selected" : ""
                            }`}
                        onClick={() => handleSelect(plan.name, plan.price)}
                    >
                        <div className="plan-header-row">
                            <div className="plan-info">
                                <h3 className="plan-name">{plan.name}</h3>
                                <p className="plan-tagline">{plan.tagline}</p>
                            </div>
                            <div className="plan-cost">
                                ${plan.price}{" "}
                                {plan.period && <span className="period">{plan.period}</span>}
                            </div>
                        </div>
                        <div className="plan-details">
                            <ul className="feature-list">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "32px" }}>
                <button
                    type="button"
                    className="btn btn-dark btn-block"
                    onClick={handleContinue}
                >
                    Continue to Payment
                </button>
            </div>
        </WizardLayout>
    );
}
