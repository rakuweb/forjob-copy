// nextjs/src/component/company/EmployeeFeedbackSlider.tsx

import React, { useState } from "react";
import Slider from "react-slick";
import ModalComponent from "../ModalComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { css } from "../../../../styled-system/css";
import { SampleNextArrow, SamplePrevArrow } from "../arrow";

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
            className={css({
              cursor: "pointer",
              borderRadius: "5px",
              maxHeight: "200px",
            })}
          >
            <div
              className={css({
                padding: "10px",

                backgroundColor: "rgba(248, 248, 248, 1)",
                borderRadius: "5px",

                base: { padding: `${5 / 3.75}vw  ` },
                md: { padding: "10px", margin: "0 10px 0 0" },
              })}
            >
              <div className={css({ display: "flex", alignItems: "center" })}>
                <img
                  src={`${baseURL}${feedback.attributes.image.data.attributes.url}`}
                  alt={`Image of ${feedback.attributes.occupation}`}
                  className={css({
                    borderRadius: "100%",
                    height: "50px",
                    width: "50px",
                    objectFit: "cover",
                  })}
                />
                <p
                  className={css({
                    color: "#666",

                    base: {
                      fontSize: `${12 / 3.75}vw`,
                      paddingLeft: `${10 / 3.75}vw`,
                    },
                    md: { fontSize: "12px", paddingLeft: "10px" },
                  })}
                >
                  {feedback.attributes.occupation}
                </p>
                <p
                  className={css({
                    color: "#666",
                    base: {
                      fontSize: `${12 / 3.75}vw`,
                      paddingLeft: `${10 / 3.75}vw`,
                    },
                    md: { fontSize: "12px", paddingLeft: "10px" },
                  })}
                >
                  {feedback.attributes.age}
                </p>
              </div>
              <p
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 6,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className={css({
                  color: "#666",
                  fontSize: "12px",
                  padding: "10px 0 0 0",
                })}
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
          <div style={{ maxHeight: "80vh", overflow: "auto" }}>
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                width: "100%",
              })}
            >
              <img
                src={`${baseURL}${selectedFeedback.attributes.image.data.attributes.url}`}
                alt={`Image of ${selectedFeedback.attributes.occupation}`}
                style={{ objectFit: "cover" }}
                className={css({
                  borderRadius: "100%",
                  base: { width: `${50 / 3.75}vw`, height: `${50 / 3.75}vw` },
                  md: { width: "100px", height: "100px" },
                })}
              />
              <p
                className={css({
                  base: {
                    fontSize: `${12 / 3.75}vw`,
                    paddingLeft: `${10 / 3.75}vw`,
                  },
                  md: { fontSize: "14px", paddingLeft: "20px" },
                })}
              >
                {selectedFeedback.attributes.occupation}
              </p>
              <p
                className={css({
                  base: {
                    fontSize: `${12 / 3.75}vw`,
                    paddingLeft: `${10 / 3.75}vw !important`,
                  },
                  md: { fontSize: "14px", paddingLeft: "20px" },
                })}
              >
                {selectedFeedback.attributes.age}
              </p>
            </div>
            <p
              style={{ width: "100%" }}
              className={css({
                base: {
                  fontSize: `${12 / 3.75}vw`,

                  marginTop: `${10 / 3.75}vw`,
                },
                md: {
                  fontSize: "14px",

                  marginTop: "40px",
                },
              })}
            >
              {selectedFeedback.attributes.text}
            </p>
          </div>
        </ModalComponent>
      )}
    </>
  );
};

export default EmployeeFeedbackSlider;
