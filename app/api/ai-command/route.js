// import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_API, // ✅ make sure this is set correctly in .env.local
// });

// export async function POST(req) {
//   try {
//     const { text } = await req.json();

//     const prompt = `
// You are a multilingual smart document assistant.
// You accept commands in Hindi, English, or Bengali.

// You must:
// - Detect the language.
// - Translate to English if needed.
// - Understand the command (e.g., "make this bold", "translate to Bengali", "insert a table", etc.)
// - Respond ONLY in JSON format. No explanation.

// Supported actions:
// - insert_text
// - format_text
// - insert_table
// - translate_text
// - summarize_text

// Input: "${text}"
// Reply with JSON only.
//     `;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const message = completion.choices?.[0]?.message?.content?.trim();

//     // Try to extract valid JSON from AI response
//     const jsonStart = message.indexOf("{");
//     const jsonEnd = message.lastIndexOf("}");
//     if (jsonStart === -1 || jsonEnd === -1) throw new Error("AI did not return JSON");

//     const jsonString = message.slice(jsonStart, jsonEnd + 1);
//     const parsed = JSON.parse(jsonString);

//     return new Response(JSON.stringify(parsed), { status: 200 });
//   } catch (err) {
//     console.error("AI error:", err);
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }


// import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.GROQ_API_KEY, // ✅ ensure this is defined
// });

// export async function POST(req) {
//   try {
//     const { text } = await req.json();
//     console.log("Received input:", text);

//     const prompt = `
// You are a multilingual smart document assistant for teachers. You accept commands in English, Hindi, or Bengali and always respond ONLY with a valid JSON object (no extra explanation).

// You must:
// - Detect the language.
// - Translate to English if needed.
// - Understand formatting, lists, tables, and table content filling instructions.
// - Respond ONLY in structured JSON.

// Supported Actions and Format:
// 1. Heading with style:
//    Input: "Write heading as National High School for Girls in bold font size 14"
//    Output: 
//    {
//      "action": "add_heading",
//      "content": "National High School for Girls",
//      "style": "bold",
//      "fontSize": 14
//    }

// 2. Numbered or bullet list of questions:
//    Input: "Write the following questions: What is Gita? Who wrote Gita?"
//    Output:
//    {
//      "action": "insert_list",
//      "type": "numbered",
//      "items": ["What is Gita?", "Who wrote Gita?"]
//    }

// 3. Create table:
//    Input: "Create a table of 2 rows and 3 columns"
//    Output:
//    {
//      "action": "insert_table",
//      "rows": 2,
//      "columns": 3
//    }

// 4. Fill table cell:
//    Input: "In row one, column two write 'Khandkha'"
//    Output:
//    {
//      "action": "fill_table_cell",
//      "row": 1,
//      "column": 2,
//      "content": "Khandkha"
//    }

// Respond ONLY with a valid JSON object matching the user's intent.

// Now convert this voice command: "${text}"

// `;

//     // const completion = await openai.chat.completions.create({
//     //   model: "gpt-4.1",
//     //   messages: [{ role: "user", content: prompt }],
//     // });


//     const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, // store your key in .env
//   },
//   body: JSON.stringify({
//     model: "mixtral-8x7b-32768", // OR "llama3-70b-8192", etc.
//     messages: [{ role: "user", content: prompt }],
//   }),
// });

// const completion = await response.json();
// const message = completion.choices[0]?.message?.content;

//     const raw = completion.choices?.[0]?.message?.content;
//     console.log("AI Raw Response:", raw);

//     // 🛡️ Attempt to extract JSON part
//     const jsonStart = raw.indexOf("{");
//     const jsonEnd = raw.lastIndexOf("}");
//     if (jsonStart === -1 || jsonEnd === -1) throw new Error("AI response missing JSON");

//     const jsonString = raw.slice(jsonStart, jsonEnd + 1);
//     const parsed = JSON.parse(jsonString);

//     return new Response(JSON.stringify(parsed), { status: 200 });
//   } catch (err) {
//     console.error("AI error:", err.message);
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }



import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text } = await req.json();
    console.log("Received input:", text);

