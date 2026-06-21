import express from "express";
import analyzeRoutes from "./routes/analyze.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use(express.static("public"));

// API routes
app.use("/api", analyzeRoutes);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "zerodeploy",
    version: "0.1.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (_req, res) => {
  res.json({
    name: "ZeroDeploy",
    description: "AI-powered GitHub repo quality scorer",
    endpoints: {
      health: "GET /health",
      analyze: "POST /api/analyze { url }",
      analyzeShorthand: "GET /api/analyze/:owner/:repo",
      parse: "POST /api/parse { url }",
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ZeroDeploy API listening on http://localhost:${PORT}`);
});

export default app;
