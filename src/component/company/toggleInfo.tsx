// nextjs/src/component/company/toggleInfo.tsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { css } from "../../../styled-system/css";
import { useResizeDetector } from "react-resize-detector";

const ToggleInfo = ({
  company,
  section,
  toggleAccordion,
  isOpen,
  openModal,
}: {
  company: any;
  section: string;
  toggleAccordion: (section: string) => void;
  isOpen: any;
  openModal: (imageUrl: string) => void;
}) => {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const { ref, height } = useResizeDetector();
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (isOpen[section]) {
      setContentHeight((height || 0) + 30);
    } else {
      setContentHeight(0);
    }
  }, [isOpen, section, height]);

  const hasData =
    company.attributes[`about_title${section}`] &&
    company.attributes[`about_text${section}`] &&
    company.attributes[`about_photo${section}`]?.data?.length > 0;

  const iconStyle = {
    transform: isOpen[section] ? "rotate(-180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease-out",
  };

  if (!hasData) return null;

  return (
    <li
      className={css({
        borderTop: "1px solid #eee",

        base: { padding: `${10 / 3.75}vw 0` },
        md: { padding: "20px 0" },
      })}
    >
      <div className={css({ w: "95%", m: "auto" })}>
        <h3
          onClick={() => toggleAccordion(section)}
          className={css({
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            base: { fontSize: `${12 / 3.75}vw` },
            md: { fontSize: "16px" },
          })}
        >
          {company.attributes[`about_title${section}`]}
          <FontAwesomeIcon
            icon={faChevronDown}
            style={iconStyle}
            className={css({ fontSize: "12px", color: "#555" })}
          />
        </h3>
        <div
          style={{
            maxHeight: `${contentHeight}px`,
            overflow: "hidden",
            transition: "max-height 0.3s ease-out",
          }}
          className={css({})}
        >
          <div
            ref={ref}
            className={css({
              base: { paddingTop: `${10 / 3.75}vw` },
              md: { paddingTop: "20px" },
            })}
          >
            <p
              className={css({
                lineHeight: "1.6",

                base: { fontSize: `${12 / 3.75}vw` },
                md: { fontSize: "14px" },
              })}
            >
              {company.attributes[`about_text${section}`]}
            </p>
            {company.attributes[`about_photo${section}`].data.length > 0 && (
              <div
                className={css({
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                })}
              >
                {company.attributes[`about_photo${section}`].data.map(
                  (photo: any, index: number) => (
                    <img
                      key={index}
                      src={`${baseURL}${photo.attributes.url}`}
                      alt={`About section image ${index + 1}`}
                      style={{
                        width: "49%",

                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      className={css({
                        marginTop: "15px",
                        borderRadius: "10px",

                        base: { height: `${100 / 3.75}vw` },
                        md: { height: "300px" },
                      })}
                      onClick={() =>
                        openModal(`${baseURL}${photo.attributes.url}`)
                      }
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ToggleInfo;
