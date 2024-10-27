import React from "react";
import { css } from "../../../../styled-system/css";

interface TextProps {
  title: string;
  disabled: boolean;
}

export const ConfirmationButton: React.FC<TextProps> = ({
  title,
  disabled,
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
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
        overflow: `hidden`,
        py: {
          base: `${5 / 4.28}vw`,
          lg: `0`,
        },
        mt: { base: `${20 / 3.75}vw`, md: `${30 / 19.2}vw` },
        mx: `auto`,
        background: `transparent linear-gradient(270deg, #0EDAFFBC 0%, #41A4FD 100%) 0% 0% no-repeat padding-box;`,
        color: `white`,
        fontSize: {
          base: `${16 / 3.75}vw`,
          lg: `${27 / 19.2}vw`,
        },
        fontWeight: `bold`,
        transition: `all .3s`,
        opacity: disabled ? `50%` : `100%`,
        _hover: {
          cursor: !disabled ? `pointer` : `not-allowed`,
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
    </button>
  );
};
