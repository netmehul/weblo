"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WizardLayout from "../../components/WizardLayout";
import { loadData, saveData } from "../../utils/wizardData";

const FEATURES_OPTIONS = [
    "Let AI Decide",
    "Contact Form",
    "Photo Gallery",
    "Blog",
    "Booking System",
    "Testimonials",
    "Ecommerce",
    "AI Text",
    "AI Images",
];

export default function WizardStep4() {
    const router = useRouter();
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    useEffect(() => {
        const data = loadData();
        setSelectedFeatures(data.features || []);
    }, []);

    const handleToggle = (feature) => {
        if (feature === "AI Images") return; // Disabled

        setSelectedFeatures((prev) => {
            if (prev.includes(feature)) {
                return prev.filter((f) => f !== feature);
            } else {
                return [...prev, feature];
            }
        });
    };

    const handleNext = () => {
        const data = loadData();
        saveData({ ...data, features: selectedFeatures });
        router.push("/wizard/step5");
    };

    return (
        <WizardLayout currentStep={4}>
            <div className="wizard-top-bar">
                <Link href="/wizard/step3" className="go-back">
                    ← Go Back
                </Link>
                <Link href="/" className="btn btn-dark btn-sm exit-btn">
                    Exit
                </Link>
            </div>

            <h1 className="wizard-title">Features</h1>

            <div className="checkbox-list">
                {FEATURES_OPTIONS.map((feature) => {
                    const isDisabled = feature === "AI Images";
                    const label =
                        feature === "Booking System"
                            ? "Booking/Appointment System"
                            : feature === "Testimonials"
                                ? "Testimonials Section"
                                : feature === "Ecommerce"
                                    ? "E-commerce Basic Setup"
                                    : feature === "AI Text"
                                        ? "AI-Generated Text Content"
                                        : feature === "AI Images"
                                            ? "AI-Generated Images"
                                            : feature;

                    return (
                        <label
                            key={feature}
                            className={`checkbox-item ${isDisabled ? "disabled" : ""}`}
                        >
                            <input
                                type="checkbox"
                                name="features"
                                value={feature}
                                checked={selectedFeatures.includes(feature)}
                                onChange={() => handleToggle(feature)}
                                disabled={isDisabled}
                            />
                            <span className="checkmark"></span>
                            {isDisabled ? (
                                <span style={{ color: "#aaa" }}>
                                    {label} <span className="badge">Coming Soon</span>
                                </span>
                            ) : (
                                label
                            )}
                        </label>
                    );
                })}
            </div>

            <div className="add-more-btn">+ Add More</div>

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
