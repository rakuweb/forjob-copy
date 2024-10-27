// nextjs/src/component/company/goodButton.tsx

import React from "react";
import { css } from "../../../../styled-system/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

interface GoodButtonProps {
  handleLike: () => void;
}

const GoodButton: React.FC<GoodButtonProps> = ({ handleLike }) => (
  <button
    // onClick={handleLike}
    className={css({
      base: {
        width: "100%",
        maxWidth: "400px",
        borderRadius: "100px",
        background: "linear-gradient(45deg,#CECECE, #FFFFFF )",
        color: "#0C96DE",
        padding: "10px",
        marginTop: "10px",
        fontSize: "14px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.3s ease-in-out",
        boxShadow: "2px 2px 2px 0 rgba(0, 0, 0, 0.1)",
        _hover: {
          opacity: 0.7,
          transition: "0.2s",
        },
      },
      xl: {
        maxWidth: "100%",
      },
    })}
  >
    企業に話を聞く
    <FontAwesomeIcon
      icon={faThumbsUp}
      className={css({ paddingLeft: "5px" })}
    />
  </button>
);

export default GoodButton;
