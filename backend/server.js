
import express from "express";
import fetch from "node-fetch";
import ExcelJS from "exceljs";
import dotenv from "dotenv";
import Twilio from "twilio";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
const CLERK_API_KEY = process.env.CLERK_API_KEY;
const CLERK_API_URL = process.env.CLERK_API_URL || "https://api.clerk.dev";
const twilioClient = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_FROM = process.env.TWILIO_FROM;

if (!CLERK_API_KEY) {
  console.error("Missing CLERK_API_KEY in server env");
  process.exit(1);
}


app.get("/api/admin/users", async (req, res) => {
  try {

    const url = `${CLERK_API_URL}/v1/users`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CLERK_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }
    const body = await response.json();

    const users = body.map((u) => ({
      id: u.id,
      firstName: u.first_name || u.firstName || "",
      lastName: u.last_name || u.lastName || "",
      fullName: `${u.first_name || u.firstName || ""} ${u.last_name || u.lastName || ""}`.trim(),
      email: (u.email_addresses && u.email_addresses[0]?.email_address) || u.email || "",
      createdAt: u.created_at || u.createdAt || new Date().toISOString(),
      role: (u.public_metadata && u.public_metadata.role) || (u.publicMetadata && u.publicMetadata.role) || null,
    }));
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


app.get("/api/admin/export", async (req, res) => {
  try {
    const usersRes = await fetch(`${CLERK_API_URL}/v1/users`, {
      headers: { Authorization: `Bearer ${CLERK_API_KEY}` },
    });
    const body = await usersRes.json();
    const users = body.map((u) => ({
      id: u.id,
      firstName: u.first_name || u.firstName || "",
      lastName: u.last_name || u.lastName || "",
      email: (u.email_addresses && u.email_addresses[0]?.email_address) || u.email || "",
      role: (u.public_metadata && u.public_metadata.role) || (u.publicMetadata && u.publicMetadata.role) || "",
      createdAt: u.created_at || new Date().toISOString(),
    }));

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Users");
    sheet.columns = [
      { header: "ID", key: "id", width: 40 },
      { header: "First Name", key: "firstName", width: 20 },
      { header: "Last Name", key: "lastName", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Role", key: "role", width: 12 },
      { header: "Created At", key: "createdAt", width: 20 },
    ];
    users.forEach((u) => sheet.addRow(u));

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="mentorx-users.xlsx"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate Excel" });
  }
});

// 3) Send SMS (Twilio) — used by frontend when confirming a slot
app.post("/api/admin/notify-sms", async (req, res) => {
  const { phone, message } = req.body;
  if (!phone || !message) return res.status(400).json({ error: "phone and message required" });
  try {
    const sent = await twilioClient.messages.create({
      to: phone,
      from: TWILIO_FROM,
      body: message,
    });
    res.json({ success: true, sid: sent.sid });
  } catch (err) {
    console.error("Twilio error:", err);
    res.status(500).json({ error: "SMS failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Admin API running on http://localhost:${PORT}`);
});
