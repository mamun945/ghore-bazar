import React from 'react';
import { IProduct } from '../type/type';
interface ProductCardProps {
    product: IProduct;
    isPriceUp?:boolean
}
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import Link from 'next/link';

const ProductCard2Page = ({product,isPriceUp}:ProductCardProps) => {
    return (
          <div>
            <Link href={`/products/${product.id}`}>
                <div
            key={product.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl hover:shadow-slate-950/60"
        >
            {/* Top Section: Icon & Name */}
            <div className="flex items-center gap-4">
                {/* Icon Wrapper with subtle hover scale */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 text-2xl border border-slate-700/60 transition-transform duration-300 group-hover:scale-105">
                    {product.image}
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                        {product.nameBn}
                    </h3>
                    <p className="text-xs font-medium text-slate-400">
                        প্রতি কেজি / একক
                    </p>
                </div>
            </div>

            {/* Separator Divider */}
            <div className="my-4 border-t border-slate-800" />

            {/* Bottom Section: Price & Dynamic Badge */}
            <div className="flex items-end justify-between gap-2">
                <div>
                    <span className="block text-xs font-medium text-slate-400">
                        আজকের দাম
                    </span>
                    <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-white tracking-tight">
                            ৳{product.today}
                        </span>
                    </div>
                </div>

                {/* Status Indicator Badge */}
                <div
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold border backdrop-blur-md ${isPriceUp
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}
                >
                    {isPriceUp ? (
                        <>
                            <GoTriangleUp className="text-sm" />
                            <span>+{product.change?.pct}%</span>
                        </>
                    ) : (
                        <>
                            <GoTriangleDown className="text-sm" />
                            <span>-{product.change?.pct}%</span>
                        </>
                    )}
                </div>
            </div>
        </div>
            </Link>
          </div>
    );
};

export default ProductCard2Page;