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
            className={css({
              // paddingRight: "5px",
              _hover: {
                cursor: "pointer",
              },
            })}
          >
            <div
              className={css({
                borderRadius: "5px",
                base: { margin: `0 0 0 0` },
                md: { margin: "0 10px 0 0" },
              })}
            >
              <img
                src={`${baseURL}${recruitment.attributes.image.data.attributes.url}`}
                alt={`Image of ${recruitment.attributes.occupation}`}
                className={css({
                  borderRadius: "5px",
                  height: "200px",
                  width: "100%",
                  objectFit: "cover",

                  base: {
                    height: `${200 / 3.75}vw`,
                    margin: `${5 / 3.75}vw 0 `,
                  },
                  md: { height: "200px", margin: " 10px 0 " },
                })}
              />
              <h3
                className={css({
                  fontWeight: "bold",
                  base: { fontSize: `${12 / 3.75}vw` },
                  md: { fontSize: "14px" },
                })}
              >
                {recruitment.attributes.occupation}
              </h3>
              <div className={css({ display: "flex", color: "#666" })}>
                <p
                  className={css({
                    base: { fontSize: `${12 / 3.75}vw` },
                    md: { fontSize: "14px" },
                  })}
                >
                  <FontAwesomeIcon icon={faYenSign} />
                  <span> </span>
                  {recruitment.attributes.minimum_salary}〜
                </p>
                <p
                  className={css({
                    base: { fontSize: `${12 / 3.75}vw` },
                    md: { fontSize: "14px" },
                  })}
                >
                  {recruitment.attributes.maximum_salary}
                </p>
                <p
                  className={css({
                    base: {
                      fontSize: `${12 / 3.75}vw`,
                      marginLeft: `${10 / 3.75}vw`,
                    },
                    md: { fontSize: "14px", marginLeft: "15px" },
                  })}
                >
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
        <div
          style={{ padding: "20px 0" }}
          className={css({
            textAlign: "left",
            base: { fontSize: `${10 / 3.75}vw` },
            md: { fontSize: "14px" },
            maxWidth: "300px",
            margin: " auto",
          })}
        >
          <h2>求人総件数: {recruitments.length}件</h2>
        </div>
        <div style={{ maxHeight: "80vh", overflow: "auto" }}>
          {recruitments.map((recruitment) => (
            <div
              key={recruitment.id}
              className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                base: {
                  margin: `0 auto ${12 / 3.75}vw`,
                  padding: `${12 / 3.75}vw`,
                },
                md: { margin: "0 auto 20px", padding: "20px" },
              })}
            >
              <img
                src={`${baseURL}${recruitment.attributes.image.data.attributes.url}`}
                alt={`Image of ${recruitment.attributes.occupation}`}
                className={css({
                  borderRadius: "5px",
                  height: "auto",
                  width: "300px",
                  objectFit: "cover",
                })}
              />
              <div
                className={css({
                  textAlign: "left",
                  width: "100%",
                  maxWidth: "300px",
                  base: { pt: `${10 / 3.75}vw` },
                  md: { pt: "10px" },
                })}
              >
                <h3
                  className={css({
                    fontWeight: "bold",
                    base: { fontSize: `${12 / 3.75}vw` },
                    md: { fontSize: "14px" },
                  })}
                >
                  {recruitment.attributes.occupation}
                </h3>
                <div className={css({ display: "flex", color: "#666" })}>
                  <p
                    className={css({
                      base: { fontSize: `${12 / 3.75}vw` },
                      md: { fontSize: "14px" },
                    })}
                  >
                    <FontAwesomeIcon icon={faYenSign} />
                    {recruitment.attributes.minimum_salary}〜
                  </p>
                  <p
                    className={css({
                      base: { fontSize: `${12 / 3.75}vw` },
                      md: { fontSize: "14px" },
                    })}
                  >
                    {recruitment.attributes.maximum_salary}
                  </p>
                  <p
                    className={css({
                      base: {
                        fontSize: `${12 / 3.75}vw`,
                        marginLeft: `${10 / 3.75}vw`,
                      },
                      md: { fontSize: "14px", marginLeft: "15px" },
                    })}
                  >
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
