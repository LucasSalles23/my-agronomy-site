import { query } from "../lib/db.js";

export default async function handler(req, res) {
  try {
    const result = await query({ query: "SELECT NOW() AS current_time" });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Erro no handler:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}
