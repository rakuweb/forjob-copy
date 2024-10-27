// nextjs/src/component/company/image-slider.tsx

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import { css } from "../../../styled-system/css";
import { SampleNextArrow, SamplePrevArrow } from "./arrow";

interface ImageSliderProps {
  images: string[];
}

const AboutImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "3%",
    accessibility: true,
    arrows: true,
    pauseOnFocus: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} onClick={() => openModal(image)}>
            <img
              src={image}
              alt={`Slide ${index}`}
              style={{
                width: "97%",
                height: "auto",
                cursor: "pointer",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
      </Slider>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={currentImage}
      />
    </>
  );
};

export default AboutImageSlider;
