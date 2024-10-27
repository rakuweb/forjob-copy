import React from "react";
import { css } from "../../../styled-system/css";

interface TextProps {
  title: string;
  bgcolor: string;
  // linecolor: string;
  fontcolor: string;
}

export const Tags: React.FC<TextProps> = ({
  title,
  bgcolor,
  // linecolor,
  fontcolor,
  ...props
}) => {
  return (
    <div
      className={css({
        // w: `fit-content`,
        // borderRadius: {
        //   base: `${5 / 3.75}vw`,
        //   lg: `${90 / 12}vw`,
        // },
        // px: {
        //   base: `${5 / 4.28}vw`,
        //   lg: `${20 / 12}vw`,
        // },
        bg: bgcolor,
        color: fontcolor,
        // borderColor: linecolor,
        // fontSize: {
        //   base: `${16 / 3.75}vw`,
        //   lg: `${8 / 12}vw`,
        // },
      })}
    >
      {title}
    </div>
  );
};
