import { IProduct } from '../type/type';
import ProductCardPage from './ProductCard';

const AllProductsPage = async() => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products')
    const headLines: IProduct[] = await res.json()
    return (
        <div className='container mx-auto my-20'>
            <div className='mb-2'>
                <h1 className='font-bold text-2xl'>সব পণ্য</h1>
                <p className='text-gray-400'>মোট {headLines.length}টি পণ্য দেখানো হচ্ছে</p>
            </div>
           <ProductCardPage products={headLines}></ProductCardPage>
        </div>
    );
};

export default AllProductsPage;