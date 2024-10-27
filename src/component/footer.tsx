// nextjs/src/component/footer.tsx

import Link from "next/link";
import { css } from "../../styled-system/css";

const Footer = () => {
  return (
    <div>
      <div className="text-gray-300 font-bold text-[3.2vw] lg:text-[0.83vw] py-[10.67vw] lg:py-[3.44vw] px-[5.33vw] lg:px-[5vw] lg:flex">
        <Link href={`/`}>
          <img
            src={`/svg/forjob.svg`}
            alt={`新大BOXロゴ`}
            className="hidden lg:block w-[45.33vw] lg:w-[7.81vw] lg:mr-[19.27vw]"
          />
        </Link>
        <div className="w-fit mx-auto lg:mx-0 lg:pt-0">
          <Link
            href={`/contact`}
            className="transition-all duration-300 lg:mr-[2.08vw] hover:opacity-50"
          >
            お問い合わせ
          </Link>
        </div>
        <div className="w-fit mx-auto lg:mx-0">
          <Link
            href={`/privacy-policy`}
            className="transition-all duration-300 lg:mr-[2.08vw] hover:opacity-50"
          >
            プライバシーポリシー
          </Link>
        </div>
        <div className="w-fit mx-auto lg:mx-0">
          <Link
            href={`/teams`}
            className="transition-all duration-300 lg:mr-[2.08vw] hover:opacity-50"
          >
            利用規約
          </Link>
        </div>
        <div className="w-fit mx-auto lg:mx-0">
          <Link
            href={`https://rakuweb.jp/`}
            className="transition-all duration-300 lg:mr-[2.08vw] lg:pt-[1.04vw] hover:opacity-50"
          >
            運営会社
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
