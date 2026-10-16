
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import OpenAI from "openai";

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

const allowedOrigin = process.env.FRONTEND_ORIGIN;

app.use(cors({
  origin(origin, callback) {
    if (!origin || !allowedOrigin || origin === allowedOrigin) {
      return callback(null, true);
    }
    return callback(new Error("Origin not allowed"));
  }
}));

app.use("/api", rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false
}));

app.get("/health", (req, res) => {
  res.json({ status: "JARVIS backend online" });
});

app.post("/api/chat", async (req, res) => {
  const message = req.body?.message;

  if (typeof message !== "string" ||
      message.trim().length === 0 ||
      message.length > 2000) {
    return res.status(400).json({
      error: "Enter a message up to 2000 characters."
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: "AI service is not configured yet."
    });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions: "You are JARVIS, a helpful, clear, friendly personal AI assistant.",
      input: message.trim(),
      max_output_tokens: 500
    });

  
} catch (error) {
  console.error("OpenAI error:", {
    message: error.message,
    status: error.status,
    code: error.code
  });

  res.status(502).json({
    error: "JARVIS could not get a response. Please try again."
  });
}
  res.json({ reply: response.output_text });


app.listen(PORT, "0.0.0.0", () => {
  console.log(`JARVIS backend running on port ${PORT}`);
});
