import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());



app.use("/api", chatRoutes);  // Use chat routes for any endpoint starting with /api
app.use("/api/auth", authRoutes);



const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";
const MODEL = process.env.PERPLEXITY_MODEL || "sonar-pro";

// Helper function to format reply for terminal
function formatReplyForTerminal(reply) {
  // Replace escaped newline sequences with real newlines
  let formatted = reply.replace(/\\n/g, "\n");

  // Convert markdown bold **text** to terminal bold ANSI codes
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, "\x1b[1m$1\x1b[0m");

  // Remove citation brackets like [1], [2]
  formatted = formatted.replace(/\[\d+\]/g, "");

  return formatted;
}

// app.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) return res.status(400).json({ error: "Message is required." });

//     const response = await axios.post(
//       PERPLEXITY_API_URL,
//       {
//         model: MODEL,
//         messages: [
//           { role: "system", content: "You are a helpful assistant." },
//           { role: "user", content: message },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const reply = response.data.choices[0].message.content;

//     // Log nicely formatted reply in terminal
//     // console.log("QuorAI reply:\n" + formatReplyForTerminal(reply));

//     res.json({ reply });
//   } catch (error) {
//     console.error("Perplexity API error:", error.response?.data || error.message);
//     res.status(500).json({ error: error.response?.data || error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();  // call our DB connection function when server starts
}); 

// Connect to MongoDB
const connectDB = async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  }catch(err){
    console.log("Falied To Connect to MongoDB", err);
  }
}
