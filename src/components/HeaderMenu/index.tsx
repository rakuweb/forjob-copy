// import layer
import { css as emotionCss } from "@emotion/react";

import { cx, css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import { mq } from "../../constants/styles";

// type layer
export type DataProps = { isOpen: boolean; onClick: () => void };
export type PresenterProps = DataProps;

// presenter
export function HeaderMenu({ isOpen, onClick }: PresenterProps) {
  return (
    <div>
      <div
        // FIX:
        className={cx(
          flex({
            boxShadow: { base: `0px 3px 6px #00000029` },
            bg: `white`,
            w: { base: `45px`, lg: `${60 / 19.2}vw` },
            h: { base: `45px`, lg: `${60 / 19.2}vw` },
            direction: `column`,
            justify: `center`,
            align: `center`,
            transition: `all 0.5s;`,
            borderRadius: `100%`,
            _hover: {
              bg: `var(--white)`,
              "& .toggle_btn > .menu-line": {
                bg: `var(--midnight-blue)`,
              },
              "& .menu-text": {
                color: `var(--midnight-blue)`,
                transition: `all 0.5s;`,
              },
            },
          }),
          isOpen ? `open` : ``
        )}
        onClick={onClick}
        // css={styles}
      >
      <div className={`toggle_btn`} 
      // css={isOpen ? openStyle : ""}
      >
          <span className={`menu-line`} />
          <span className={`menu-line`} />
          <span className={`menu-line`} />
        </div>
      </div>
      <div
        className={cx(
          css({
            textAlign: `center`,
            mt: { base: `${10 / 3.75}vw`, lg: `${10 / 19.2}vw` },
            mx: `auto`,
            fontSize: { base: `11px`, lg: `${14 / 19.2}vw` },
            color: `#444444`,
            fontWeight: 700,
            fontFamily: `'Noto Sans JP', sans-serif;`,
          }),
          "menu-text"
        )}
      >
        {isOpen ? (
          <div
            className={css({
              color: `#4444444`,
            })}
          >
            閉じる
          </div>
        ) : (
          `メニュー`
        )}
      </div>
    </div>
  );
}

// styles
const styles = emotionCss`
  cursor: pointer;
  z-index: 3;
  /*============
.toggle_btn
=============*/
  .toggle_btn {
    display: block;
    position: relative;
    width: 26px;
    height: 30px;
    transition: all 0.5s;
    margin-left: auto;
    margin-right: auto;
    ${mq[2]} {
      width: ${26 / 19.2}vw;
      height: ${30 / 19.2}vw;
    }
  }

  .toggle_btn span {
    display: block;
    position: absolute;
    left: 0;
    width: 26px;
    height: 5px;
    background-color: #41a4fd;
    border-radius: 3px;
    transition: all 0.5s;
    ${mq[2]} {
      width: ${26 / 19.2}vw;
      height: ${5 / 19.2}vw;
      border-radius: ${3 / 19.2}vw;
    }
  }
  .toggle_btn span:nth-child(1) {
    top: 4px;
    width: 100%;
    ${mq[2]} {
      top: ${4 / 19.2}vw;
    }
  }
  .toggle_btn span:nth-child(2) {
    top: 14px;
    width: 100%;
    ${mq[2]} {
      top: ${14 / 19.2}vw;
    }
  }
  .toggle_btn span:nth-child(3) {
    bottom: 1px;
    width: 14px;
    ${mq[2]} {
      bottom: ${1 / 19.2}vw;
      width: ${14 / 19.2}vw;
    }
  }
  .toggle_btn span:hover {
    color: var(--curious-blue);
  }
`;

const openStyle = emotionCss`
  span {
    background-color: #fff;
  }

  span:nth-child(1) {
    -webkit-transform: translateY(10px) rotate(-315deg);
    transform: translateY(10px) rotate(-315deg);
  }

  span:nth-child(2) {
    -webkit-transform: translateY(0px) rotate(315deg);
    transform: translateY(0px) rotate(315deg);
  }
  span:nth-child(3) {
    opacity: 0;
  }
  ${mq[2]} {
    span:nth-child(1) {
      -webkit-transform: translateY(5.5px) rotate(-315deg);
      transform: translateY(5.5px) rotate(-315deg);
    }

    span:nth-child(2) {
      -webkit-transform: translateY(0px) rotate(315deg);
      transform: translateY(0px) rotate(315deg);
    }
    span:nth-child(3) {
      opacity: 0;
    }
  }
  ${mq[3]} {
    span:nth-child(1) {
      -webkit-transform: translateY(7px) rotate(-315deg);
      transform: translateY(7px) rotate(-315deg);
    }

    span:nth-child(2) {
      -webkit-transform: translateY(0px) rotate(315deg);
      transform: translateY(0px) rotate(315deg);
    }
    span:nth-child(3) {
      opacity: 0;
    }
  }

  ${mq[4]} {
    span:nth-child(1) {
      -webkit-transform: translateY(10px) rotate(-315deg);
      transform: translateY(10px) rotate(-315deg);
    }

    span:nth-child(2) {
      -webkit-transform: translateY(0px) rotate(315deg);
      transform: translateY(0px) rotate(315deg);
    }
    span:nth-child(3) {
      opacity: 0;
    }
  }
`;
