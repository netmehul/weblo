"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WizardLayout from "../../components/WizardLayout";
import { loadData, saveData } from "../../utils/wizardData";

const STYLES = [
    "Modern",
    "Minimal",
    "Professional",
    "Corporate",
    "Colourful",
    "Monochrome",
    "Playful",
    "Elegant",
];

export default function WizardStep3() {
    const router = useRouter();
    const [selectedStyle, setSelectedStyle] = useState("");

    useEffect(() => {
        const data = loadData();
        setSelectedStyle(data.style || "Modern");
    }, []);

    const handleSelect = (style) => {
        setSelectedStyle(style);
    };

    const handleNext = () => {
        const data = loadData();
        saveData({ ...data, style: selectedStyle });
        router.push("/wizard/step4");
    };

    return (
        <WizardLayout currentStep={3}>
            <div className="wizard-top-bar">
                <Link href="/wizard/step2" className="go-back">
                    ← Go Back
                </Link>
                <Link href="/" className="btn btn-dark btn-sm exit-btn">
                    Exit
                </Link>
            </div>

            <h1 className="wizard-title">Design Style</h1>

            <button className="btn btn-light btn-block mb-4">Let AI Decide</button>

            <div className="style-grid">
                {STYLES.map((style) => (
                    <div
                        key={style}
                        className={`style-card ${selectedStyle === style ? "selected" : ""}`}
                        onClick={() => handleSelect(style)}
                    >
                        <div className="style-preview"></div>
                        <div className="style-name">{style}</div>
                    </div>
                ))}
            </div>

            <div className="style-actions">
                <button className="btn btn-light style-action-btn">
                    Let AI Decide
                </button>
                <button className="btn btn-light style-action-btn">Dark</button>
                <button className="btn btn-light style-action-btn">Light</button>
            </div>

            <button
                type="button"
                className="btn btn-dark btn-block"
                onClick={handleNext}
            >
                Next
            </button>
        </WizardLayout>
    );
}
