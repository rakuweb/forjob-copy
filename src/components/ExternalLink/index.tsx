// import layer
import { ReactNode } from "react";

import { css, cx } from "../../../styled-system/css";
import type { SystemStyleObject } from "../../../styled-system/types";

// type layer
export type StyleProps = SystemStyleObject;
export type DataProps = {
  href: string;
  children: ReactNode;
  className?: string;
};
export type PresenterProps = StyleProps & DataProps;

// presenter
export function ExternalLink({
  href,
  className,
  children,
  ...props
}: PresenterProps) {
  return (
    <a
      href={href}
      className={cx(
        css(
          {
            transition: `all .3s`,
            _hover: {
              cursor: "pointer",
              opacity: 0.5,
              textDecoration: "none",
            },
          },
          props
        ),
        className
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
