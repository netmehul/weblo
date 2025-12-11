"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WizardLayout from "../../components/WizardLayout";
import { loadData } from "../../utils/wizardData";

export default function WizardStep5() {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(loadData());
    }, []);

    if (!data) return null; // or loading state

    return (
        <WizardLayout currentStep={5}>
            <div className="wizard-top-bar">
                <Link href="/wizard/step4" className="go-back">
                    ← Go Back
                </Link>
                <Link href="/" className="btn btn-dark btn-sm exit-btn">
                    Exit
                </Link>
            </div>

            <h1 className="wizard-title">Review & Build</h1>
            <p className="step-subtitle">Review your details before building.</p>

            <div className="review-summary">
                <div className="review-item">
                    <span className="review-label">Business Name:</span>
                    <span className="review-value">
                        {data.businessName || "Not entered"}
                    </span>
                </div>
                <div className="review-item">
                    <span className="review-label">Industry:</span>
                    <span className="review-value">
                        {data.industry || "Not selected"}
                    </span>
                </div>
                <div className="review-item">
                    <span className="review-label">Pages:</span>
                    <span className="review-value">
                        {data.pages && data.pages.length > 0
                            ? data.pages.join(", ")
                            : "None"}
                    </span>
                </div>
                <div className="review-item">
                    <span className="review-label">Style:</span>
                    <span className="review-value">{data.style || "Not selected"}</span>
                </div>
                <div className="review-item">
                    <span className="review-label">Features:</span>
                    <span className="review-value">
                        {data.features && data.features.length > 0
                            ? data.features.join(", ")
                            : "None"}
                    </span>
                </div>
            </div>

            <Link
                href="/wizard/plan"
                className="btn btn-dark btn-block"
                style={{ textAlign: "center", textDecoration: "none" }}
            >
                Continue to Plans
            </Link>
        </WizardLayout>
    );
}
