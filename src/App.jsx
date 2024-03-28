import "./App.css";
import { useState } from "react";

const MAX_VALUE = 255;
const BUFFER_RANGE = 10;
const exampleIndex = [10, 75, 128, 200, 210, 240];

export default function App() {
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState("N/A");
  const [isFocus, setIsFocus] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const height = isPressed ? 30 : 20;

  return (
    <div className="App">
      <h1>Slider Example</h1>
      <p>
        Current value: {value} / {MAX_VALUE}
      </p>
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
        <div className="bg" style={{ height: `${height}px` }}>
          {exampleIndex.map((v, i) => {
            return <ValueTag valueIndex={v} key={i} height={height} />;
          })}
          <ItemSelect
            currentValue={value}
            setValue={setValue}
            setSelectedIndex={setSelectedIndex}
            height={height}
            isFocus={isFocus}
          />
        </div>
      </div>
    </div>
  );
}

function ItemSelect({
  currentValue,
  setSelectedIndex,
  setValue,
  height,
  isFocus,
}) {
  if (
    exampleIndex.every((v) => Math.abs(currentValue - v) > BUFFER_RANGE) ||
    !isFocus
  ) {
    return <></>;
  }

  const ratio = currentValue / MAX_VALUE;

  return (
    <div
      style={{
        position: "absolute",
        width: "32px",
        top: `${12 + height}px`,
        left: `calc(${ratio * 100}% - 15px)`,
        cursor: "pointer",
        transition: "top 0.2s",
      }}
    >
      {exampleIndex.map((v, i) => {
        if (Math.abs(currentValue - v) > BUFFER_RANGE) return;
        return (
          <div
            style={{
              width: "32px",
              backgroundColor: "#f00",
              color: "#fff",
              padding: "3px",
              marginBottom: "20px",
              transform: "rotate(-90deg) translateY(-3px)",
              userSelect: "none",
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

function ValueTag({ valueIndex, height }) {
  const ratio = valueIndex / MAX_VALUE;
  return (
    <div
      style={{
        width: "1px",
        height: `${height}px`,
        backgroundColor: "#0ef",
        position: "absolute",
        left: `calc(${ratio.toFixed(2) * 100}%)`,
        transition: "0.2s",
      }}
    ></div>
  );
}
