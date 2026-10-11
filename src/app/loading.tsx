import React from 'react';

const LoadingPage = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 my-12">
            <div className="max-w-sm w-full bg-white border border-gray-100 shadow-xl shadow-gray-100/80 rounded-3xl p-8 sm:p-10 text-center transition-all flex flex-col items-center justify-center">
                {/* Modern Spinner Animation */}
                <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
                </div>

                {/* Loading Title */}
                <h2 className="font-bold text-xl text-gray-800 mb-2">
                    লোড হচ্ছে...
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-500 font-medium">
                    অনুগ্রহ করে একটু অপেক্ষা করুন, বাজার দরের ডেটা লোড করা হচ্ছে।
                </p>
            </div>
        </div>
    );
};

export default LoadingPage;