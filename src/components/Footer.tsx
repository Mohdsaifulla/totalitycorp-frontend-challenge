import Image from "next/image";
import logo from "../images/logo.png";
const Footer = () => {
  return (
    <div className="w-full h-20 bg-amazon_light flex items-center justify-center gap-4 text-gray-300">
      <Image src={logo} alt="logo" className="w-24" />
      <p className="text-sm -mt-4">All right reserved @saif</p>
    </div>
  );
};

export default Footer;
