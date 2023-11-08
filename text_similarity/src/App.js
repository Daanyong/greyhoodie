import "./App.css";
import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault(); // 폼 제출 x
    setItems([...items, inputText]);
    setInputText("");
    
    //// 이 부분은 from 데이터로 전송해야 flask가 파싱할 수 있어서 주석처리하고 새로 짯어요!
    const Data = new FormData();
    Data.append("inputText", inputText);
    // 전달
    // 굿 감사합니다.. 프론트는 힘들더라고여..대다네..
    fetch("http://shogle.site:10021/result", {
      method: "POST",
      body: Data
      // headers: {
      //   Origin: "http://localhost:8080/",
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify({
      //   inputText: inputText,
      // }),
    }).then((res) => res.json());
  };

  return (
    // 입력될 때, 클라이언트 쪽에서 영어만 입력 가능하게 정규화되어 있으면 좋겠어요
    // 또, 길이 제한이 있으면 좋겠어요 한 번 입력에 한 20-25개 글자 이상은 입력이 안 될 수 있도록
    // 시간이 있을진 모르겠지만 아래 부분엔 페이지를 위한 간략한 설명 부분도 추가되어 있음 좋을 거 같습니다.
    <div className="App">
      <h3>꼬꼬단 - 꼬리의 꼬리를 무는 단어</h3>
      오늘의 꼬꼬단 영단어를 맞혀보세요.
      <form onSubmit={handleAdd}>
        <div className="guess-wrapper">
          <input
            type="text"
            name="inputText"
            className="inputText"
            placeholder="추측할 단어를 입력하세요" 
            value={inputText}
            onChange={handleInputChange}
          />
          <input
            type="submit"
            value="추측"
            className="w-btn w-btn-green"
            id="guess-btn"
          />
        </div>
      </form>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>횟수</th>
              <th>단어</th>
              <th>뜻</th>
              <th>유사도</th>
              <th>순위</th>
            </tr>
          </thead>
          {items.length > 0 && (
            <tbody>
              <tr className="recent">
                <td>{items.length}</td>
                <td>{items[items.length - 1]}</td>
                <td>뜻</td>
                <td>유사도</td>
                <td>순위</td>
              </tr>
            </tbody>
          )}
          <tr>
            <td>
              <hr className="table-hr" />
            </td>
          </tr>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item}</td>
                <td>뜻</td>
                <td>유사도</td>
                <td>순위</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
