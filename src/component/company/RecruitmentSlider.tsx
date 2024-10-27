// nextjs/src/component/company/RecruitmentSlider.tsx

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalComponent from "./ModalComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faLocationDot,
  faYenSign,
} from "@fortawesome/free-solid-svg-icons";
import { css } from "../../../styled-system/css";
import { SampleNextArrow, SamplePrevArrow } from "./arrow";

interface Recruitment {
  id: string;
  attributes: {
    occupation: string;
    minimum_salary: number;
    maximum_salary: number;
    work_place: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

interface RecruitmentSliderProps {
  recruitments: Recruitment[];
  baseURL: string;
}

const RecruitmentSlider: React.FC<RecruitmentSliderProps> = ({
  recruitments,
  baseURL,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRecruitmentClick = () => {
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
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {recruitments.map((recruitment: any) => (
          <div
            key={recruitment.id}
            onClick={handleRecruitmentClick}
            className="hover:cursor-pointer"
          >
            <div className="rounded-md md:mr-2.5">
              <img
                src={`${baseURL}${recruitment.attributes.image.data.attributes.url}`}
                alt={`Image of ${recruitment.attributes.occupation}`}
                className="rounded-md h-[53.33vw] md:h-[200px] w-full object-cover my-[1.33vw] md:my-2.5"
              />
              <h3 className="font-bold text-[3.2vw] md:text-sm">
                {recruitment.attributes.occupation}
              </h3>
              <div className="flex text-gray-500">
                <p className="text-[3.2vw] md:text-sm">
                  <FontAwesomeIcon icon={faYenSign} />
                  <span> </span>
                  {recruitment.attributes.minimum_salary}〜
                </p>
                <p className="text-[3.2vw] md:text-sm">
                  {recruitment.attributes.maximum_salary}
                </p>
                <p className="text-[3.2vw] md:text-sm ml-[2.67vw] md:ml-3.5">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span> </span>
                  {recruitment.attributes.work_place}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="text-left text-[2.67vw] md:text-sm max-w-xs mx-auto py-5">
          <h2>求人総件数: {recruitments.length}件</h2>
        </div>
        <div className="max-h-[80vh] overflow-auto">
          {recruitments.map((recruitment) => (
            <div
              key={recruitment.id}
              className="flex flex-col items-center mx-auto my-[3.2vw] md:my-5 p-[3.2vw] md:p-5"
            >
              <img
                src={`${baseURL}${recruitment.attributes.image.data.attributes.url}`}
                alt={`Image of ${recruitment.attributes.occupation}`}
                className="rounded-md w-72 object-cover"
              />
              <div className="text-left w-full max-w-xs pt-[2.67vw] md:pt-2.5">
                <h3 className="font-bold text-[3.2vw] md:text-sm">
                  {recruitment.attributes.occupation}
                </h3>
                <div className="flex text-gray-500">
                  <p className="text-[3.2vw] md:text-sm">
                    <FontAwesomeIcon icon={faYenSign} />
                    {recruitment.attributes.minimum_salary}〜
                  </p>
                  <p className="text-[3.2vw] md:text-sm">
                    {recruitment.attributes.maximum_salary}
                  </p>
                  <p className="text-[3.2vw] md:text-sm ml-[2.67vw] md:ml-3.5">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span> </span>
                    {recruitment.attributes.work_place}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ModalComponent>
    </>
  );
};

export default RecruitmentSlider;
