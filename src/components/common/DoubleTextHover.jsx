import React from "react";

const DoubleTextHover = ({
  text1,
  text2,
  className,
  text1ClassName,
  text2ClassName,
}) => {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <span
        className={`inline-block transition-all duration-500 w-full
          group-hover:-translate-y-[115%] ${text1ClassName}
        `}
      >
        {text1}
      </span>
      <span
        className={`absolute left-0 inline-block transition-all duration-500 w-full 
          group-hover:translate-y-0 translate-y-[110%] ${text2ClassName}
        }`}
      >
        {text2}
      </span>
    </div>
  );
};

export default DoubleTextHover;
