import React from "react";
import ReactSlider from "react-slider";

const RangeSlider = ({ onChange, message, value }) => {
  return (
    <>
      <div className="pb-5">
        <p className="mb-2 pl-3 font-medium">{message}</p>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          value={value} // Controlled component
          onChange={onChange} // Update state on change
          ariaLabel={["Lower thumb", "Upper thumb"]}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          pearling
          minDistance={5}
        />
      </div>
      <div className="my-2 w-full">
        <hr className="border-t border-gray-300 w-full" />
      </div>
    </>
  );
};

export default RangeSlider;
