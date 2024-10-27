// nextjs/src/pages/api/like.ts

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { userId, companyId, name, mail, lineUserId } = req.body;
    const jwt = req.headers.authorization;
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
    const lineChannelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

    if (!jwt) {
      return res.status(401).json({ message: "認証が必要です" });
    }

    try {
      const companyUrl = `${baseURL}/api/companies/${companyId}?populate=users_permissions_users`;
      const companyRes = await fetch(companyUrl, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!companyRes.ok) {
        throw new Error("企業の現在のユーザー情報の取得に失敗しました");
      }

      const companyData = await companyRes.json();
      const existingUserIds =
        companyData.data.attributes.users_permissions_users.data.map(
          (user: any) => user.id
        );

      const companyName = companyData.data.attributes.name;

      const updatedUserIds = [...existingUserIds, userId];

      const updateCompanyUrl = `${baseURL}/api/companies/${companyId}`;
      const strapiResCompany = await fetch(updateCompanyUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            users_permissions_users: updatedUserIds,
          },
        }),
      });

      if (!strapiResCompany.ok) {
        const errorData = await strapiResCompany.json();
        throw new Error(
          errorData.error
            ? errorData.error.message
            : "Strapiへのリクエストに失敗しました"
        );
      }

      res.status(200).json({ message: "いいね！しました" });

      const contactData = {
        name: name,
        userid: userId,
        email: mail,
        text: `${companyName}へいいねしました`,
        inquiry_item: "3",
        company: companyId,
      };

      await fetch(`${baseURL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: contactData }),
      });
      const lineMessage = `${name}さんが${companyName}にいいねしました。`;

      const lineNotifyResponse = await fetch(
        "https://api.line.me/v2/bot/message/push",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lineChannelAccessToken}`,
          },
          body: JSON.stringify({
            to: lineUserId,
            messages: [
              {
                type: "text",
                text: lineMessage,
              },
            ],
          }),
        }
      );

      if (!lineNotifyResponse.ok) {
        throw new Error("LINE Notifyによる通知の送信に失敗しました。");
      }

      res
        .status(200)
        .json({ message: "いいね！しました。LINEにも通知を送りました。" });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: error.message || "内部サーバーエラー" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
