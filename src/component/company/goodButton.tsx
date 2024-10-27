// nextjs/src/component/company/goodButton.tsx

import React from "react";
import { css } from "../../../styled-system/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

interface GoodButtonProps {
  handleLike: () => void;
}

const GoodButton: React.FC<GoodButtonProps> = ({ handleLike }) => (
  <button
    // onClick={handleLike}
    className="
    w-full max-w-lg 
    rounded-full 
    bg-gradient-to-r from-[#CECECE] to-[#FFFFFF] 
    text-[#0C96DE] 
    p-2.5 mt-2.5 
    text-sm font-bold 
    cursor-pointer 
    transition duration-300 
    shadow-md 
    hover:opacity-70
    xl:max-w-full
  "
  >
    企業に話を聞く
    <FontAwesomeIcon icon={faThumbsUp} className="pl-1.5" />
  </button>
);

export default GoodButton;
