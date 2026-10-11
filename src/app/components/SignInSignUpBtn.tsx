"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "../lib/auth-client";
import { Avatar } from "@heroui/react";
import Link from "next/link";
import {
    FiUser,
    FiLogOut,
    FiChevronDown,
    FiMail,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const SignInSignUpBtnPage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const userData = session?.user;

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    // Loading Spinner
    if (isPending) {
        return (
            <div className="flex items-center justify-center p-2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            </div>
        );
    }

    // Sign Out
    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            toast.success('SignOut Successfully!');
            router.push('/signIn');
            setIsOpen(false);
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };

    return (
        <div>
            {userData ? (
                <div className="relative" ref={dropdownRef}>
                    {/* User Button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                        className="flex items-center gap-2 rounded-2xl border border-transparent p-1.5 transition-all hover:border-emerald-500/20 hover:bg-emerald-500/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    >
                        <Avatar>
                            <Avatar.Image
                                alt={userData.name || "User"}
                                src={
                                    userData.image ||
                                    "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                                }
                            />
                            <Avatar.Fallback>
                                {userData.name?.charAt(0)?.toUpperCase() || "U"}
                            </Avatar.Fallback>
                        </Avatar>

                        <span className="hidden max-w-32 truncate text-sm font-bold text-slate-800 sm:block dark:text-white">
                            {userData.name}
                        </span>

                        <FiChevronDown
                            className={`mr-1 text-slate-500 transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div
                            role="menu"
                            className="absolute right-0 top-full z-50 mt-3 w-72 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 animate-in fade-in slide-in-from-top-2 duration-200 dark:border-slate-700 dark:bg-slate-900"
                        >
                            {/* User Information */}
                            <div className="border-b border-slate-100 bg-gradient-to-br from-emerald-50 to-white p-5 dark:border-slate-800 dark:from-emerald-950/40 dark:to-slate-900">
                                <div className="">
                                   
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                            {userData.name}
                                        </h3>

                                        <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
                                            <FiMail className="shrink-0" />
                                            {userData.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="space-y-1 p-2">
                                <Link
                                    href="/profile"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-200 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-lg dark:bg-slate-800">
                                        <FiUser />
                                    </span>

                                    <span>আমার প্রোফাইল</span>
                                </Link>

                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={handleSignOut}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-lg dark:bg-rose-500/10">
                                        <FiLogOut />
                                    </span>

                                    <span>Sign Out</span>
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
                                <p className="text-center text-[11px] text-slate-400">
                                    আপনার অ্যাকাউন্ট, আপনার নিয়ন্ত্রণ
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-2.5">
                    <Link
                        href="/signin"
                        className="rounded-xl px-4 py-2 text-xs font-semibold text-emerald-600 transition-all hover:bg-emerald-500/10 hover:text-emerald-500 sm:text-sm"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:bg-emerald-400 active:scale-[0.98] sm:text-sm"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SignInSignUpBtnPage;