import { useState } from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const RangeSlider = () => {
  const [minValue, setMinValue] = useState("30");

  const displayMin = (event) => {
    setMinValue(event[0]);
  };
  const Slider = () => (
    <Nouislider
      range={{ min: 0, max: 100 }}
      start={[0, 50]}
      connect
      tooltips={[true, false]}
      onChange={displayMin}
      
    />
  );

  return (
    <div>
      {Slider()}
      <center>
        <div style={{ display: "inline", padding: "2%" }}>
          <h3>Min Value</h3>
          <br></br>
          <div
            style={{
              background: "green",
              color: "white",
              display: "inline",
              padding: "1%",
            }}
          >
            {minValue}
          </div>
        </div>
      </center>
    </div>
  );
};

export default RangeSlider;
