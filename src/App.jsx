import "./App.css";
import { useState } from "react";
import GitHubIcon from "./GitHubIcon";
const MAX_VALUE = 255;
const BUFFER_RANGE = 10;
const exampleIndex = [15, 63, 127, 191, 201, 239];

export default function App() {
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState("--");
  const [isFocus, setIsFocus] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const width = isPressed ? 30 : 20;

  return (
    <div className="App">
      <h1>Slider Example</h1>
      <p>
        <a href="https://github.com/ChienChihYeh/slider-demo">
          <GitHubIcon className={"link-icon"} />
        </a>
      </p>
      <p>
        Current value: {value} / {MAX_VALUE}
      </p>
      <p></p>
      <p>Selected value: {selectedIndex}</p>
      <p>Example value tags: {exampleIndex.toString()}</p>

      <div className="container" onMouseLeave={() => setIsFocus(false)}>
        <input
          type="range"
          min={0}
          max={MAX_VALUE}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={isFocus ? "focused" : ""}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onTouchStart={() => {
            setIsPressed(true);
            setIsFocus(true);
          }}
          onTouchEnd={() => {
            setIsPressed(false);
            setIsFocus(false);
          }}
          onMouseEnter={() => setIsFocus(true)}
        />
        <ItemSelect
          currentValue={value}
          setValue={setValue}
          setSelectedIndex={setSelectedIndex}
          width={width}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
        />
        <div
          className="bg"
          style={{
            width: `${width}px`,
          }}
        >
          {exampleIndex.map((v, i) => {
            return <ValueTag valueIndex={v} key={i} width={width} />;
          })}
        </div>
      </div>
    </div>
  );
}

function ItemSelect({
  currentValue,
  setSelectedIndex,
  setValue,
  width,
  isFocus,
  setIsFocus,
}) {
  if (exampleIndex.every((v) => Math.abs(currentValue - v) > BUFFER_RANGE)) {
    return <></>;
  }

  const ratio = currentValue / MAX_VALUE;

  return (
    <div
      style={{
        position: "absolute",
        right: `${6 + width}px`,
        top: `calc(${(ratio * 100 * 260) / 300}% + 10px)`,
        cursor: "pointer",
        transition: "right 0.2s",
        direction: "rtl",
        display: "flex",
        gap: "6px",
      }}
      className={isFocus ? undefined : "hidden"}
      onTouchStart={() => {
        setIsFocus(true);
      }}
      onTouchEnd={() => {
        setIsFocus(false);
      }}
    >
      {exampleIndex.map((v, i) => {
        if (Math.abs(currentValue - v) > BUFFER_RANGE) return;
        return (
          <div
            style={{
              minWidth: "32px",
              backgroundColor: "#f00",
              color: "#fff",
              padding: "2px",
              userSelect: "none",
              display: "inline-block",
            }}
            key={i}
            onClick={() => {
              setSelectedIndex(v);
              setValue(v);
            }}
          >
            {v}
          </div>
        );
      })}
    </div>
  );
}

function ValueTag({ valueIndex, width }) {
  const ratio = valueIndex / MAX_VALUE;
  return (
    <div
      style={{
        height: "1px",
        width: `${width}px`,
        backgroundColor: "#0ef",
        position: "absolute",
        top: `calc(${ratio.toFixed(2) * 100}% - 1px)`,
        transition: "0.2s",
      }}
    ></div>
  );
}
