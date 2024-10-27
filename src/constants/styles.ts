// import layer
import { css } from "@emotion/react";

// constant layer
export const global = css`
  @font-face {
    font-family: "YuGothic-Bold";
    font-style: normal;
    font-weight: 700;
    src: url("public/dev/fonts/YuGothic-Bold.otf") format("opentype");
  }
  @font-face {
    font-family: "YuGothic-Medium";
    font-style: normal;
    font-weight: 500;
    src: url("public/dev/fonts/YuGothic-Medium.otf") format("opentype");
  }

  .screen a {
    display: contents;
    text-decoration: none;
  }

  .container-center-horizontal {
    display: flex;
    flex-direction: row;
    justify-content: center;
    pointer-events: none;
    width: 100%;
  }

  .container-center-horizontal > * {
    flex-shrink: 0;
    pointer-events: auto;
  }

  * {
    box-sizing: border-box;
  }
`;

// constant layer
export const guide = css`
  :root {
    --alto: #dddddd;
    --black: #000000;
    --curious-blue: #2194e5;
    --daintree: #002641;
    --granite-gray: #666666;
    --green-blue: #066cb4f0;
    --licorice: #1a1311;
    --malibu: #89c9ff;
    --mandy: #e9495c;
    --midnight: #001d34;
    --midnight-blue: #003968;
    --mountain-mist: #999999;
    --navy-blue: #1978bb;
    --oslo-gray: #8a8d8e;
    --porcelain: #f0f3f5;
    --seagull: #85ceeb;
    --tulip-tree: #f9b73a;
    --west-side: #ff8c1b;
    --white: #ffffff;
    --white-2: #ffffffcc;

    --font-size-l: 18px;
    --font-size-m: 16px;
    --font-size-s: 14px;
    --font-size-xl: 21px;
    --font-size-xs: 12px;
    --font-size-xxl: 24px;
    --font-size-xxxl: 32px;

    --font-family-roboto: "Roboto", Helvetica;
    --font-family-yugothic-bold: "YuGothic-Bold", "Zen Kaku Gothic New",
      "Hiragino Sans", Helvetica;
    --font-family-yugothic-medium: "YuGothic-Medium", "Zen Kaku Gothic New",
      "Hiragino Sans", Helvetica;
  }
  .yugothic-medium-curious-blue-16px {
    color: var(--curious-blue);
    font-family: var(--font-family-yugothic-medium);
    font-size: var(--font-size-m);
    font-style: normal;
    font-weight: 500;
  }

  .yugothic-bold-midnight-blue-16px {
    color: var(--midnight-blue);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-m);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-navy-blue-32px {
    color: var(--navy-blue);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-xxxl);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-medium-midnight-blue-12px {
    color: var(--midnight-blue);
    font-family: var(--font-family-yugothic-medium);
    font-size: var(--font-size-xs);
    font-style: normal;
    font-weight: 500;
  }

  .yugothic-medium-midnight-blue-16px {
    color: var(--midnight-blue);
    font-family: var(--font-family-yugothic-medium);
    font-size: var(--font-size-m);
    font-style: normal;
    font-weight: 500;
  }

  .yugothic-bold-white-14px {
    color: var(--white);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-s);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-granite-gray-16px {
    color: var(--granite-gray);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-m);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-white-16px {
    color: var(--white);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-m);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-midnight-blue-32px {
    color: var(--midnight-blue);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-xxxl);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-navy-blue-24px {
    color: var(--navy-blue);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-xxl);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-midnight-blue-21px {
    color: var(--midnight-blue);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-xl);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-midnight-14px {
    color: var(--midnight);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-s);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-midnight-blue-14px {
    color: var(--midnight-blue);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-s);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-mandy-18px {
    color: var(--mandy);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-l);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-midnight-blue-18px {
    color: var(--midnight-blue);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-l);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-white-32px {
    color: var(--white);
    font-family: var(--font-family-yugothic-bold);
    font-size: var(--font-size-xxxl);
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-white-15px {
    color: var(--white);
    font-family: var(--font-family-yugothic-bold);
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-bold-white-42px {
    color: var(--white);
    font-family: var(--font-family-yugothic-bold);
    font-size: 42px;
    font-style: normal;
    font-weight: 700;
  }

  .yugothic-medium-white-12px {
    color: var(--white);
    font-family: var(--font-family-yugothic-medium);
    font-size: var(--font-size-xs);
    font-style: normal;
    font-weight: 500;
  }

  .border-1px-curious-blue {
    border: 1px solid var(--curious-blue);
  }

  .border-2-6px-licorice {
    border: 2.6px solid var(--licorice);
  }

  .border-1px-mountain-mist {
    border: 1px solid var(--mountain-mist);
  }

  .border-1px-malibu {
    border: 1px solid var(--malibu);
  }

  .border-1px-navy-blue {
    border: 1px solid var(--navy-blue);
  }
`;

// constant layer
export const breakpoints = [30, 48, 62, 80, 96, 23]; // em - [480, 768, 992, 1280, 1536, 375] px
export const breakpointsByPx = breakpoints.map((bp) => bp * 16);

export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}em)`);
