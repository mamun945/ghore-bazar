import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdHome } from "react-icons/md";

export default function NotFoundPage(){
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 my-12">
            <div className="max-w-md w-full bg-white border border-gray-100 shadow-xl shadow-gray-100/80 rounded-3xl p-8 sm:p-10 text-center transition-all">
                {/* Icon / Badge */}
                <div className="w-20 h-20 bg-rose-50 border border-rose-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-rose-500 shadow-inner">
                    <FaExclamationTriangle className="text-3xl" />
                </div>

                {/* 404 Heading */}
                <h1 className="font-black text-6xl text-gray-900 mb-2 tracking-tight">
                    ৪০৪
                </h1>
                <h2 className="font-bold text-xl text-gray-800 mb-3">
                    পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">
                    দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ।
                </p>

                {/* Back to Home Button */}
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                    <MdHome className="text-lg" />
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

