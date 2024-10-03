"use client";
import React from "react";
import Invoices from "@/components/allInvoice";

export default function page() {
  return (
    <div className="border p-4 border-opacity-5 bg-gray-700 w-full m-16">
      <Invoices />
    </div>
  );
}
