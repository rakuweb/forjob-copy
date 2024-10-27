// nextjs/src/component/footer.tsx

import Link from "next/link";
import { css } from "../../styled-system/css";

const Footer = () => {
  return (
    <div className={css({})}>
      <div
        className={css({
          display: { base: ``, lg: `flex` },
          py: { base: `${40 / 3.75}vw`, lg: `${66 / 19.2}vw` },
          px: { base: `${20 / 3.75}vw`, lg: `${96 / 19.2}vw` },

          color: `#CCC`,
          fontWeight: `bold`,
          fontSize: {
            base: `${12 / 3.75}vw`,
            lg: `${16 / 19.2}vw`,
          },
        })}
      >
        <Link href={`/`}>
          <img
            src={`/svg/forjob.svg`}
            // src="/svg/sadojob.svg"
            alt={`新大BOXロゴ`}
            className={css({
              display: { base: `none`, lg: `block` },
              w: { base: `${170 / 3.75}vw`, lg: `${150 / 19.2}vw` },
              mr: { lg: `${370 / 19.2}vw` },
            })}
          />
        </Link>
        <div
          className={css({
            w: `fit-content`,
            mx: { base: `auto`, lg: `0` },
            pt: { base: ``, lg: `auto` },
            // pt: { base: ``, lg: `${20 / 19.2}vw` },
          })}
        >
          <Link
            href={`/contact`}
            className={css({
              mr: { lg: `${40 / 19.2}vw` },

              transition: `all .3s`,
              _hover: {
                filter: `opacity(50%)`,
              },
            })}
          >
            お問い合わせ
          </Link>
        </div>
        <div
          className={css({
            w: `fit-content`,
            mx: { base: `auto`, lg: `0` },
            // pt: { base: `${16 / 3.75}vw`, lg: `${20 / 19.2}vw` },
          })}
        >
          <Link
            href={`/privacy-policy`}
            className={css({
              mr: { lg: `${40 / 19.2}vw` },

              transition: `all .3s`,
              _hover: {
                filter: `opacity(50%)`,
              },
            })}
          >
            プライバシーポリシー
          </Link>
        </div>
        <div
          className={css({
            w: `fit-content`,
            mx: { base: `auto`, lg: `0` },
            // pt: { base: `${16 / 3.75}vw`, lg: `${20 / 19.2}vw` },
          })}
        >
          <Link
            href={`/teams`}
            className={css({
              mr: { lg: `${40 / 19.2}vw` },

              transition: `all .3s`,
              _hover: {
                filter: `opacity(50%)`,
              },
            })}
          >
            利用規約
          </Link>
        </div>
        <div
          className={css({
            w: `fit-content`,
            mx: { base: `auto`, lg: `0` },
            // pt: { base: `${16 / 3.75}vw`, lg: `${20 / 19.2}vw` },
          })}
        >
          <Link
            href={`https://rakuweb.jp/`}
            className={css({
              mr: { lg: `${40 / 19.2}vw` },
              pt: { base: ``, lg: `${20 / 19.2}vw` },
              transition: `all .3s`,
              _hover: {
                filter: `opacity(50%)`,
              },
            })}
          >
            運営会社
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
