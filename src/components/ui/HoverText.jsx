import React from "react";

const HoverText = ({ children, allowed = true }) => {
  return (
    <div className="relative group overflow-hidden">
      <span
        className={`inline-block ${
          allowed ? "group-hover:-translate-y-[110%]" : ""
        } transition-all duration-500`}
      >
        {children}
      </span>
      <span
        className={`absolute left-0 inline-block translate-y-[110%] ${
          allowed ? "group-hover:translate-y-0" : ""
        } transition-all duration-500`}
      >
        {children}
      </span>
    </div>
  );
};

export default HoverText;

