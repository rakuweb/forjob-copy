// nextjs/src/component/header.tsx

import React, { useEffect, useState } from "react";
import Link from "next/link";
import liff from "@line/liff";
import axios from "axios";
import { css } from "../../styled-system/css";

const Header = () => {
  const [username, setUsername] = useState("");
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const LiffId = process.env.NEXT_PUBLIC_LIFF_ID;
  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: LiffId || "" });
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          registerOrLoginUser(
            profile.userId,
            `${profile.userId}@gmail.com`,
            profile.displayName
          );
        } else {
          setUsername("");
        }
      } catch (err) {
        console.log("Liff Initialization Error", err);
      }
    };
    initializeLiff();
  }, []);

  const registerOrLoginUser = async (
    lineId: string,
    lineEmail: string,
    lineUsername: string
  ) => {
    try {
      const existingUserResponse = await axios.get(
        `${strapiBaseUrl}/api/users?email=${lineEmail}`
      );
      if (existingUserResponse.data && existingUserResponse.data.length > 0) {
        const loginResponse = await axios.post(
          `${strapiBaseUrl}/api/auth/local`,
          {
            identifier: lineEmail,
            password: lineId,
          }
        );
        sessionStorage.setItem("jwt", loginResponse.data.jwt);
        sessionStorage.setItem("userId", loginResponse.data.user.id);
        sessionStorage.setItem("name", loginResponse.data.user.name);
        sessionStorage.setItem("mail", loginResponse.data.user.mail);
        sessionStorage.setItem("lineUserId", lineId);
        setUsername(loginResponse.data.user.username);

        liff.logout();
      } else {
        alert("ログインできませんでした。");
        liff.logout();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error in Strapi user check/register/login:", error);
      alert("ログイン処理中にエラーが発生しました。");
      liff.logout();
      window.location.reload();
    }
  };

  const handleLogin = () => {
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  };

  const handleLogout = () => {
    liff.logout();
    sessionStorage.removeItem("jwt");
    setUsername("");
    window.location.reload();
  };

  return (
    <header>
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          py: { base: `${10 / 3.75}vw`, lg: `${16 / 19.2}vw` },
          px: { base: `${20 / 3.75}vw`, lg: `${96 / 19.2}vw` },
        })}
      >
        <div
          className={css({
            pt: { base: `${3 / 3.75}vw`, lg: `${15 / 19.2}vw` },
            transition: `all .3s`,
            _hover: {
              filter: `opacity(50%)`,
            },
          })}
        >
          <Link href={`/`}>
            <img
              src={`/svg/forjob.svg`}
              // src={`/svg/sadojob.svg`}
              alt={`新大BOXロゴ`}
              className={css({
                w: { base: `${170 / 3.75}vw`, lg: `${200 / 19.2}vw` },
                // w: { base: `${170 / 3.75}vw`, lg: `${242 / 19.2}vw` },
              })}
            />
          </Link>
        </div>
        {/* <div
          className={css({
            display: "flex",
          })}
        >
          {username ? (
            <>
              <p
                className={css({
                  display: { base: `none`, lg: `block` },
                  lineHeight: `${70 / 19.2}vw`,
                  fontSize: { base: `${12 / 3.75}vw`, lg: `${17 / 19.2}vw` },
                })}
              >
                こんにちは、{username}さん！
              </p>
              <div
                onClick={handleLogout}
                className={css({
                  borderRadius: {
                    base: `${10 / 3.75}vw`,
                    lg: `${10 / 19.2}vw`,
                  },
                  w: { base: `${100 / 3.75}vw`, lg: `${152 / 19.2}vw` },
                  h: { base: `${35 / 3.75}vw`, lg: `${49 / 19.2}vw` },
                  fontSize: { base: `${12 / 3.75}vw`, lg: `${17 / 19.2}vw` },
                  mt: { lg: `${10 / 19.2}vw` },
                  pt: { base: `${8 / 3.75}vw`, lg: `${11 / 19.2}vw` },
                  textAlign: `center`,
                  color: "white",
                  background: `transparent linear-gradient(270deg, #0EF4FF 0%, #41A4FD 100%) 0% 0% no-repeat padding-box`,
                  fontWeight: "600",
                  transition: `all .3s`,
                  _hover: {
                    cursor: "pointer",
                    filter: `opacity(50%)`,
                    textDecoration: "none",
                  },
                  ml: `${33 / 19.2}vw`,
                })}
              >
                ログアウト
              </div>
            </>
          ) : (
            <div
              onClick={handleLogin}
              className={css({
                borderRadius: { base: `${10 / 3.75}vw`, lg: `${10 / 19.2}vw` },
                w: { base: `${100 / 3.75}vw`, lg: `${152 / 19.2}vw` },
                h: { base: `${35 / 3.75}vw`, lg: `${49 / 19.2}vw` },
                fontSize: { base: `${12 / 3.75}vw`, lg: `${17 / 19.2}vw` },
                mt: { lg: `${10 / 19.2}vw` },
                pt: { base: `${8 / 3.75}vw`, lg: `${11 / 19.2}vw` },
                textAlign: `center`,
                color: "white",
                background: `transparent linear-gradient(270deg, #0EF4FF 0%, #41A4FD 100%) 0% 0% no-repeat padding-box`,
                fontWeight: "600",
                transition: `all .3s`,
                _hover: {
                  cursor: "pointer",
                  filter: `opacity(50%)`,
                  textDecoration: "none",
                },
                ml: `${33 / 19.2}vw`,
              })}
            >
              ログイン
            </div>
          )}
        </div> */}
      </div>
    </header>
  );
};

export default Header;
