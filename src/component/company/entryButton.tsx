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
      className={css({
        base: {
          width: "100%",
          maxWidth: "400px",
          borderRadius: "100px",
          border: "1px solid #21BDDB",
          background: "linear-gradient(45deg,#1B8BBF, #21BDDB )",
          color: "#fff",
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
      エントリーする
    </button>
  );
};

export default EntryButton;
