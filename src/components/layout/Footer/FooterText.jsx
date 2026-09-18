"use client";

import Wordmark from "@/components/common/Wordmark";
import React from "react";

const FooterText = ({ className = "", isInView = false }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <Wordmark
        className="h-auto w-full"
        color="black"
        animated
        isInView={isInView}
      />
    </div>
  );
};

export default FooterText;
