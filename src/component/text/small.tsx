import React from "react";
import { css } from "../../../styled-system/css";

interface TextProps {
  detail: string;
}

export const SmallText: React.FC<TextProps> = ({ detail }) => {
  return (
    <div
      className={css({
        mt: { base: `${18 / 3.75}vw`, lg: `${32 / 19.2}vw` },
        fontSize: { base: `${12 / 3.75}vw`, lg: `${16 / 19.2}vw` },
        color: `#39414e`,
        whiteSpace: `pre-wrap`,
        lineHeight: `2em`,
        letterSpacing: `0.1em`,
        fontWeight: `500`,
      })}
    >
      {detail}
    </div>
  );
};
