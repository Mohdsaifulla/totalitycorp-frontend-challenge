import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Image } from "next/dist/client/image-component";
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { addToCart, addToFavorite } from "@/store/nextSlice";
import { useDispatch } from "react-redux";
import FormattedPrice from "@/components/FormattedPrice";
const DynamicPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>({});
  //   console.log(router.query);
  useEffect(() => {
    setProduct(router.query);
  }, [router.query]);
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-4 md:py-10">
      <div className="w-full grid md:grid-cols-3 bg-gray-100 rounded-lg">
        <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">
          <Image
            src={product.image}
            alt="Product img"
            height={500}
            width={500}
          />
          <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
            <span
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: product._id,
                    brand: product.brand,
                    category: product.category,
                    description: product.description,
                    image: product.image,
                    isNew: product.isNew,
                    oldPrice: product.oldPrice,
                    price: product.price,
                    title: product.title,
                    quantity: 1,
                  })
                )
              }
              className="w-full h-full border-b-[1px] border-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
            >
              <HiShoppingCart />
            </span>
            <span
              onClick={() =>
                dispatch(
                  addToFavorite({
                    _id: product._id,
                    brand: product.brand,
                    category: product.category,
                    description: product.description,
                    image: product.image,
                    isNew: product.isNew,
                    oldPrice: product.oldPrice,
                    price: product.price,
                    title: product.title,
                    quantity: 1,
                  })
                )
              }
              className="w-full h-full sborder-b-[1px] border-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
            >
              <FaHeart />
            </span>
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col gap-3 justify-center p-4">
          <p className="text-xs md:text-sm text-amazon_blue font-semibold -mb-3">
            {product.category}_{product.brand}
          </p>
          <h1 className="text-xl md:text-3xl font-semibold tracking-wide">
            {product.title}
          </h1>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div>
            <p className="text-base text-gray-600 flex items-center gap-1">
              Price:
              <span className="text-lg text-amazon_blue font-semibold">
                <FormattedPrice amount={product.price} />
              </span>
              <span className=" ml-1 line-through">
                <FormattedPrice amount={product.oldPrice} />
              </span>
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              You saved:
              <span>
                <FormattedPrice amount={product.oldPrice - product.price} />
              </span>
            </p>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: product._id,
                    brand: product.brand,
                    category: product.category,
                    description: product.description,
                    image: product.image,
                    isNew: product.isNew,
                    oldPrice: product.oldPrice,
                    price: product.price,
                    title: product.title,
                    quantity: 1,
                  })
                )
              }
              className="w-full md:w-96 h-12 bg-amazon_blue text-gray-200 hover:bg-amazon_yellow hover:text-amazon_blue duration-300 rounded-lg text-base font-semibold mt-5"
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPage;
