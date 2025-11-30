import express, { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  `/api/auth/github/callback`,
  async (req: Request, res: Response) => {
    const { code, state } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Missing 'code' in query params" });
    }

    try {
      // STEP 2 — Exchange code for access token
      const tokenResponse = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        {
          headers: { Accept: "application/json" },
        }
      );

      const accessToken = tokenResponse.data.access_token;

      if (!accessToken) {
        return res.status(400).json({ error: "No access token received" });
      }

      // STEP 3 — Get GitHub user profile
      const userResponse = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const emailResponse = await axios.get(
        "https://api.github.com/user/emails",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const githubUser = userResponse.data;
      const emails = emailResponse.data;

      const userDetails = {
        fullName: githubUser.name,
        emailAddress: emails.filter((x: any) => x.primary === true)[0].email,
        role: "NORMAL",
      };

      const token = jwt.sign(userDetails, process.env.JWT_KEY);

      // Store the user in DB here

      // STEP 4 — Return JWT token to client
      return res.send({
        token,
        ...userDetails,
      });
    } catch (err) {
      console.error("GitHub OAuth error:", err);
      return res.status(500).json({ error: "GitHub OAuth failed" });
    }
  }
);

export { router as githubCallbackRouter };
