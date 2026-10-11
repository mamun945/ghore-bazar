"use client";

import React, { useState } from "react";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import {
    HiOutlineUser,
    HiOutlineMail,
    HiOutlineLockClosed,
    HiOutlineEye,
    HiOutlineEyeOff,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";


const SignUpPage = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            name: userData.name as string,
            email: userData.email as string,
            image: userData.image as string,
            password: userData.password as string,
        });

        if (data) {
            router.push('/signIn');
            toast.success("Account created successfully!");
        }

        if (error) {
            toast.error(error.message || "Something went wrong!");
        }

    };

    const googleHandaler = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }
    const githubHandelar = async () => {
        const data = await authClient.signIn.social({
            provider: "github"
        })
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
            {/* Background Decorative Glow */}
            <div className="absolute h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            {/* Main Container Card */}
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl sm:p-10">

                {/* Header Section */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg shadow-emerald-500/20">
                        <HiOutlineUser className="text-2xl text-slate-950" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                        একাউন্ট তৈরি করুন
                    </h2>
                    <p className="mt-1 text-sm font-medium text-slate-400">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                {/* Form Container */}
                <Form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Name Field */}
                    <TextField
                        isRequired
                        name="name"
                        className="flex flex-col gap-1.5"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-xs font-semibold text-slate-300">
                            আপনার নাম
                        </Label>
                        <div className="relative flex items-center">
                            <HiOutlineUser className="absolute left-3.5 text-lg text-slate-500" />
                            <Input
                                placeholder="যেমন: জহিরুল ইসলাম"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                        <FieldError className="text-xs font-medium text-rose-400" />
                    </TextField>

                    {/* Profile Image Field */}
                    <TextField
                        name="image"
                        type="url"
                        className="flex flex-col gap-1.5"
                        validate={(value) => {
                            if (value && !/^https?:\/\/.+/i.test(value)) {
                                return "সঠিক image URL দিন";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-xs font-semibold text-slate-300">
                            প্রোফাইল ছবি
                        </Label>

                        <div className="relative flex items-center">
                            <Input
                                placeholder="https://example.com/profile.jpg"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-4 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>

                        <Description className="text-[11px] text-slate-400">
                            আপনার প্রোফাইল ছবির image URL দিন।
                        </Description>

                        <FieldError className="text-xs font-medium text-rose-400" />
                    </TextField>

                    {/* Email Field */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="flex flex-col gap-1.5"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "সঠিক ইমেইল এড্রেস লিখুন";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-xs font-semibold text-slate-300">
                            ইমেইল এড্রেস
                        </Label>
                        <div className="relative flex items-center">
                            <HiOutlineMail className="absolute left-3.5 text-lg text-slate-500" />
                            <Input
                                placeholder="john@example.com"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                        <FieldError className="text-xs font-medium text-rose-400" />
                    </TextField>

                    {/* Password Field */}
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type={isVisible ? "text" : "password"}
                        className="flex flex-col gap-1.5"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "কমপক্ষে একটি বড় হাতের অক্ষর (A-Z) থাকতে হবে";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "কমপক্ষে একটি সংখ্যা (0-9) থাকতে হবে";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-xs font-semibold text-slate-300">
                            পাসওয়ার্ড
                        </Label>
                        <div className="relative flex items-center">
                            <HiOutlineLockClosed className="absolute left-3.5 text-lg text-slate-500" />
                            <Input
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            />
                            <button
                                type="button"
                                onClick={toggleVisibility}
                                className="absolute right-3.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                            >
                                {isVisible ? <HiOutlineEyeOff className="text-lg" /> : <HiOutlineEye className="text-lg" />}
                            </button>
                        </div>
                        <Description className="text-[11px] text-slate-400">
                            কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর এবং ১টি সংখ্যা আবশ্যক।
                        </Description>
                        <FieldError className="text-xs font-medium text-rose-400" />
                    </TextField>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:bg-emerald-400 hover:scale-[1.01] active:scale-[0.99]"
                    >
                        সাইন আপ করুন
                    </Button>
                </Form>

                {/* Divider */}
                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="h-[1px] flex-1 bg-slate-800" />
                    <span className="text-xs font-medium text-slate-500">অথবা</span>
                    <div className="h-[1px] flex-1 bg-slate-800" />
                </div>

                {/* Social Authentication */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={googleHandaler}
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/40 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                    >
                        <FcGoogle className="text-lg" /> Google
                    </button>
                    <button
                       onClick={githubHandelar}
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/40 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                    >
                        <FaGithub className="text-lg" /> GitHub
                    </button>
                </div>

                {/* Sign In Redirect */}
                <p className="mt-8 text-center text-xs font-medium text-slate-400">
                    ইতিমধ্যে একাউন্ট আছে?{" "}
                    <a
                        href="/signIn"
                        className="font-bold text-emerald-400 transition-colors hover:text-emerald-300 hover:underline"
                    >
                        সাইন ইন করুন
                    </a>
                </p>
                <div className="text-center">
                             <Link href="/" className=" mt-3 inline-block text-sm font-medium text-slate-400 transition-colors hover:text-emerald-300">
                            ← হোম পেজে ফিরে যান
                        </Link>
                         </div>
            </div>
        </div>
    );
};

export default SignUpPage;