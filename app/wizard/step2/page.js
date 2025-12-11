"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WizardLayout from "../../components/WizardLayout";
import { loadData, saveData } from "../../utils/wizardData";

const PAGES_OPTIONS = [
    "Home",
    "About",
    "Services",
    "Contact",
    "Gallery",
    "Testimonials",
    "Pricing",
    "FAQ",
    "Blog",
    "Shop",
];

export default function WizardStep2() {
    const router = useRouter();
    const [selectedPages, setSelectedPages] = useState([]);

    useEffect(() => {
        const data = loadData();
        // Default Home if empty or preserve saved
        setSelectedPages(data.pages && data.pages.length > 0 ? data.pages : ["Home"]);
    }, []);

    const handleToggle = (page) => {
        setSelectedPages((prev) => {
            if (prev.includes(page)) {
                return prev.filter((p) => p !== page);
            } else {
                return [...prev, page];
            }
        });
    };

    const handleNext = () => {
        const data = loadData();
        saveData({ ...data, pages: selectedPages });
        router.push("/wizard/step3");
    };

    return (
        <WizardLayout currentStep={2}>
            <div className="wizard-top-bar">
                <Link href="/wizard" className="go-back">
                    ← Go Back
                </Link>
                <Link href="/" className="btn btn-dark btn-sm exit-btn">
                    Exit
                </Link>
            </div>

            <h1 className="wizard-title">Customize Your Website</h1>
            <p className="step-subtitle">
                Pages to include
                <br />
                <span className="step-desc">Select the pages you want on your website</span>
            </p>

            <div className="checkbox-grid">
                {PAGES_OPTIONS.map((page) => (
                    <label key={page} className="checkbox-item">
                        <input
                            type="checkbox"
                            name="pages"
                            value={page}
                            checked={selectedPages.includes(page)}
                            onChange={() => handleToggle(page)}
                        />
                        <span className="checkmark"></span>
                        {page} {page === "Blog" || page === "Shop" ? "(optional)" : ""}
                    </label>
                ))}
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
