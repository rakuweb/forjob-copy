// nextjs/src/component/Modal.tsx

import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc }) => {
  const [shouldDisplay, setShouldDisplay] = useState(isOpen);
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    if (isOpen) {
      setShouldDisplay(true);
      setAnimation("fadeIn 0.2s");
    } else {
      setAnimation("fadeOut 0.21s");
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
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        }}
        onClick={() => onClose()}
      >
        <img
          src={imageSrc}
          alt="Modal"
          style={{ maxWidth: "90%", maxHeight: "90%" }}
        />
      </div>
    </>
  );
};

export default Modal;
