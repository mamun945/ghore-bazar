"use client";

import { authClient } from '@/app/lib/auth-client';
import { Button, Description, FieldError, Input, Label, TextField } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GoSignOut } from 'react-icons/go';
import { HiMail, HiUser, HiShieldCheck, HiArrowLeft, HiOutlineUser } from 'react-icons/hi';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const userData = session?.user;

    const handleSignOut = async () => {
        try {
            setIsSigningOut(true);
            await authClient.signOut();
            toast.success('SignOut Successfully!');
            router.push('/signIn');
        } catch (error) {
            console.error('Sign out error:', error);
            toast.error('সাইন আউট করতে সমস্যা হয়েছে!');
        } finally {
            setIsSigningOut(false);
        }
    };

    // Skeleton Loader State
    if (isPending) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl animate-pulse space-y-6">
                    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                        <div className="space-y-2 flex-1">
                            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const updateHandelar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
       const data = await authClient.updateUser({
            image: userData.image as string,
            name: userData.name as string,
        })
       if(data){
         router.push('/');
         toast.success('Profile update successfully!')
       }
       if(!data){
        toast.error('somthing went wrong');
       }
    }

    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 bg-slate-50/50 dark:bg-slate-950/50">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all">

                {/* Header Section */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                            আমার প্রোফাইল
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            আপনার অ্যাকাউন্টের ব্যক্তিগত তথ্য ও সেটিংস এখানে দেখুন।
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50 w-fit">
                        <HiShieldCheck className="text-sm" /> অ্যাক্টিভ অ্যাকাউন্ট
                    </span>
                </div>

                {/* Profile Content */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">

                    {/* User Info Group */}
                    <div className="flex items-center gap-5">
                        {/* Avatar Section */}
                        <div className="relative group">
                            {userData?.image ? (
                                <Image
                                    height={80}
                                    width={80}
                                    src={userData.image}
                                    alt={userData.name ?? 'প্রোফাইল ছবি'}
                                    className="rounded-full object-cover ring-4 ring-white dark:ring-slate-800 shadow-md w-20 h-20"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl ring-4 ring-white dark:ring-slate-800 shadow-md">
                                    {userData?.name ? userData.name.charAt(0).toUpperCase() : <HiUser />}
                                </div>
                            )}
                        </div>

                        {/* Name & Email */}
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                {userData?.name || 'ব্যবহারকারীর নাম'}
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                <HiMail className="text-slate-400 text-base" />
                                {userData?.email || 'ইমেইল পাওয়া যায়নি'}
                            </p>
                        </div>
                    </div>

                    {/* Signout Button */}
                    <div className="w-full sm:w-auto mt-2 sm:mt-0">
                        <button
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/60 border border-red-200 dark:border-red-900/40 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            <GoSignOut className={`text-lg ${isSigningOut ? 'animate-spin' : ''}`} />
                            <span>{isSigningOut ? 'সাইন আউট হচ্ছে...' : 'সাইন আউট'}</span>
                        </button>
                    </div>

                </div>

            </div>

            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all mt-6">
                <h1 className='font-bold mb-4'>তথ্য</h1>
                {/* update form  */}
                <form className='space-y-5' onSubmit={updateHandelar}>
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
                        <Label className="text-xs font-semibold text-black">
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
                        <Label className="text-xs font-semibold text-black">
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
                    <Button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:bg-emerald-400 hover:scale-[1.01] active:scale-[0.99]"
                    >
                        আপডেট
                    </Button>
                </form>
            </div>

            {/* Back to Home Link */}
            <div className="mt-6 text-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors px-4 py-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                >
                    <HiArrowLeft className="text-base" />
                    <span>হোম পেজে ফিরে যান</span>
                </Link>
            </div>
        </div>
    );
};

export default ProfilePage;