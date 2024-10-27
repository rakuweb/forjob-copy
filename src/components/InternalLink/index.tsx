import { ReactNode } from "react";
import type { SystemStyleObject } from "../../../styled-system/types";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { css, cx } from "../../../styled-system/css";

// type layer
export type StyleProps = SystemStyleObject & NextLinkProps;
export type DataProps = { children: ReactNode; className?: string };
export type InternalLinkProps = StyleProps & DataProps;

export default function InternalLink({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref = true,
  prefetch = false,
  locale,
  className,
  ...props
}: InternalLinkProps) {
  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      <div
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
      >
        {children}
      </div>
    </NextLink>
  );
}