const prompt = `
You are a multilingual question paper formatter assistant for teachers. You always output structured JSON based on the input.

🎯 You ONLY reply with a valid JSON object matching the command. NO extra text or explanation.

✅ Supported Commands:

1. Heading:
Input: "Write heading as Aarsh Hindi School in bold font size 18"
Output:
{
  "action": "add_heading",
  "content": "Aarsh Hindi School",
  "style": "bold",
  "fontSize": 18
}

2. Numbered question prompts (EN/HI/BN):
Input: "Write a question Q1. Answer the following (1 mark)"
Output:
{
  "action": "insert_text",
  "content": "Q1. Answer the following (1 mark)"
}
Input: "प्रश्न 1: निम्नलिखित का उत्तर दें (1 अंक)"
Output:
{
  "action": "insert_text",
  "content": "प्रश्न 1: निम्नलिखित का उत्तर दें (1 अंक)"
}
Input: "প্রশ্ন ১: নিচের প্রশ্নগুলোর উত্তর দাও (১ নম্বর)"
Output:
{
  "action": "insert_text",
  "content": "প্রশ্ন ১: নিচের প্রশ্নগুলোর উত্তর দাও (১ নম্বর)"
}

3. Fill in the blanks:
Input: "Fill in the blank: The cat is ___ the table."
Output:
{
  "action": "insert_text",
  "content": "Fill in the blank: The cat is — the table."
}
Input: "रिक्त स्थान भरिए: बिल्ली ___ मेज़ के नीचे है।"
Output:
{
  "action": "insert_text",
  "content": "रिक्त स्थान भरिए: बिल्ली — मेज़ के नीचे है।"
}

4. Bracket style questions:
Input: "The capital of India is ( ____ )"
Output:
{
  "action": "insert_text",
  "content": "The capital of India is ( ____ )"
}

5. Table:
Input: "Create a table of 2 rows and 3 columns"
Output:
{
  "action": "insert_table",
  "rows": 2,
  "columns": 3
}

6. Numbered List:
Input: "Write the following questions: What is Gita?, Who wrote Gita?"
Output:
{
  "action": "insert_list",
  "type": "numbered",
  "items": ["What is Gita?", "Who wrote Gita?"]
}

7. Fill a cell:
Input: "In row 1, column 2 write Khandkha"
Output:
{
  "action": "fill_table_cell",
  "row": 1,
  "column": 2,
  "content": "Khandkha"
}
  8. Question Numbering:
- If input is a new question like "Who is the author of Harry Potter?", number it incrementally as Q2, Q3 etc.
- Maintain previous numbering and continue from the last (e.g., after Q1, the next should be Q2)
- Format should be: "Q2. Who is the author of Harry Potter? (1 mark)"
9. Formatted answer with marks:
Input: "Answer this question marks 7x3=21"
Output:
{
  "action": "insert_text",
  "content": "Answer this question",
  "marks": "7x3=21"
}
10. Hindi Heading:
User: "राष्ट्रीय माध्यमिक विद्यालय को हेडिंग बनाओ बोल्ड में 16 साइज में"
{
  "action": "add_heading",
  "content": "राष्ट्रीय माध्यमिक विद्यालय",
  "style": "bold",
  "fontSize": 16
}

11. Hindi Fill in the Blanks:
User: "रिक्त स्थान भरो: बिल्ली ___ मेज पर है"
{
  "action": "insert_text",
  "content": "बिल्ली ___ मेज पर है"
}

12. Hindi Right Align:
User: "निम्नलिखित प्रश्नों के उत्तर दो इस लाइन को राइट हैंड साइड में मूव करो"
{
  "action": "insert_text",
  "content": "निम्नलिखित प्रश्नों के उत्तर दो",
  "alignment": "right"
}

13. Hindi Center Align:
User: "पिछली लाइन को सेंटर में रखो"
{
  "action": "set_alignment",
  "target": "last_line",
  "alignment": "center"
}

❗If the command is unclear or unsupported, reply with:
{
  "action": "error",
  "message": "Invalid command"
}

🧠 Auto-detect language (English, Hindi, Bengali) and format accordingly.

Now process this input: "${text}"
`;


    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    

    const completion = await response.json();
console.log("🧠 Full Groq completion:", completion);


    if (!completion.choices || !completion.choices[0]) {
      throw new Error("Invalid response from Groq");
    }

    const raw = completion.choices[0].message?.content?.trim();

    if (!raw) {
      throw new Error("No content returned from AI");
    }

    console.log("AI Raw Response:", raw);

    // Extract JSON safely
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("AI response does not contain valid JSON");
    }

    const jsonString = raw.slice(jsonStart, jsonEnd + 1);
    const parsed = JSON.parse(jsonString);

    return NextResponse.json(parsed, { status: 200 });

  } catch (err) {
    console.error("AI error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  
}
