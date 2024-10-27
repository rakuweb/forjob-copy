import React from "react";
import { css } from "../../../styled-system/css";

interface TextProps {}

export const RequiredMark: React.FC<TextProps> = ({}) => {
  return (
    <div
      className={css({
        w: `fit-content`,
        px: { base: `${8 / 3.75}vw`, lg: `${8 / 19.2}vw` },
        bg: `#F26601`,
        color: `white`,
        fontWeight: `bold`,
      })}
    >
      {`必須`}
    </div>
  );
};
