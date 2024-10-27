// nextjs/src/component/company/arrow.tsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { css } from "../../../styled-system/css";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const SampleNextArrow: React.FC<ArrowProps> = ({ style, onClick }) => (
  <div
    style={{ ...style }}
    className={css({
      base: {
        display: "none !important",
      },
      lg: {
        display: "flex !important",
        position: "absolute",
        height: "30px",
        width: "30px",
        borderRadius: "50%",
        top: "0",
        right: "-35px",
        bottom: "0",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      },
      _hover: {
        cursor: "pointer",
        background: "rgba(121, 121, 121, 0.1)",
      },
    })}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faAngleRight} className={css({ color: "#555" })} />
  </div>
);

export const SamplePrevArrow: React.FC<ArrowProps> = ({ style, onClick }) => (
  <div
    style={{ ...style }}
    className={css({
      base: {
        display: "none !important",
      },
      lg: {
        display: "flex !important",
        position: "absolute",
        height: "30px",
        width: "30px",
        borderRadius: "50%",
        top: "0",
        left: "-35px",
        bottom: "0",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      },
      _hover: {
        cursor: "pointer",
        background: "rgba(121, 121, 121, 0.1)",
      },
    })}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faAngleLeft} className={css({ color: "#555" })} />
  </div>
);

export default { SampleNextArrow, SamplePrevArrow };
