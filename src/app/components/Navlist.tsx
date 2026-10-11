import React from 'react';
import { ICategory } from '../type/type';
import NavlistitemPage from './Navlistitem';

const NavlistPage = async () => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/categories')
    const datas: ICategory[] = await res.json();
    return (
        <div className='container mx-auto flex items-center gap-6 my-5'>
           <NavlistitemPage datas={datas} ></NavlistitemPage>
        </div>
    );
};

export default NavlistPage;