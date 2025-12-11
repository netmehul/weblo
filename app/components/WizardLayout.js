"use client";

import Link from "next/link";
import Header from "./Header";

export default function WizardLayout({ currentStep, children }) {
    const steps = [1, 2, 3, 4, 5, 6];

    return (
        <>
            <Header />
            <div className="wizard-layout">
                <div className="wizard-left" style={{ borderTop: 'none' }}>

                    <div className="wizard-content-wrapper">
                        <div className="stepper-container">
                            <div className="stepper-line"></div>
                            {steps.map((step) => (
                                <div
                                    key={step}
                                    className={`step-item ${currentStep === step ? "active" : ""}`}
                                >
                                    {currentStep === step ? (
                                        <div className="step-circle">{step}</div>
                                    ) : (
                                        <div className="step-circle-small"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="wizard-form-container">{children}</div>
                    </div>
                </div>
                <div className="wizard-right">
                    {/* Placeholder for right side content/image */}
                </div>
            </div>
        </>
    );
}
