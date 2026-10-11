"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { FiSliders, FiPackage } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IProduct } from "../type/type";
import ProductCard2Page from "./ProductCard2";

const CatagoriesProductsPage = ({
    products,
}: {
    products: IProduct[];
}) => {
    const [sortBy, setSortBy] = useState<
        "default" | "accending" | "decending"
    >("default");

    const sortedProducts = useMemo(() => {
        const sorted = [...products];

        if (sortBy === "accending") {
            sorted.sort((a, b) => a.today - b.today);
        } else if (sortBy === "decending") {
            sorted.sort((a, b) => b.today - a.today);
        }

        return sorted;
    }, [products, sortBy]);

    // Empty State
    if (!products.length) {
        return (
            <section className="flex min-h-[65vh] items-center justify-center px-4 py-12">
                <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/40 sm:p-12 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">

                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 text-rose-500 dark:bg-rose-500/10">
                        <FaExclamationTriangle className="text-3xl" />
                    </div>

                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
                        No Products Found
                    </p>

                    <h1 className="mb-3 text-3xl font-black text-slate-900 dark:text-white">
                        পণ্য খুঁজে পাওয়া যায়নি
                    </h1>

                    <p className="mb-8 text-sm leading-7 text-slate-500 dark:text-slate-400">
                        এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যাচ্ছে না।
                        হোম পেজে ফিরে গিয়ে অন্য পণ্য দেখুন।
                    </p>

                    <Link
                        href="/"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 sm:w-auto"
                    >
                        <MdHome className="text-xl" />
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

            {/* Category Header */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/70 to-teal-50/80 p-5 shadow-sm sm:p-7 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30">

                {/* Decorative Background */}
                <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-200/70 bg-emerald-100/80 text-3xl shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10">
                            {products[0]?.categoryIcon || "🛍️"}
                        </div>

                        <div className="min-w-0">
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                    Product Category
                                </span>
                            </div>

                            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                                {products[0]?.categoryNameBn || "সকল পণ্য"}
                            </h1>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                আজকের বাজারদর ও মূল্য পরিবর্তন এক নজরে
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-white bg-white/80 p-4 shadow-sm sm:min-w-40 dark:border-slate-700 dark:bg-slate-800/70">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <FiPackage className="text-xl" />
                        </div>

                        <div>
                            <p className="text-2xl font-black leading-none text-slate-900 dark:text-white">
                                {products.length}
                            </p>
                            <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                                মোট পণ্য
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Products Toolbar */}
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-slate-800 dark:bg-slate-900">

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <HiOutlineShoppingBag className="text-xl" />
                    </div>

                    <div>
                        <h2 className="font-bold text-slate-900 dark:text-white">
                            পণ্যের তালিকা
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            মোট {products.length}টি পণ্য দেখানো হচ্ছে
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <label
                        htmlFor="product-sort"
                        className="flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300"
                    >
                        <FiSliders className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-emerald-600 dark:text-emerald-400" />
                        সাজান
                    </label>

                    <div className="relative min-w-0 flex-1 sm:flex-none">
                        <FiSliders className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-emerald-600 dark:text-emerald-400" />

                        <select
                            id="product-sort"
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(
                                    e.target.value as
                                        | "default"
                                        | "accending"
                                        | "decending"
                                )
                            }
                            className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-9 text-sm font-semibold text-slate-700 outline-none transition-all hover:border-emerald-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 sm:w-56 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                            <option value="default">ডিফল্ট ক্রম</option>
                            <option value="accending">
                                দাম: কম থেকে বেশি
                            </option>
                            <option value="decending">
                                দাম: বেশি থেকে কম
                            </option>
                        </select>

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                            ▼
                        </span>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

                {sortedProducts.map((product) => (
                    <ProductCard2Page
                        key={product.id}
                        product={product}
                    />
                ))}

            </div>

            {/* Bottom Information */}
            <div className="flex items-center justify-center gap-2 border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                বাজারদর সম্পর্কে সচেতন থাকুন, কেনাকাটা করুন পরিকল্পনা করে।
            </div>

        </section>
    );
};

export default CatagoriesProductsPage;