import Banner from "@/components/Banner";
import Product from "@/components/Product";
import { ProductProps } from "../../type";
import { useEffect } from "react";
import { setAllProducts } from "@/store/nextSlice";
import { useDispatch } from "react-redux";
interface props {
  productData: ProductProps;
}
export default function Home({ productData }: props)

{

const dispatch =useDispatch()
useEffect(()=>{
  dispatch(setAllProducts({allProducts:productData}))
},[productData])

  return (
    <main>
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="relative md:-mt-20 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
        <Product productData={productData} />
        </div>
      </div>
    </main>
  );
}

// server side rendering
export const getServerSideProps = async () => {
  const res = await fetch("https://fakestoreapiserver.reactbd.com/tech");
  const productData = await res.json();
  return { props: { productData } };
};
