import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import InternalLink from "../InternalLink";
import { ExternalLink } from "../ExternalLink";
import NImage from "../Image";
import { HeaderMenu } from "../HeaderMenu";

export default function Header({}) {
  const username = "";
  const signin = () => {};
  const signout = () => {};
  const handleOpen = () => {};
  const isOpen = false;

  return (
    <div className="w-full bg-white pt-[2.67vw] lg:pt-0 px-[5.33vw] lg:px-0 sticky top-0 z-10">
      <header className="flex justify-between items-center bg-white w-full h-[80px] lg:h-[6.46vw] mx-auto font-['Zen Kaku Gothic New','Hiragino Sans']">
        <div className="flex items-center">
          <InternalLink href={""}>
            <div className="lg:pt-[0.42vw] w-[36.27vw] md:w-[17.58vw] lg:w-[9.53vw] ml-4">
              <NImage
                image={{
                  src: `/svg/forjob.svg`,
                  width: 300,
                  height: 95,
                  alt: ``,
                  loading: `eager`,
                  priority: true,
                }}
              />
            </div>
          </InternalLink>
          <div className="hidden lg:block text-[#39414E] text-[0.89vw] ml-[3.13vw] mt-[0.1vw] font-['Noto Sans JP'] font-semibold">
            新大生のための求人サイト
          </div>
        </div>

        <div className="flex items-center lg:mt-[0.52vw]">
          <ExternalLink href={""}>
            <div className="hidden lg:block text-[#39414E] text-[0.89vw] mr-[1.72vw] mt-[0.1vw]">
              採用担当者はこちら
            </div>
          </ExternalLink>
          {username ? (
            <div className="hidden lg:block text-[#444444] font-bold text-[0.73vw] mr-[1.56vw]">
              {username}
              <span className="font-medium">さん ようこそ！</span>
            </div>
          ) : (
            <div className="hidden" />
          )}

          {username ? (
            <div
              className="hidden lg:flex items-center justify-center rounded-[0.52vw] w-[7.92vw] h-[2.29vw] text-[0.89vw] text-center text-white bg-gradient-to-l from-[#0EF4FF] to-[#41A4FD] font-semibold transition-all duration-300 hover:opacity-50 mr-[1.72vw] cursor-pointer"
              onClick={() => signout()}
            >
              ログアウト
            </div>
          ) : (
            <div
              className="hidden lg:flex items-center justify-center rounded-[0.52vw] w-[7.92vw] h-[2.29vw] text-[0.89vw] text-center text-white bg-gradient-to-l from-[#0EF4FF] to-[#41A4FD] font-semibold transition-all duration-300 hover:opacity-50 mr-[1.72vw] cursor-pointer"
              onClick={signin}
            >
              ログイン
            </div>
          )}
          <div className="block lg:mt-[0.78vw]">
            <HeaderMenu isOpen={isOpen} onClick={handleOpen} />
          </div>
        </div>

        {/*show && <MenuDrawer isOpen={isOpen} onClose={onClose} />*/}
      </header>
    </div>
  );
}
