import React from "react";
import data from "./tsugaruDialect.json";

function ReadJson() {
  console.log(data)
  return (
    <div>
      {data.dict.map(
        (
          item // 配列の要素（オブジェクト）にアクセス
        ) => (
          <div key={item.tsugaru}>
            <p>{item.tsugaru}</p>
            {/* // オブジェクトのプロパティ（tsugaru）にアクセス */}
            <p>{item["normal"]}</p>
            {/* // オブジェクトのプロパティ（normal）にアクセス */}
          </div>
        )
      )}
    </div>
  );
}
export default ReadJson;
