import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Image, Layer, Stage, Text } from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import ShirokoImg from "./assets/shiroko.png";

const WIDTH = 858;
const HEIGHT = 1124;
const FONT_SIZE = 90;
const AREA_HEIGHT = 400;
const ESTIMATED_TEXT_PER_LINE = (WIDTH - FONT_SIZE * 6) / (FONT_SIZE * 1.5);

function App() {
  const [text, setText] = useState(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get("text") ?? "フトスト";
  });

  const [fontSize, setFontSize] = useState(FONT_SIZE);
  const [shirokoImage] = useImage(ShirokoImg);
  const textRef = useRef<Konva.Text>(null);
  const canvasRef = useRef<Konva.Stage>(null);

  // https://math.stackexchange.com/questions/857073/formula-for-adjusting-font-height
  useEffect(() => {
    const lineNum = Math.ceil(text.length / ESTIMATED_TEXT_PER_LINE);
    const computedHeight = Math.max(lineNum * FONT_SIZE, 1);
    setFontSize(FONT_SIZE * Math.sqrt((AREA_HEIGHT * 2) / computedHeight));
  }, [text]);

  const handleChangeText = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => setText(e.target.value),
    []
  );

  const handleDownload = useCallback(() => {
    if (!canvasRef.current) {
      return;
    }

    const dataURL = canvasRef.current.toDataURL({ mimeType: "image/png" });
    const atag = document.createElement("a");
    atag.href = dataURL;
    atag.download = "フトスト.png";
    atag.click();
    atag.remove();
  }, []);

  return (
    <div className="App">
      <input
        className="input-text"
        type="text"
        value={text}
        onChange={handleChangeText}
      />
      <Stage width={WIDTH} height={HEIGHT} ref={canvasRef}>
        <Layer>
          <Image image={shirokoImage} width={WIDTH} height={HEIGHT} />
          <Text
            ref={textRef}
            text={text}
            x={0}
            y={0}
            width={WIDTH}
            height={AREA_HEIGHT}
            fontFamily="sans-serif"
            align="center"
            verticalAlign="middle"
            fontSize={fontSize}
          />
        </Layer>
      </Stage>
      <div>
        <button type="button" onClick={handleDownload}>
          ダウンロード
        </button>
      </div>
      <div>
        <a href="https://twitter.com/parang9494/status/1500431471416266758">
          純粋な不純物@순수한불순물さんはTwitterを使っています 「rkgk
          https:&#x2F;&#x2F;t.co&#x2F;B24Mqk5XRg」 &#x2F; Twitter
        </a>
      </div>
      <div>
        <a href="https://twitter.com/parang9494/status/1489448628225781761">
          純粋な不純物@순수한불순물さんはTwitterを使っています
          「『ブルーアーカイブ』の1周年、おめでとうございます！
          最初にPV映像を見た瞬間から清涼感があふれる世界観にはまってしまいました。
          これからがもっと楽しみです！2周年、3周年、その後まで
          どんどんフトスト（行きましょう）！😭💕
          https:&#x2F;&#x2F;t.co&#x2F;WKqKpjbQNL」 &#x2F; Twitter
        </a>
      </div>
      <div>
        <a href="https://twitter.com/parang9494/status/1474326493916712962">
          純粋な不純物@순수한불순물さんはTwitterを使っています
          「メリークリスマス🎄 https:&#x2F;&#x2F;t.co&#x2F;V4XBX8UpbW」 &#x2F;
          Twitter
        </a>
      </div>
    </div>
  );
}

export default App;
