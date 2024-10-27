// nextjs/src/component/company/ModalComponent.tsx

import React, { useState, useEffect } from "react";
import { css } from "../../../styled-system/css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [shouldDisplay, setShouldDisplay] = useState(isOpen);
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    if (isOpen) {
      setShouldDisplay(true);
      setAnimation("fadeIn 0.2s forwards");
    } else {
      setAnimation("fadeOut 0.21s forwards");
    }
  }, [isOpen]);

  useEffect(() => {
    if (animation.includes("fadeOut")) {
      const timer = setTimeout(() => {
        setShouldDisplay(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [animation]);

  if (!shouldDisplay) return null;

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .modal {
          animation: ${animation};
        }
      `}</style>
      <div
        className="modal"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "white",
          }}
          className={css({
            base: {
              padding: `${10 / 3.75}vw`,
              width: "90%",
            },
            md: {
              padding: "20px",
              width: "50%",
            },
          })}
        >
          <button
            className={css({
              color: "#666",
              fontWeight: "bold",
              display: "block",
              marginLeft: "auto",
              _hover: { cursor: "pointer" },
              base: { fontSize: `${20 / 3.75}vw` },
              md: { fontSize: "30px" },
            })}
            type="button"
            onClick={onClose}
          >
            ×
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
