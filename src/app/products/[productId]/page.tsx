import { alter, IProduct } from "@/app/type/type";
import { Table } from "@heroui/react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdHome } from "react-icons/md";

const ProductCategorisPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
    const { productId } = await params;
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${productId}`);
    const product: IProduct = await res.json();
    const isPriceUp = product.change?.dir === 'up';
    
    if (!product?.id) {
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
    }

    // হিসাব করার জন্য সব বাজারের সর্বনিম্ন ও সর্বাধিক দামগুলোর অ্যারে তৈরি
    const minPrices:number[] = product?.market?.map((m:alter) => m.min) || [0];
    const maxPrices:number[] = product?.market?.map((m:alter) => m.max) || [0];
    const overallMin = Math.min(...minPrices);
    const overallMax = Math.max(...maxPrices);
    // const overallAvg = Math.round((overallMin + overallMax) / 2);

    return (
        <div className="container mx-auto my-6 px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 font-medium mb-6 overflow-x-auto whitespace-nowrap pb-2">
                <span className="hover:text-emerald-600 cursor-pointer transition-colors">হোম</span> 
                <MdKeyboardArrowLeft className="text-base text-gray-400" /> 
                <span className="hover:text-emerald-600 cursor-pointer transition-colors">{product.categoryNameBn}</span> 
                <MdKeyboardArrowLeft className="text-base text-gray-400" /> 
                <span className="text-gray-800 font-semibold">{product.nameBn}</span>
            </nav>

            {/* First Card - Main Product Banner */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-5 sm:p-8 bg-white border border-gray-100 shadow-xl shadow-gray-100/80 rounded-3xl my-6 gap-6 transition-all">
                <div className="flex items-start sm:items-center gap-4 w-full lg:w-auto">
                    <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 flex items-center justify-center text-3xl shadow-inner shrink-0">
                        {product.image}
                    </div>
                    <div>
                        <h1 className="font-extrabold text-2xl sm:text-3xl text-gray-900 mb-1">{product?.nameBn}</h1>
                        <p className="text-gray-500 text-xs sm:text-sm font-medium mb-3">প্রতি কেজি · {product?.categoryNameBn}</p>
                        <span className="inline-flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full text-xs text-gray-600 font-medium border border-gray-200">
                            গতকালের তুলনায় আজ দাম {isPriceUp ? <span className="text-rose-600 font-semibold">বেড়েছে</span> : <span className="text-emerald-600 font-semibold">কমেছে</span>} · 
                            <strong className="text-gray-900">{Math.abs(product.today - product.yesterday)} টাকা</strong>
                        </span>
                    </div>
                </div>

                <div className="text-left lg:text-right bg-gray-50/80 lg:bg-transparent p-4 lg:p-0 rounded-2xl w-full lg:w-auto border lg:border-0 border-gray-100 flex flex-col items-start lg:items-end justify-between">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">আজকের দাম</p>
                        <h1 className="font-black text-3xl sm:text-4xl text-gray-900 mb-1">
                            {product.today} <span className="text-base sm:text-lg font-medium text-gray-500">টাকা</span>
                        </h1>
                        <p className="text-xs text-gray-400 mb-3">প্রতি কেজি / হিসাবে</p>
                    </div>
                    <div
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full shadow-sm ${
                            isPriceUp ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}
                    >
                        {isPriceUp ? (
                            <>
                                <GoTriangleUp className="text-base" />
                                <span>+{product.change?.pct}% বৃদ্ধি</span>
                            </>
                        ) : (
                            <>
                                <GoTriangleDown className="text-base" />
                                <span>-{product.change?.pct}% হ্রাস</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Second Card - Price Summary */}
            <div className="bg-white border border-gray-100 p-5 sm:p-8 rounded-3xl shadow-xl shadow-gray-100/80 my-6">
                <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-6 flex items-center gap-2.5">
                    <span className="w-2.5 h-6 bg-emerald-500 rounded-full"></span>
                    দামের সারসংক্ষেপ
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-gradient-to-br from-emerald-50/40 to-white border border-emerald-100/70 p-5 rounded-2xl shadow-sm transition-all hover:shadow-md">
                        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">সর্বনিম্ন দাম</p>
                        <h3 className="font-black text-emerald-600 text-2xl mb-1">{overallMin} টাকা</h3>
                        <p className="text-xs text-gray-500 font-medium">সবচেয়ে কম দামের বাজার</p>
                    </div>

                    <div className="bg-gradient-to-br from-rose-50/40 to-white border border-rose-100/70 p-5 rounded-2xl shadow-sm transition-all hover:shadow-md">
                        <p className="text-xs font-bold text-rose-700 uppercase tracking-wide mb-2">সর্বাধিক দাম</p>
                        <h3 className="font-black text-rose-600 text-2xl mb-1">{overallMax} টাকা</h3>
                        <p className="text-xs text-gray-500 font-medium">সবচেয়ে বেশি দামের বাজার</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50/40 to-white border border-blue-100/70 p-5 rounded-2xl shadow-sm transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
                        <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">গড় দাম</p>
                        <h3 className="font-black text-blue-600 text-2xl mb-1">{overallAvg} টাকা</h3>
                        <p className="text-xs text-gray-500 font-medium">প্রতি কেজি-এর হিসাবে</p>
                    </div>
                </div>
            </div>

            {/* Last Card - Market Table */}
            <div className="bg-white border border-gray-100 p-5 sm:p-8 rounded-3xl shadow-xl shadow-gray-100/80 my-6">
                <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-6 flex items-center gap-2.5">
                    <span className="w-2.5 h-6 bg-emerald-500 rounded-full"></span>
                    বাজারভিত্তিক আজকের দাম
                </h2>
                <div className="overflow-hidden rounded-2xl border border-gray-100">
                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content aria-label="Market price list" className="min-w-[650px] w-full">
                                <Table.Header className="bg-gray-50/70">
                                    <Table.Column isRowHeader className="font-bold text-gray-600 py-4 px-4 text-sm">বাজার</Table.Column>
                                    <Table.Column className="font-bold text-gray-600 py-4 px-4 text-sm">বিভাগ</Table.Column>
                                    <Table.Column className="font-bold text-gray-600 py-4 px-4 text-sm">সর্বনিম্ন</Table.Column>
                                    <Table.Column className="font-bold text-gray-600 py-4 px-4 text-sm">সর্বাধিক</Table.Column>
                                    <Table.Column className="font-bold text-gray-600 py-4 px-4 text-sm">গড়</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {product?.market?.map((market: alter, index: number) => (
                                        <Table.Row key={index} className="hover:bg-gray-50/60 transition-colors border-b border-gray-50 last:border-none">
                                            <Table.Cell className="font-semibold text-gray-800 py-4 px-4">{market.market}</Table.Cell>
                                            <Table.Cell className="text-gray-600 py-4 px-4">{market.division}</Table.Cell>
                                            <Table.Cell className="text-emerald-600 font-semibold py-4 px-4">{market.min} টাকা</Table.Cell>
                                            <Table.Cell className="text-rose-600 font-semibold py-4 px-4">{market.max} টাকা</Table.Cell>
                                            <Table.Cell className="text-gray-900 font-bold py-4 px-4">{Math.round((market.max + market.min) / 2)} টাকা</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ProductCategorisPage;