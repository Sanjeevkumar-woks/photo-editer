import React, { useState, useMemo } from "react";
import "./App.css";
import Slider from "./Slider";
import SidebarItems from "./SidebarItems";

const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
];

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  function handleSubmit(e) {
    const imageFile = e.target.files[0];
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setFileName(imageFile.name);
  }

  function handleSliderChange({ target }) {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: target.value };
      });
    });
  }

  const getImageStyle = useMemo(
    function getImageStyle() {
      const filters = options.map((option) => {
        return `${option.property}(${option.value}${option.unit})`;
      });

      return { filter: filters.join(" ") };
    },
    [options]
  );

  console.log(getImageStyle);

  return (
    <div className="container">
      <div />
      <img
        className="main-image"
        style={getImageStyle}
        src={
          file
            ? file
            : "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="
        }
        alt="main_image"
      />
      <div className="sidebar">
        <form className="uploder">
          <h3>Upload Image</h3>
          <input className="file" type="file" onChange={handleSubmit} />
          {file ? (
            <button>
              <a href={file} download={fileName} alt="sanju">
                Download
              </a>
            </button>
          ) : (
            ""
          )}
        </form>
        {options.map((option, index) => {
          return (
            <SidebarItems
              key={index}
              name={option.name}
              active={index === selectedOptionIndex}
              handleClick={() => setSelectedOptionIndex(index)}
            />
          );
        })}
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
    </div>
  );
}

export default App;
