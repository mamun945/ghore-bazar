"use client";

import { useState } from "react";
import { ICategory } from "../type/type";
import Link from "next/link";

interface NavListItemProps {
  datas: ICategory[];
  onSelectCategory?: (id: string) => void;
}

const NavlistitemPage = ({ datas, onSelectCategory }: NavListItemProps) => {
  const [select, setSelect] = useState<string>(datas[0]?.id || "chal");

  const handleSelect = (id: string) => {
    setSelect(id);
    if (onSelectCategory) {
      onSelectCategory(id);
    }
  };

  return (
    <div className="w-full overflow-x-auto py-2 no-scrollbar">
      <div className="flex items-center gap-3 min-w-max">
        {datas.map((data) => {
          const isSelected = select === data.id;

          return (
            <Link key={data.id} href={`/categories/${data.id}`}>
              <button
                onClick={() => handleSelect(data.id)}
                className={`group relative flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none ${isSelected
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-[1.02]"
                  : "bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                {/* আইকন Container */}
                <span
                  className={`text-lg transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-110"
                    }`}
                >
                  {data.icon}
                </span>

                {/* বাংলা নাম */}
                <span className="whitespace-nowrap">{data.nameBn}</span>

                {/* অ্যাক্টিভ অবস্থায় ছোট গ্লো ডট */}
                {isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-pulse" />
                )}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavlistitemPage;