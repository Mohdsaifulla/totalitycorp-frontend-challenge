import { Carousel } from "react-responsive-carousel";
import sliderImg_1 from "../images/sliders/sliderImg_1.jpg";
import sliderImg_2 from "../images/sliders/sliderImg_2.jpg";
import sliderImg_3 from "../images/sliders/sliderImg_3.jpg";
import Image from "next/image";
const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        interval={3000}
      >
        <div>
          <Image priority src={sliderImg_1} alt="slider-1" />
        </div>
        <div>
          <Image src={sliderImg_2} alt="slider-1" />
        </div>
        <div>
          <Image src={sliderImg_3} alt="slider-1" />
        </div>
      </Carousel>
      <div className="w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20"></div>
    </div>
  );
};

export default Banner;
