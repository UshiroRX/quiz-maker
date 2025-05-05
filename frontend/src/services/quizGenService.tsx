import Together from "together-ai";

const json_data = `{
  "title": "string",
  "description": "",
  "tags": [
    "Другое"
  ],
  "questions": [
    {
      "title": "string", 
      "points": 1,
      "is_multiple": false,
      "is_text": false,
      "answers": [
        {
          "text": "string",
          "is_correct": false
        }
      ]
    }
  ]
}`;

const apikey = import.meta.env.VITE_TOGETHER_API_KEY;

function extractJsonFromResponse(text: string): any {
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}") + 1;

  if (jsonStart !== -1 && jsonEnd !== -1) {
    const jsonString = text.slice(jsonStart, jsonEnd);

    try {
      const parsedObject = JSON.parse(jsonString);
      return parsedObject;
    } catch (e) {
      console.error("Ошибка при парсинге JSON:", e);
    }
  }

  return null;
}

export const QuizGenService = {
  async generateQuiz(message: string): Promise<any> {
    try {
      const together = new Together({ apiKey: apikey });
      const res = await together.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Дай мне готовый сделанный квиз, по запросу юзера : ${message}. Ответ дай просто в JSON формате в таком виде:
              ${json_data}
              Если ответ является is_text, то у него нет answers. Теги бери только из определенного набора тегов : [наука, жизнь, история, хобби, школа, развлечения, спорт, другое(если ни туда ни сюда)]
              Без лишнего текста, просто JSON текст. Description не большой, вопросы если юзер не сказал, то 10 штук. Текстовые вопросы должны ответиться только одним словом. Комбинируй разные виды ответов.
            `,
          },
        ],
        model: "Qwen/Qwen3-235B-A22B-fp8-tput",
      });

      const quizObject = extractJsonFromResponse(
        res.choices[0].message?.content!,
      );
      return quizObject;
    } catch (error) {
      console.error("Error fetching data from Together API:", error);
      throw error;
    }
  },
};
