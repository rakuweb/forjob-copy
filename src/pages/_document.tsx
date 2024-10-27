import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="jp">
      <Head>
        <meta property="og:url" content="https://shindaibox.com/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favico.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
