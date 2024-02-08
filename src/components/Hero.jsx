import React from "react";
import { Carousel } from "flowbite-react";
import Caro1 from "../assets/caro1.jpg";
import Caro2 from "../assets/caro2.jpg";
import Caro3 from "../assets/caro3.jpg";

function Hero() {
  return (
    <div className="h-[500px] ">
      <Carousel className="rounded-none">
        <img src={Caro1} alt="..." className="w-full h-fit" />
        <img src={Caro2} alt="..." className="w-full h-fit" />
        <img src={Caro3} alt="..." className="w-full h-fit" />
      </Carousel>
    </div>
  );
}

export default Hero;
