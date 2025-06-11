import OpenAI from "openai";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const systemPrompt = "You are a helpful assistant.";

rl.question("Enter your prompt: ", async (userInput) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInput },
      ],
       temperature: 0.7,
    });

    const reply = chatCompletion.choices[0].message.content;
    const usage = chatCompletion.usage;

    console.log("\n🤖 Assistant’s reply:\n", reply);
    console.log("\n📊 Token usage:", usage);
  } catch (err) {
    console.error("❌ Error calling OpenAI API:", err);
  } finally {
    rl.close();
  }
});
