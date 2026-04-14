import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
