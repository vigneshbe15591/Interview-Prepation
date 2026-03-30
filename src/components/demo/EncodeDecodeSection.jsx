import { useState } from "react";
import { encodeString, decodeString } from "../../utils/functions";

export default function EncodeDecodeSection() {
  const [text, setText] = useState("hello world hello");
  const [output, setOutput] = useState("");
  const [gMap, setGMap] = useState({});
  const [gEncoded, setGEncoded] = useState("");
  return (
    <div className="section">
      <h2>Encode / Decode</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          const { encoded, map } = encodeString(text);
          setGMap(map);
          setGEncoded(encoded);
          setOutput(`Encoded: ${encoded}`);
        }}
      >
        Encode
      </button>
      <button
        onClick={() => {
          if (!gEncoded) {
            setOutput("Encode first!");
            return;
          }
          setOutput(`Decoded: ${decodeString(gEncoded, gMap)}`);
        }}
      >
        Decode
      </button>
      <div className="output">{output}</div>
    </div>
  );
}
