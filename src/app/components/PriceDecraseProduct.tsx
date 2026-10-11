import React from 'react';
import { IProduct } from '../type/type';
import ProductCardPage from './ProductCard';
import { TbTriangleInvertedFilled } from 'react-icons/tb';

const PriceDecraseProductPage = async () => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products')
    const headLines: IProduct[] = await res.json()
    const downProducts: IProduct[] = headLines.filter(item => String(item.change.dir) === 'down').sort((a, b) => a.change.pct - b.change.pct).slice(0,6)
    return (
        <div className='container mx-auto mt-10'>
            <div className='flex items-center gap-2 py-4'>
                <p className='text-green-500'><TbTriangleInvertedFilled /></p>
                <h1 className='font-bold text-2xl'>আজ দাম কমেছে</h1>
            </div>
            <div>
                {
                    <ProductCardPage products={downProducts} ></ProductCardPage>
                }
            </div>
        </div>
    );
};

export default PriceDecraseProductPage;