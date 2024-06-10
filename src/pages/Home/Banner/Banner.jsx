import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Banner.css"; 

const Banner = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <img src="https://i.ibb.co/P50cw4p/cat3.jpg" alt="Banner 1" />
                </div>
                <div>
                    <img src="https://i.ibb.co/hZN0CFW/dog6.jpg" alt="Banner 8" />
                </div>
                <div>
                    <img src="https://i.ibb.co/wgH28Sm/bird3.jpg" alt="Banner 2" />
                </div>
                <div>
                    <img src="https://i.ibb.co/2k2RHk7/rabbit1.jpg" alt="Banner 3" />
                </div>
                <div>
                    <img src="https://i.ibb.co/VNK0ysG/cat6.jpg" alt="Banner 4" />
                </div>
                <div>
                    <img src="https://i.ibb.co/mFZNJ2f/dog7.jpg" alt="Banner 5" />
                </div>
                {/* <div>
                    <img src="https://i.ibb.co/VYPVdNz/6.jpg" alt="Banner 6" />
                </div>
                <div>
                    <img src="https://i.ibb.co/GRRppth/7.jpg" alt="Banner 7" />
                </div>
                <div>
                    <img src="https://i.ibb.co/ccxfHkH/8.jpg" alt="Banner 8" />
                </div>
                <div>
                    <img src="https://i.ibb.co/L6KT7Ch/banner2.jpg" alt="Banner 8" />
                </div>
                <div>
                    <img src="https://i.ibb.co/k69n1d3/banner4.jpg" alt="Banner 8" />
                </div> */}
            </Carousel>
        </div>
    );
};

export default Banner;
