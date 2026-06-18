import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { task } = await req.json();

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "Break the user's task into 5 short actionable subtasks. Return only bullet points. No explanation. No intro. No extra text."
      },
      {
        role: "user",
        content: task,
      },
    ],
  });

  return Response.json({
    subtasks: completion.choices[0].message.content,
  });
}