// nextjs/src/component/company/EmployeeFeedbackSlider.tsx

import React, { useState } from "react";
import Slider from "react-slick";
import ModalComponent from "./ModalComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { css } from "../../../styled-system/css";
import { SampleNextArrow, SamplePrevArrow } from "./arrow";

interface EmployeeFeedbackSliderProps {
  feedbacks: any[];
  baseURL: string;
}

const EmployeeFeedbackSlider: React.FC<EmployeeFeedbackSliderProps> = ({
  feedbacks,
  baseURL,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  const handleFeedbackClick = (feedback: any) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {feedbacks.map((feedback: any) => (
          <div
            key={feedback.id}
            onClick={() => handleFeedbackClick(feedback)}
            className="font-sans cursor-pointer rounded-md max-h-[200px]"
          >
            <div className="p-[1.33vw] md:p-2.5 bg-gray-100 rounded-md md:mr-2.5">
              <div className="flex items-center">
                <img
                  src={`${baseURL}${feedback.attributes.image.data.attributes.url}`}
                  alt={`Image of ${feedback.attributes.occupation}`}
                  className="rounded-full h-[50px] w-[50px] object-cover"
                />
                <p className="text-gray-600 text-[3.2vw] md:text-xs pl-[2.67vw] md:pl-2.5">
                  {feedback.attributes.occupation}
                </p>
                <p className="text-gray-600 text-[3.2vw] md:text-xs pl-[2.67vw] md:pl-2.5">
                  {feedback.attributes.age}
                </p>
              </div>
              <p
                className="font-sans text-gray-600 text-xs pt-2.5"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 6,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {feedback.attributes.text}
              </p>
            </div>
          </div>
        ))}
      </Slider>
      {selectedFeedback && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="max-h-[80vh] overflow-auto">
            <div className="flex items-center w-full">
              <img
                src={`${baseURL}${selectedFeedback.attributes.image.data.attributes.url}`}
                alt={`Image of ${selectedFeedback.attributes.occupation}`}
                className="rounded-full w-[13.33vw] h-[13.33vw] md:w-[100px] md:h-[100px] object-cover"
              />
              <p className="text-[3.2vw] md:text-base pl-[2.67vw] md:pl-5">
                {selectedFeedback.attributes.occupation}
              </p>
              <p className="text-[3.2vw] md:text-base pl-[2.67vw] md:pl-5">
                {selectedFeedback.attributes.age}
              </p>
            </div>
            <p className="text-[3.2vw] md:text-base mt-[2.67vw] md:mt-10 w-full">
              {selectedFeedback.attributes.text}
            </p>
          </div>
        </ModalComponent>
      )}
    </>
  );
};

export default EmployeeFeedbackSlider;
