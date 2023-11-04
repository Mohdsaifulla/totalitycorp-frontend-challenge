import React from "react";
import { ProductProps } from "../../type";
import { type } from "os";
import FormattedPrice from "./FormattedPrice";
interface Props {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  _id: number;
}

type Item = {
  item: Props;
};
const SearchProduct = ({ item }: Item) => {
  return (
    <div className="flex items-center gap-4">
      <img src={item.image} alt="product-image" className="w-24" />
      <div>
        {item.brand}_{item.category}
        <p className="text-lg font-medium">{item.title}</p>
        <p className="text-xs">{item.description.substring(0,100)}</p>
        <p className="text-base text-gray-600 flex items-center gap-1">
              Price:
              <span className="text-lg text-amazon_blue font-semibold">
                <FormattedPrice amount={item.price} />
              </span>
              <span className=" ml-1 line-through">
                <FormattedPrice amount={item.oldPrice} />
              </span>
            </p>
      </div>
      <div className="flex-1 text-right px-4">
        <p className="text-base font-semibold animate-bounce text-amazon_blue">
          Save <FormattedPrice amount={item.oldPrice-item.price}/>
        </p>
      </div>
    </div>
  );
};

export default SearchProduct;
