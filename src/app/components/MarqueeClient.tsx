"use client";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { IProduct } from "../type/type";

const MarqueeClient = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="py-1">
      <MarqueeText direction="right" duration={25} pauseOnHover={true}>
        <div className="flex items-center gap-4">
          {products.map((line) => {
            const isUp = line.change?.dir === "up";

            return (
              <div
                key={line.id}
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-1.5 text-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-800"
              >
                {/* ক্যাটাগরি আইকন */}
                <span className="text-base">{line.categoryIcon}</span>

                {/* পণ্যের নাম */}
                <span className="font-medium text-slate-200">
                  {line.nameBn}
                </span>

                {/* মূল্য */}
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-white">৳{line.today}</span>
                  <span className="text-xs text-slate-400">/কেজি</span>
                </div>

                {/* পরিবর্তন (Badge) */}
                <span
                  className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold border ${
                    isUp
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}
                >
                  {isUp ? (
                    <>
                      <GoTriangleUp className="text-xs" />
                      <span>+{line.change?.pct}%</span>
                    </>
                  ) : (
                    <>
                      <GoTriangleDown className="text-xs" />
                      <span>-{line.change?.pct}%</span>
                    </>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default MarqueeClient;