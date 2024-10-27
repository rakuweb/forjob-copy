import React from "react";
import { css } from "../../../../styled-system/css";
import router from "next/router";
import Link from "next/link";

interface TextProps {
  title: string;
}

export const BackButton: React.FC<TextProps> = ({ title, ...props }) => {
  return (
    <Link
      href={`/`}
      className={css({
        display: `flex`,
        w: {
          base: `${345 / 3.75}vw`,
          lg: `${348 / 19.2}vw`,
        },
        borderRadius: {
          base: `${5 / 3.75}vw`,
          lg: `${15 / 19.2}vw`,
        },
        py: {
          base: `${5 / 4.28}vw`,
          lg: `${0 / 19.2}vw`,
        },
        overflow: `hidden`,
        mt: { base: `${20 / 3.75}vw`, md: `${30 / 19.2}vw` },
        mx: `auto`,
        background: `#c4c4c4`,
        color: `white`,
        fontSize: {
          base: `${16 / 3.75}vw`,
          lg: `${27 / 19.2}vw`,
        },
        fontWeight: `bold`,
        transition: `all .3s`,
        _hover: {
          filter: `opacity(50%)`,
        },
      })}
    >
      <div
        className={css({
          display: `flex`,
          mx: `auto`,
        })}
      >
        {title}
      </div>
    </Link>
  );
};
