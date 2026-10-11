import Image from 'next/image';
import banner from '../../../public/bazar-hero 1.png';

const BannerPage = () => {
    const date = new Date();

    const banglaDate = new Intl.DateTimeFormat("bn-BD-u-ca-beng", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);

    return (
        <div className="container mx-auto my-6 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-green-900 to-slate-900 p-6 md:p-10 shadow-xl border border-emerald-800/30">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
                
                {/* Text Content */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/20 text-emerald-300 text-sm font-medium backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        {banglaDate}
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-wide">
                        আজকের বাজারের দাম <span className="text-emerald-400">এক নজরে</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* CTA Button */}
                    <div className="pt-2">
                        <button className="btn bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold border-none px-8 text-base shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                            সব পণ্য দেখুন
                        </button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="flex-1 flex justify-center md:justify-end">
                    <div className="relative group">
                        {/* Glow effect behind image */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
                        
                        <Image
                            src={banner}
                            alt="আজকের বাজার এর ব্যানার ছবি"
                            width={400}
                            height={400}
                            priority
                            className="relative rounded-2xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BannerPage;