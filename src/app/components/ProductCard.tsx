import React from 'react';
import { IProduct } from '../type/type';
import ProductCard2Page from './ProductCard2';

interface ProductCardProps {
    products: IProduct[];
}

const ProductCardPage = ({ products }: ProductCardProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => {
                const isPriceUp = product.change?.dir === 'up';

                return (
                    <ProductCard2Page key={product.id} product={product} isPriceUp={isPriceUp}></ProductCard2Page>
                );
            })}
        </div>
    );
};

export default ProductCardPage;