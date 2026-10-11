const FooterPage = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-100 shadow-sm p-6 mt-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <p className="text-sm sm:text-base font-semibold text-gray-800 flex items-center justify-center md:justify-start gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block"></span>
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>
                <p className="text-xs sm:text-sm text-gray-500 font-medium bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default FooterPage;