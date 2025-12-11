"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "./components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Paperclip, Send, ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const handleSend = () => {
    if (prompt.trim()) {
      localStorage.setItem("weblo_prompt", prompt);
      router.push("/chat");
    }
  };

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-24 text-center px-6">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-10 leading-[1.1]">
              Build Your Website
              <br />
              in Minutes with AI
            </h1>
            <div className="max-w-2xl mx-auto relative">
              <Textarea
                className="min-h-[174px] p-6 pb-20 text-lg shadow-lg border-muted-foreground/20 resize-none rounded-2xl focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Describe your website"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <Button variant="secondary" size="sm" asChild className="rounded-full h-9 px-4 font-medium bg-muted hover:bg-muted/80 text-foreground">
                  <Link href="/wizard">
                    Prompt Builder
                  </Link>
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button size="icon" className="rounded-full h-9 w-9" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold tracking-tight">Ready to use templates</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="#">
                  View All
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Goal Tracker", category: "SaaS" },
                { title: "Electronics", category: "Ecommerce" },
                { title: "Foodiz", category: "Lifestyle" },
              ].map((template) => (
                <div key={template.title} className="group cursor-pointer">
                  <div className="bg-muted aspect-[16/10] rounded-lg mb-4 transition-transform group-hover:scale-[1.02] duration-300"></div>
                  <h3 className="font-semibold text-lg leading-none mb-1">{template.title}</h3>
                  <p className="text-muted-foreground text-sm">{template.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 pb-24 px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-min gap-6">
              {/* Tall Feature */}
              <Card className="md:col-span-1 md:row-span-2 flex flex-col justify-start bg-muted/50 border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Intelligent Industry Identification</CardTitle>
                  <CardDescription className="text-base mt-2">AI understands your business and suggests the best layout.</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-muted/50 border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Design Preferences</CardTitle>
                  <CardDescription>Clean, modern, professional layouts.</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-muted/50 border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Fast Build</CardTitle>
                  <CardDescription>Your website generates within minutes.</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-muted/50 border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Downloadable Source</CardTitle>
                  <CardDescription>Full ownership of your site.</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-muted/50 border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Customizable Pages</CardTitle>
                  <CardDescription>Choose the pages your site needs.</CardDescription>
                </CardHeader>
              </Card>

              {/* Wide Feature */}
              <Card className="md:col-span-2 bg-muted/50 border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">AI-Generated Content</CardTitle>
                  <CardDescription>Automatic text and placeholder images.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-muted text-center">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-auto">
              <img src="/Assets/img/logo.svg" alt="Logo" className="h-8 opacity-80 grayscale" />
            </div>
            <p className="text-sm text-muted-foreground">Footer</p>
          </div>
        </div>
      </footer>
    </>
  );
}
