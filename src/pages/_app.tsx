// nextjs/src/pages/_app.tsx

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "@/component/header";
import Footer from "@/component/footer";
import "@fontsource/noto-sans-jp";
import ReactGA from "react-ga4";

export default function App({ Component, pageProps }: AppProps) {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID || "");
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
