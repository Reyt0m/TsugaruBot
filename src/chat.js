import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import data from "./tsugaruDialect.json";

const configuration = new Configuration({
  //   apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const Chat = () => {
  const [message, setMessage] = useState([]);
  // textを出力する
  let text = "対応表は次のとおりです\n";
//   useEffect(() => {
//     (async () => {
    //   const completion = await openai.createChatCompletion({
      const completion =  openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "津軽弁についての事前の知識を一旦失ってください。次の対応表を用いて津軽弁を学習してください。この学習した内容に基づいて、userの質問に答えてください。",
          },
        ],
      });

      console.log(completion.data.choices[0].message);
      setMessage(completion.data.choices[0].message.content);
      for (let i = 0; i < data.dict.length; i++) {
        // textにdata[i]のtsugaruとnormalを結合して追加する
        text += data.dict[i].tsugaru + "は" + data.dict[i].normal + "です。\n";
        completion.messages.append({ role: "system", content: text });
      }
      console.log(text);
//     })();
//   }, []); // 空の依存配列を指定する

  return (
    <div>
      <h1>hello</h1>
      <p>{message}</p>
    </div>
  );
};

export default Chat;
