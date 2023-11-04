import Image from "next/image";
import logo from "../../images/logo.png";
import cartIcon from "../../images/cartIcon.png";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { StateProps, StoreProduct } from "../../../type";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { addUser } from "@/store/nextSlice";
import { constants } from "buffer";
import SearchProduct from "../SearchProduct";

const Header = () => {
  const { data: session } = useSession();
  const [allData, setAllData] = useState([]);
  const { productData, favoriteData, userInfo, allProducts } = useSelector(
    (state: StateProps) => state.next
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setAllData(allProducts.allProducts);
  }, [allProducts]);

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    }
  }, [session]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProduct, setFilteredProducts] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    const filtered = allData.filter((item: StoreProduct) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);
  return (
    <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
      <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
        <Link
          href={"/"}
          className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex      items-center justify-center h-[70%]"
        >
          <Image className="w-28 object-cover" src={logo} alt="logoImg" />
        </Link>
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden md:inline-flex gap-1">
          <SlLocationPin />
          <div className="text-xs">
            <p>Deliver to</p>
            <p className="text-white font-bold uppercase">India</p>
          </div>
        </div>
        <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
          <input
            onChange={handleSearch}
            value={searchQuery}
            type="text"
            placeholder="Search products..."
            className="w-full h-full rounded-md px2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
          />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md">
            <HiOutlineSearch />
          </span>
          {/* searching filter... */}
          {searchQuery && (
            <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
              {filteredProduct.length > 0 ? (
                <>
                  {searchQuery&&filteredProduct.map((item:StoreProduct)=>(
                   
                      <Link className="w-full border-b-[1px] border-gray-400 flex items-center gap-4" key={item._id} href={{pathname:`${item._id}`,query:{
                        _id: item._id,
                        brand: item.brand,
                        category: item.category,
                        description: item.description,
                        image: item.image,
                        isNew: item.isNew,
                        oldPrice: item.oldPrice,
                        price: item.price,
                        title: item.title,
                        quantity: 1,

                      }}}
                      onClick={()=>setSearchQuery('')}
                      >
                    <SearchProduct item={item}/>
                      </Link>
                  
                  ))}
                </>
              ) : (
                <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold animate-bounce">Product is not Available...</p>
                </div>
              )}
            </div>
          )}
        </div>
        {userInfo ? (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <img
              src={userInfo.image}
              alt="usrImage"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-xs text-gray-100 flex flex-col justify-between">
              <p className="text-white font-bold">{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <p>Hello, sign in</p>
            <p className="text-white font-bold flex items-center justify-center">
              Account & Lists
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
        
        <div className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative">
        <Link href={"/favorite"}>
          <p>Marked</p>
          <p className="text-white font-bold">& Favorite</p>
          {favoriteData.length > 0 && (
            <span className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow">
              {favoriteData.length}
            </span>
          )}
           </Link>
        </div>
       
        <Link
          href={"/cart"}
          className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <Image
            src={cartIcon}
            alt="cartImage"
            className="w-auto object-cover h-8"
          />
          <p className="text-xs text-white font-bold mt-3">Cart</p>
          <span className="absolute text-amazon_yellow text-xs top-2 left-[29px] font-semibold">
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
