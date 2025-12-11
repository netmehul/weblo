"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WizardLayout from "../components/WizardLayout";
import { loadData, saveData } from "../utils/wizardData";

export default function WizardStep1() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        businessName: "",
        industry: "",
        description: "",
        email: "",
    });

    useEffect(() => {
        const data = loadData();
        setFormData((prev) => ({
            ...prev,
            businessName: data.businessName || "",
            industry: data.industry || "",
            description: data.description || "",
            email: data.email || "",
        }));
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleNext = () => {
        const data = loadData();
        const newData = { ...data, ...formData };
        saveData(newData);
        router.push("/wizard/step2");
    };

    return (
        <WizardLayout currentStep={1}>
            <div className="wizard-top-bar">
                <Link href="/" className="btn btn-dark btn-sm exit-btn">
                    Exit
                </Link>
            </div>

            <h1 className="wizard-title">Tell Us About Your Business</h1>

            <form className="wizard-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="businessName"
                        placeholder="Business Name"
                        value={formData.businessName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <div className="select-wrapper">
                        <select
                            className="form-control"
                            id="industry"
                            value={formData.industry}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Industry
                            </option>
                            <option value="Technology">Technology</option>
                            <option value="Retail">Retail</option>
                            <option value="Services">Services</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Education">Education</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <textarea
                        className="form-control"
                        id="description"
                        rows="5"
                        placeholder="Short Description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Business Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="button"
                    className="btn btn-dark btn-block"
                    onClick={handleNext}
                >
                    Next
                </button>
            </form>
        </WizardLayout>
    );
}
