import React from "react";
import Link from "next/link";
import ComparisonTable from "@/components/resources/ComparisonTable";

export const metadata = {
  title: "HR Tools Comparison | BizHR",
  description: "Compare the best HR tools, payroll systems, and compliance solutions for California small businesses.",
};

const payrollComparisonData = {
  columns: ["Gusto", "Rippling", "ADP Run", "QuickBooks", "BizHR Done-for-You"],
  verdictColumnIndex: 4,
  rowGroups: [
    {
      groupName: "Pricing & Value",
      rows: [
        { label: "Base Fee (Monthly)", values: [{ type: "text" as const, value: "$40" }, { type: "text" as const, value: "$35" }, { type: "text" as const, value: "Custom" }, { type: "text" as const, value: "$45" }, { type: "text" as const, value: "Included" }] },
        { label: "Per Employee Fee", values: [{ type: "text" as const, value: "$6" }, { type: "text" as const, value: "$8" }, { type: "text" as const, value: "Custom" }, { type: "text" as const, value: "$5" }, { type: "text" as const, value: "$0" }] },
      ]
    },
    {
      groupName: "Features & Compliance",
      rows: [
        { label: "Automated Payroll", values: [{ type: "check" as const }, { type: "check" as const }, { type: "check" as const }, { type: "check" as const }, { type: "check" as const }] },
        { label: "CA Labor Law Alerts", values: [{ type: "cross" as const }, { type: "text" as const, value: "Add-on" }, { type: "text" as const, value: "Add-on" }, { type: "cross" as const }, { type: "check" as const }] },
        { label: "PAGA Defense Support", values: [{ type: "cross" as const }, { type: "cross" as const }, { type: "cross" as const }, { type: "cross" as const }, { type: "check" as const }] },
        { label: "Dedicated HR Expert", values: [{ type: "cross" as const }, { type: "cross" as const }, { type: "text" as const, value: "Add-on" }, { type: "cross" as const }, { type: "check" as const }] },
      ]
    },
    {
      groupName: "Ratings",
      rows: [
        { label: "Ease of Use", values: [{ type: "stars" as const, value: 5 }, { type: "stars" as const, value: 4 }, { type: "stars" as const, value: 3 }, { type: "stars" as const, value: 4 }, { type: "stars" as const, value: 5 }] },
        { label: "Support Quality", values: [{ type: "stars" as const, value: 3 }, { type: "stars" as const, value: 4 }, { type: "stars" as const, value: 2 }, { type: "stars" as const, value: 2 }, { type: "stars" as const, value: 5 }] },
      ]
    }
  ]
};

export default function CompareHubPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-16 space-y-6">
          <Link href="/resources" className="text-indigo-400 text-sm font-semibold hover:underline mb-2 inline-block">
            ← Back to Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Compare HR Solutions
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            See how popular HR and payroll platforms stack up against a fully managed, done-for-you service tailored for California compliance.
          </p>
        </header>

        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6">Payroll & HRIS Systems</h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            Choosing the right payroll system is critical. While self-service software is cheap, it leaves you exposed to California labor law violations if not configured and monitored by an expert.
          </p>
          <ComparisonTable 
            columns={payrollComparisonData.columns} 
            rowGroups={payrollComparisonData.rowGroups} 
            verdictColumnIndex={payrollComparisonData.verdictColumnIndex} 
          />
        </section>

        <section className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/20 border border-indigo-500/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Stop managing software. Let us handle the compliance.</h2>
          <p className="text-zinc-300 mb-8 max-w-2xl mx-auto text-lg">
            Software alone won't protect you from a PAGA lawsuit. You need an expert in the loop. We set up your systems and monitor them so you don't have to.
          </p>
          <Link href="/book" className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-4 rounded-xl transition-colors">
            Book a Free 30-Min Consultation
          </Link>
        </section>
      </div>
    </main>
  );
}
