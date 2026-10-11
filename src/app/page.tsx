import AllProductsPage from "./components/AllProducts";
import BannerPage from "./components/Banner";
import PriceDecraseProductPage from "./components/PriceDecraseProduct";
import PriceIncraseProductPage from "./components/PriceIncraseProduct";



export default function Home() {
  return (
    <div>
      <BannerPage></BannerPage>
      <PriceIncraseProductPage></PriceIncraseProductPage>
      <PriceDecraseProductPage></PriceDecraseProductPage>
      <AllProductsPage></AllProductsPage>
    </div>
  );
}
