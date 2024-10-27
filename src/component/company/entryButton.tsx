// nextjs/src/component/company/entryButton.tsx

import React from "react";
import { css } from "../../../styled-system/css";

interface EntryButtonProps {
  onClick: () => void;
}

const EntryButton: React.FC<EntryButtonProps> = ({ onClick }) => {
  return (
    <button
      // onClick={onClick}
      className={`
    w-full max-w-lg 
    rounded-full 
    border border-[#21BDDB] 
    bg-gradient-to-r from-[#1B8BBF] to-[#21BDDB] 
    text-white 
    p-2.5 mt-2.5 
    text-sm font-bold 
    cursor-pointer 
    transition duration-300 
    shadow-md
    hover:opacity-70
    xl:max-w-full
  `}
    >
      エントリーする
    </button>
  );
};

export default EntryButton;
