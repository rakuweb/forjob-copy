import { LargeText } from "@/component/text/large";
import { SmallText } from "@/component/text/small";
import React from "react";
import Head from "next/head";

import { css } from "../../../styled-system/css";

export default function Privacy() {
  return (
    <div>
      <Head>
        <title>新大生の就職はSHINDAI BOX!!｜新大生専門マッチングサイト</title>
        <meta
          name="description"
          content="SHINDAI BOXで新大生の就活が変わる！企業からのオファーで理想の仕事を見つけよう。新大生と企業を直結するマッチングサイト。"
        />
        <meta
          property="og:title"
          content="新大生の就職はSHINDAI BOX!!｜新大生専門マッチングサイト"
        />
        <meta
          property="og:description"
          content="SHINDAI BOXで新大生の就活が変わる！企業からのオファーで理想の仕事を見つけよう。新大生と企業を直結するマッチングサイト。"
        />
        <meta
          name="twitter:title"
          content="新大生の就職はSHINDAI BOX!!｜新大生専門マッチングサイト"
        />
        <meta
          name="twitter:description"
          content="SHINDAI BOXで新大生の就活が変わる！企業からのオファーで理想の仕事を見つけよう。新大生と企業を直結するマッチングサイト。"
        />
        <meta name="twitter:image" content="/ogp.png" />
      </Head>
      <div
        className={css({
          px: { base: `${10 / 3.75}vw`, lg: `${96 / 19.2}vw` },
          bg: `#f5f5f5`,
          color: `#39414e`,
        })}
      >
        <div
          className={css({
            w: { lg: `${1200 / 19.2}vw` },
            mx: { lg: `auto` },
          })}
        >
          <h1
            className={css({
              pt: { base: `${32 / 3.75}vw`, lg: `${66 / 19.2}vw` },
              pb: { base: `${16 / 3.75}vw`, lg: `${0 / 19.2}vw` },
              fontSize: { base: `${26 / 3.75}vw`, lg: `${32 / 19.2}vw` },
              fontWeight: `bold`,
              textAlign: `center`,
            })}
          >
            プライバシーポリシー
          </h1>
          <SmallText
            detail={`株式会社ラクウェブ(以下当社)は個人情報の保護に対する社会的責任を十分認識し、個人情報の適正な取り扱いを推進していくことが、重要な社会的責務と考えております。
このような責務を果たしていくため以下の方針にもとづき個人情報の保護に努めてまいります。`}
          />
          <LargeText detail={`第1条　法令・規範の遵守について`} />
          <SmallText
            detail={`当社は個人情報の取り扱いに関する法令、国が定める指針、その他の規範を常に最新状態に維持するとともにこれを遵守いたします。`}
          />
          <LargeText detail={`第2条　個人情報の取得について`} />
          <SmallText
            detail={`当社は利用目的を明確にした上で取得し、特定された利用目的の達成に必要な範囲内で、適正に個人情報を取り扱います。`}
          />
          <LargeText detail={`第3条　個人情報の利用目的について`} />
          <SmallText
            detail={`当社は、取得した個人情報をお知らせした利用目的以外に利用をいたしません。`}
          />
          <LargeText detail={`第4条　個人情報の安全管理について`} />
          <SmallText
            detail={`当社は、取得した個人情報について不正アクセス、破壊、紛失、漏えい、改ざん等を防止するため、必要かつ適切な安全管理措置を講じます。また、万が一の問題発生に対しては早急に再発防止のための是正を行います。`}
          />
          <LargeText detail={`第5条　個人情報の第三者への開示について`} />
          <SmallText
            detail={`当社は、個人情報の管理を厳重に行い、法令に基づく場合、又はお客さまにご承諾いただいた場合を除き、第三者に対しデータを開示・提供することはいたしません。`}
          />
          <LargeText detail={`第6条　個人情報の委託について`} />
          <SmallText
            detail={`当社は、取得した個人情報の取り扱い・管理を外部へ委託する場合には、漏えい、および不正使用防止のために、契約により義務づけ、適切な管理を実施いたします。`}
          />
          <LargeText detail={`第7条　個人情報保護方針の変更について`} />
          <SmallText
            detail={`当社は、お客様の事前の了承を得ることなく本方針を随時変更することができるものとします。本方針の変更は、本サイト上での掲載後直ちに有効になるものとします。`}
          />
          <SmallText
            detail={`住所:新潟県新潟市西区五十嵐２の町 8050 新潟大学 NOT THE UNIVERSITY
        株式会社ラクウェブ`}
          />
          <p
            className={css({
              fontSize: { base: `${12 / 3.75}vw`, lg: `${16 / 19.2}vw` },
              lineHeight: `2em`,
              letterSpacing: `0.1em`,
              fontWeight: `500`,
              textAlign: `end`,
            })}
          >
            最終更新日2024年7月25日
          </p>
        </div>
      </div>
    </div>
  );
}
