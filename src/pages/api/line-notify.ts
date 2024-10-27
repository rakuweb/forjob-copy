// nextjs/src/pages/api/line-notify.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, message } = req.body;

    const LINE_MESSAGING_API_URL = "https://api.line.me/v2/bot/message/push";
    const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

    try {
      const response = await axios.post(
        LINE_MESSAGING_API_URL,
        {
          to: userId,
          messages: [
            {
              type: "text",
              text: message,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
          },
        }
      );

      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      console.error("Error sending message to LINE:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to send message to LINE" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
