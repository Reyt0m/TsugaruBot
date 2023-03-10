const openai = require('@openai/api');

// OpenAI APIキーを設定する
const openaiApiKey = "YOUR_API_KEY";
const openaiApi = new openai.DefaultApi();
openaiApi.apiKey = openaiApiKey;

const { Configuration, OpenAIApi } = require("openai");


// 辞書データを読み込む
// この部分はcsvで入力
const fs = require('fs');
const dictionary = {};
fs.readFileSync('dictionary.txt', 'utf-8').split('\n').forEach(line => {
  const [key, value] = line.trim().split('\t');
  dictionary[key] = value;
});

// ChatGPT APIにリクエストを送信する関数を定義する
async function generateText(prompt) {
  const response = await openaiApi.completions.create({
    engine: 'davinci-codex',
    prompt: prompt,
    maxTokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.7,
  });

  return response.choices.text.trim();
}

// ユーザーからの入力に対してChatbotが返答するループ処理
let prompt = "津軽弁で話しかけてください。";
const readlineSync = require('readline-sync');
while (true) {
  const userInput = readlineSync.question("あなた：");

  // 辞書データに基づいてユーザー入力を置換する
  for (const [key, value] of Object.entries(dictionary)) {
    userInput.replace(new RegExp(key, 'g'), value);
  }

  prompt += "\nユーザー：" + userInput;
  const response = await generateText(prompt);

  // Chatbotの応答メッセージも辞書データに基づいて置換する
  for (const [key, value] of Object.entries(dictionary)) {
    response.replace(new RegExp(value, 'g'), key);
  }

  console.log("Chatbot：" + response);
}
