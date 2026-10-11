import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css"
import { IProduct } from "../type/type";
import { Span } from "next/dist/trace";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import MarqueeClientPage from "./MarqueeClient";


const MarqueePage = async () => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products')
    const headLines: IProduct[] = await res.json();
    return (
        <div className="border-y border-gray-400 py-2">
            <MarqueeClientPage products={headLines}></MarqueeClientPage>
        </div>
    );
};

export default MarqueePage;