import { ArrowUpRight } from "lucide-react";
import React from "react";

const LinkHoverBig = ({ text, arrowClassName, strokeWidth, className }) => {
  return (
    <div
      className={`relative group inline-flex items-center gap-0.5 ${className}`}
    >
      <ArrowUpRight
        className={`${arrowClassName} transition-all absolute left-0 top-1/2 -translate-y-1/2 duration-300 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 origin-bottom-left`}
        strokeWidth={strokeWidth}
      />
      <span className={`group-hover:translate-x-7 transition-all duration-300`}>
        {text}
      </span>
      <ArrowUpRight
        className={`${arrowClassName} transition-all duration-300 opacity-100 translate-x-0 group-hover:opacity-0 group-hover:scale-0 origin-top-right`}
        strokeWidth={strokeWidth}
      />
      <div className="bg-white h-px w-0 group-hover:w-full transition-all duration-500 absolute -bottom-0.5 left-0"></div>
    </div>
  );
};

export default LinkHoverBig;
