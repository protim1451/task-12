import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Banner.css";  // Import the CSS file

const Banner = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <img src="https://i.ibb.co/1dXV8M3/1.jpg" alt="Banner 1" />
                </div>
                <div>
                    <img src="https://i.ibb.co/260DWSS/2.jpg" alt="Banner 2" />
                </div>
                <div>
                    <img src="https://i.ibb.co/897nMVB/3.jpg" alt="Banner 3" />
                </div>
                <div>
                    <img src="https://i.ibb.co/ncWJWCt/4.jpg" alt="Banner 4" />
                </div>
                <div>
                    <img src="https://i.ibb.co/r2zNKSt/5.jpg" alt="Banner 5" />
                </div>
                <div>
                    <img src="https://i.ibb.co/VYPVdNz/6.jpg" alt="Banner 6" />
                </div>
                <div>
                    <img src="https://i.ibb.co/GRRppth/7.jpg" alt="Banner 7" />
                </div>
                <div>
                    <img src="https://i.ibb.co/ccxfHkH/8.jpg" alt="Banner 8" />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
