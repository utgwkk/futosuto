import { useEffect, useRef, useState } from "react";
import { Image, Layer, Stage, Text } from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import ShirokoImg from "./assets/shiroko.png";

const WIDTH = 858;
const HEIGHT = 1124;
const FONT_SIZE = 120;
const AREA_HEIGHT = 400;
const ESTIMATED_TEXT_PER_LINE = WIDTH / (FONT_SIZE * 1.5);

function App() {
  const [text, setText] = useState(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get("text") ?? "フトスト";
  });

  const [fontSize, setFontSize] = useState(FONT_SIZE);
  const [shirokoImage] = useImage(ShirokoImg);
  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<Konva.Text>(null);

  // https://math.stackexchange.com/questions/857073/formula-for-adjusting-font-height
  useEffect(() => {
    const lineNum = Math.ceil(text.length / ESTIMATED_TEXT_PER_LINE);
    const computedHeight = Math.max(lineNum * FONT_SIZE, 1);
    setFontSize(FONT_SIZE * Math.sqrt(AREA_HEIGHT / computedHeight));
  }, [text]);

  return (
    <div className="App">
      <input
        ref={inputRef}
        type="text"
        value={text}
        style={{
          opacity: 0,
          position: "absolute",
          width: WIDTH,
          height: AREA_HEIGHT,
        }}
        onChange={(e) => setText(e.target.value)}
      />
      <Stage
        width={WIDTH}
        height={HEIGHT}
        onClick={() => inputRef.current?.focus()}
      >
        <Layer>
          <Image image={shirokoImage} width={WIDTH} height={HEIGHT} />
          <Text
            ref={textRef}
            text={text}
            x={0}
            y={0}
            width={WIDTH}
            height={AREA_HEIGHT}
            align="center"
            verticalAlign="middle"
            fontSize={fontSize}
          />
        </Layer>
      </Stage>
      <div>
        <a href="https://twitter.com/parang9494/status/1500431471416266758">
          純粋な不純物@순수한불순물さんはTwitterを使っています 「rkgk
          https:&#x2F;&#x2F;t.co&#x2F;B24Mqk5XRg」 &#x2F; Twitter
        </a>
      </div>
    </div>
  );
}

export default App;
