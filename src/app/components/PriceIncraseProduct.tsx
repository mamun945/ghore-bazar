import React from 'react';
import { IProduct } from '../type/type';
import ProductCardPage from './ProductCard';
import { TbTriangleFilled } from 'react-icons/tb';

const PriceIncraseProductPage = async() => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products')
    const headLines: IProduct[] = await res.json()
    const upProducts:IProduct[] = headLines.filter(item => String(item.change.dir) === 'up').sort((a, b) => b.change.pct - a.change.pct).slice(0,6)
    return (
        <div className='container mx-auto'>
           <div className='flex items-center gap-2 py-4'>
              <p className='text-red-500'><TbTriangleFilled /></p>
             <h1 className='font-bold text-2xl'>আজ দাম বেড়েছে</h1>
           </div>
           <div>
            {
            <ProductCardPage products={upProducts} ></ProductCardPage>
           }
           </div>
        </div>
    );
};

export default PriceIncraseProductPage;