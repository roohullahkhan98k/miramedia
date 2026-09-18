import React from "react";

const DoubleText = ({ text1, text2, isSwitched }) => {
  return (
    <div className="relative overflow-hidden">
      <span
        className={`inline-block transition-all duration-500 ${
          isSwitched ? "-translate-y-[110%]" : ""
        }`}
      >
        {text1}
      </span>
      <span
        className={`absolute left-0 inline-block transition-all duration-500 ${
          isSwitched ? "translate-y-0" : "translate-y-[110%]"
        }`}
      >
        {text2}
      </span>
    </div>
  );
};

export default DoubleText;
