import "dotenv/config";
import axios from "axios";
const getQuorAiResponse = async (message, PERPLEXITY_API_KEY, PERPLEXITY_API_URL, MODEL) => {
  if (!message) throw new Error("Message is required.");

  const response = await axios.post(
    PERPLEXITY_API_URL,
    {
      model: MODEL,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const reply = response.data.choices[0].message.content;
  return reply;
};

export default getQuorAiResponse;
