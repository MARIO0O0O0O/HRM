"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, Star, ChevronDown, ChevronUp } from "lucide-react";

export type CellType = "text" | "check" | "cross" | "stars";

export interface CellValue {
  type: CellType;
  value?: string | number; // For text or star count (1-5)
}

export interface Row {
  label: string;
  values: CellValue[];
}

export interface RowGroup {
  groupName: string;
  rows: Row[];
}

export interface ComparisonTableProps {
  columns: string[]; // Up to 5 columns
  rowGroups: RowGroup[];
  verdictColumnIndex?: number; // Highlights the column that is "Best for small business"
}

export default function ComparisonTable({ columns, rowGroups, verdictColumnIndex = -1 }: ComparisonTableProps) {
  const [openMobileIndex, setOpenMobileIndex] = useState<number>(0);

  const renderCell = (cell: CellValue) => {
    switch (cell.type) {
      case "check":
        return <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-500" />;
      case "cross":
        return <XCircle className="mx-auto h-5 w-5 text-red-500/50" />;
      case "stars":
        const stars = Number(cell.value) || 0;
        return (
          <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < stars ? "text-amber-400 fill-amber-400" : "text-zinc-700"}`}
              />
            ))}
          </div>
        );
      case "text":
      default:
        return <span className="text-zinc-300 text-sm">{cell.value}</span>;
    }
  };

  return (
    <div className="w-full my-8">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-white/10 bg-[#111111]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-b border-white/10 bg-black/40 w-1/4"></th>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`p-4 border-b border-white/10 text-center font-semibold ${
                    idx === verdictColumnIndex ? "bg-indigo-500/10 text-indigo-400" : "bg-black/40 text-zinc-100"
                  }`}
                >
                  {idx === verdictColumnIndex && (
                    <div className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold mb-1">
                      Best for SMB
                    </div>
                  )}
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowGroups.map((group, gIdx) => (
              <React.Fragment key={gIdx}>
                {/* Group Header */}
                <tr>
                  <td colSpan={columns.length + 1} className="p-3 bg-white/5 font-semibold text-zinc-200 text-sm tracking-wide">
                    {group.groupName}
                  </td>
                </tr>
                {/* Rows */}
                {group.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 border-b border-white/5 text-sm text-zinc-400 font-medium">{row.label}</td>
                    {row.values.map((val, vIdx) => (
                      <td
                        key={vIdx}
                        className={`p-4 border-b border-white/5 text-center ${
                          vIdx === verdictColumnIndex ? "bg-indigo-500/5" : ""
                        }`}
                      >
                        {renderCell(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View (Card per product) */}
      <div className="block md:hidden space-y-4">
        {columns.map((col, cIdx) => (
          <div
            key={cIdx}
            className={`rounded-xl border ${
              cIdx === verdictColumnIndex ? "border-indigo-500/50 bg-indigo-500/5" : "border-white/10 bg-[#111111]"
            } overflow-hidden transition-all`}
          >
            <button
              onClick={() => setOpenMobileIndex(cIdx === openMobileIndex ? -1 : cIdx)}
              className="w-full flex items-center justify-between p-4 bg-black/40 text-left"
            >
              <div>
                {cIdx === verdictColumnIndex && (
                  <div className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold mb-1">
                    Best for SMB
                  </div>
                )}
                <h3 className={`font-semibold ${cIdx === verdictColumnIndex ? "text-indigo-400" : "text-zinc-100"}`}>
                  {col}
                </h3>
              </div>
              {cIdx === openMobileIndex ? (
                <ChevronUp className="h-5 w-5 text-zinc-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-zinc-500" />
              )}
            </button>

            {cIdx === openMobileIndex && (
              <div className="p-4 space-y-6">
                {rowGroups.map((group, gIdx) => (
                  <div key={gIdx}>
                    <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                      {group.groupName}
                    </h4>
                    <div className="space-y-3">
                      {group.rows.map((row, rIdx) => (
                        <div key={rIdx} className="flex justify-between items-center text-sm">
                          <span className="text-zinc-400">{row.label}</span>
                          <span className="text-zinc-100 font-medium">
                            {renderCell(row.values[cIdx])}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
