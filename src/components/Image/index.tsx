// import layer
import { CSSProperties, FC } from "react";
import NextImage from "next/image";
import { css, cx } from "../../../styled-system/css";
import type { ImageProps } from "next/image";

import type { SystemStyleObject } from "../../../styled-system/types";

// type layer
export type StyleProps = SystemStyleObject & {
  style?: CSSProperties;
  className?: string;
};
export type DataProps = { image: ImageProps };
export type NImageProps = StyleProps & DataProps;

// presenter
export default function Image({
  image,
  style,
  className,
  ...props
}: NImageProps) {
  return (
    <div
      className={cx(
        css(
          {
            position: `relative`,
          },
          props
        ),
        className
      )}
    >
      <NextImage loading={`lazy`} {...image} style={style} />
    </div>
  );
}
