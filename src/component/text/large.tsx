import React from "react";
import { css } from "../../../styled-system/css";

interface ListContentProps {
  detail: string;
}

export const LargeText: React.FC<ListContentProps> = ({ detail }) => {
  return (
    <div
      className={css({
        mt: { base: `${37 / 3.75}vw`, lg: `${60 / 19.2}vw` },
        fontSize: { base: `${20 / 3.75}vw`, lg: `${20 / 19.2}vw` },
        color: `#39414e`,
        fontWeight: `bold`,
      })}
    >
      {detail}
    </div>
  );
};
