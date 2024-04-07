"use client";

import type React from "react";
import { BRL } from "~/app";
import { Button } from "../ui/button";
import { CheckCircle2, X } from "lucide-react";
import { Badge } from "../ui/badge";

const PricingTableContent = () => {
  const currency = BRL === "true" ? "R$" : "$";

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto">
        {/* Pricing plans */}
        <PricingPlan
          name="Free"
          price={`${currency}7.99`}
          features={["3 books", "40 questions/month", "30 days chat history"]}
          buttonText="Subscribe"
          currency={currency}
        />
        <PricingPlan
          name="Plus"
          price={`${currency}16.99`}
          features={["5 books", "200 questions/month", "90 days chat history"]}
          buttonText="Subscribe"
          currency={currency}
        />
        <PricingPlan
          name="Premium"
          price={`${currency}19.99`}
          features={["200 books", "4000 questions", "210 days chat history"]}
          buttonText="Subscribe"
          currency={currency}
          popular
        />
        <PricingPlan
          name="Vampire"
          price={`${currency}99.99`}
          features={[
            "Unlimited books",
            "Unlimited questions",
            "365 days chat history",
          ]}
          buttonText="Subscribe"
          currency={currency}
        />
      </div>
    </>
  );
};

export const PricingTableNative = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="bg-slate-100 dark:bg-zinc-700 p-2 rounded-lg">
          <Button
            type="button"
            variant="outline"
            className="px-4 py-2 rounded mr-1"
          >
            Monthly
          </Button>
          <Button type="button" variant="ghost" className="text-text-2">
            Yearly
          </Button>
        </div>
      </div>
      <PricingTableContent />
    </>
  );
};

export const PricingTableModal = ({ onClose, onSave }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg border border-slate-600 max-h-[90vh] max-w-full mx-4 overflow-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="bg-slate-100 dark:bg-zinc-700 p-2 rounded-lg">
              <Button
                type="button"
                variant="outline"
                className="px-4 py-2 rounded mr-1"
              >
                Monthly
              </Button>
              <Button type="button" variant="ghost" className="text-text-2">
                Yearly
              </Button>
            </div>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="text-text-2 hover:text-text-1"
            >
              <X />
            </Button>
          </div>

          <PricingTableContent />
        </div>
      </div>
    </div>
  );
};

interface PricingPlanProps {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  currency: string;
}
const PricingPlan: React.FC<PricingPlanProps> = ({
  name,
  price,
  features,
  buttonText,
  popular,
  currency,
}) => {
  return (
    <div
      className={`bg-transparent rounded-lg shadow-lg p-6 flex flex-col items-start ${
        popular
          ? "border-slate-400 border-primary-0 bg-zinc-100 dark:bg-zinc-700"
          : ""
      }`}
    >
      <div className="flex flex-col items-start">
        {popular ? (
          <Badge
            variant="default"
            className="text-primary-0 font-semibold mb-2 px-4 py-1 rounded-full -mt-1"
          >
            Most popular
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="font-semibold mb-2 py-1 border-none bg-transparent"
          >
            ⠀
          </Badge>
        )}
        <h3 className="text-xl font-title mb-4 opacity-80">{name}</h3>
      </div>
      <div className="text-2xl font-bold mb-6">{price}</div>
      <Button
        type="button"
        variant="default"
        className="w-full py-2 rounded mb-8"
      >
        {buttonText}
      </Button>

      <p className="opacity-70 mb-2 text-sm">This includes:</p>
      <ul className="text-left text-sm space-y-2 mb-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <span className="text-primary-500 mr-2 mt-1">
              <CheckCircle2 className="max-w-5" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
