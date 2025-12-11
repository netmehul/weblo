"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loadData } from "../utils/wizardData";
import { isAuthenticated } from "../utils/auth";
import Header from "../components/Header";

function PaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [planName, setPlanName] = useState("Starter");
    const [price, setPrice] = useState(199);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. Auth Check
        if (!isAuthenticated()) {
            const returnUrl = encodeURIComponent("/payment?" + searchParams.toString());
            router.push(`/signin?redirect=${returnUrl}`);
            return;
        }
        setIsLoading(false);

        // 2. Load Data
        const data = loadData();
        if (data.email) setEmail(data.email);

        // Check params first, then localStorage
        const paramPlan = searchParams.get("plan");
        if (paramPlan) {
            setPlanName(paramPlan);
            // Set price based on plan (simplified logic)
            if (paramPlan === 'Business') setPrice(39);
            else if (paramPlan === 'Enterprise') setPrice(79);
            else setPrice(149);
        } else if (data.plan) {
            setPlanName(data.plan);
            setPrice(data.planPrice || 149);
        }
    }, [searchParams, router]);

    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            router.push("/chat?status=paid");
        }, 2000);
    };

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                Loading...
            </div>
        )
    }

    return (
        <>
            <Header />
            <div className="wizard-layout">
                {/* Left Side: Payment Form */}
                <div className="wizard-left" style={{ borderTop: 'none' }}>

                    <div className="wizard-content-wrapper">
                        <div className="stepper-container">
                            <div style={{ width: "100%" }}></div>
                        </div>

                        <div className="wizard-form-container" style={{ paddingTop: 0 }}>
                            <div className="wizard-top-bar">
                                <Link href="/wizard/plan" className="go-back">
                                    ← Back to Plans
                                </Link>
                            </div>

                            <h1 className="wizard-title" style={{ marginBottom: "8px" }}>
                                Payment Details
                            </h1>
                            <p className="step-subtitle" style={{ marginBottom: "32px" }}>
                                Complete your purchase to build your site.
                            </p>

                            <div className="wizard-form">
                                <div className="form-group">
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "8px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="payEmail"
                                        placeholder="you@example.com"
                                        defaultValue={email}
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "8px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Card Details
                                    </label>
                                    <div
                                        style={{
                                            border: "1px solid #ddd",
                                            borderRadius: "6px",
                                            padding: "12px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "12px",
                                            background: "#fff",
                                        }}
                                    >
                                        <span style={{ fontSize: "20px" }}>💳</span>
                                        <input
                                            type="text"
                                            placeholder="Card number"
                                            style={{
                                                border: "none",
                                                outline: "none",
                                                flex: 1,
                                                fontSize: "14px",
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            style={{
                                                border: "none",
                                                outline: "none",
                                                width: "60px",
                                                fontSize: "14px",
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVC"
                                            style={{
                                                border: "none",
                                                outline: "none",
                                                width: "40px",
                                                fontSize: "14px",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "8px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Cardholder Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name on card"
                                    />
                                </div>

                                <button
                                    className="btn btn-dark btn-block"
                                    onClick={handlePay}
                                    style={{ marginTop: "16px" }}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? "Processing..." : "Pay & Build Website"}
                                </button>

                                <div
                                    style={{
                                        marginTop: "16px",
                                        fontSize: "12px",
                                        color: "#888",
                                        textAlign: "center",
                                    }}
                                >
                                    By confirming, you agree to Weblo's{" "}
                                    <Link href="#" style={{ color: "inherit", textDecoration: "underline" }}>
                                        Terms
                                    </Link>
                                    .
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Order Summary */}
                <div
                    className="wizard-right payment-right-panel"
                    style={{
                        backgroundColor: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    <div className="payment-summary-card">
                        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "24px" }}>
                            Order Summary
                        </h3>

                        <div className="summary-item">
                            <div>
                                <div className="summary-plan-name">{planName}</div>
                                <div
                                    className="summary-plan-period"
                                    style={{ fontSize: "12px", color: "#666" }}
                                >
                                    Billed once
                                </div>
                            </div>
                            <div className="summary-price">${price}.00</div>
                        </div>

                        <ul
                            id="summaryFeatures"
                            style={{
                                margin: "20px 0",
                                paddingLeft: "20px",
                                fontSize: "13px",
                                color: "#555",
                                lineHeight: "1.6",
                            }}
                        >
                            <li>Mobile-responsive</li>
                            <li>Basic SEO</li>
                            <li>1-year hosting included</li>
                        </ul>

                        <div className="summary-divider"></div>

                        <div className="summary-total-row">
                            <span>Total due</span>
                            <span>${price}.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentContent />
        </Suspense>
    );
}
