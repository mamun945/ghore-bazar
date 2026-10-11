import CatagoriesProductsPage from '@/app/components/CatagoriesProducts';


const CatagoriesProductsCardPage = async ({ params }: { params: Promise<{ categoriesId: string }> }) => {
    const {categoriesId} = await params;
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${categoriesId}`)
    const products = await res.json();
    return (
        <div className='container mx-auto my-4'>
            <CatagoriesProductsPage products={products}></CatagoriesProductsPage> 
        </div>
    );
};

export default CatagoriesProductsCardPage;