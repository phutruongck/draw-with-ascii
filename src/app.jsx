import React from "react";
import text from "./output.txt";
import "./styles.css";

const App = React.memo(() => {
  const [lengthOfContent, setLengthOfContent] = React.useState(0);
  const [indexOfContent, setIndexOfContent] = React.useState(0);
  const [partOfContent, setPartOfContent] = React.useState([]);
  const [fakeProcess, setFakeProcess] = React.useState(0);
  const [content, setContent] = React.useState("");
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    if (fakeProcess < 10 && content) {
      const timeout = setTimeout(() => {
        setFakeProcess((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [fakeProcess, content]);

  React.useEffect(() => {
    if (fakeProcess === 10 && content && indexOfContent < lengthOfContent - 1) {
      const timeout = setTimeout(() => {
        setPartOfContent((prev) => [...prev, content[indexOfContent]]);
        setIndexOfContent((prev) => prev + 1);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [fakeProcess, content, indexOfContent, lengthOfContent]);

  const onSubmit = (e) => {
    e.preventDefault();
    let a = input;
    if (!a) {
      window.alert("nhập vào tên!");
    } else if (a !== "messi") {
      window.alert("tên không đúng!");
    } else {
      fetch(text)
        .then((r) => r.text())
        .then((text) => {
          const lines = text.split(/\r\n|\n/);
          setContent(lines);
          setLengthOfContent(lines.length);
        });
    }
  };

  return (
    <React.Fragment>
      <div id="main" className="main theme_color">
        <pre>
          <span id="typer" className="typer"></span>
          <span id="cursor">
            <div className="text-center">
              <p>input what u want</p>
              <input
                type="text"
                name="name"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <button onClick={onSubmit}>OKI</button>
            </div>
          </span>
          <br />
          <div className="display_content">
            {[...Array(fakeProcess)].map((_, index) => (
              <div key={index}>
                <h2>{`Đang_xử_lý_${index + 1}0%`}</h2>
              </div>
            ))}
          </div>
          <div className="display_content">
            {partOfContent.map((_, index) => (
              <div key={`content_${index}`}>
                <p style={{ fontSize: 27 }}>{_}</p>
              </div>
            ))}
          </div>
        </pre>
      </div>
    </React.Fragment>
  );
});

export default App;
