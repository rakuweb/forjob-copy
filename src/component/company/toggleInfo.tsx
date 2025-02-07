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
    <li className="border-t border-gray-200 py-[2.67vw] md:py-5">
      <div className="w-[95%] mx-auto">
        <h3
          onClick={() => toggleAccordion(section)}
          className="font-bold cursor-pointer flex items-center justify-between text-[3.2vw] md:text-base"
        >
          {company.attributes[`about_title${section}`]}
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-xs text-gray-600"
          />
        </h3>
        <div
          style={{
            maxHeight: `${contentHeight}px`,
            overflow: "hidden",
            transition: "max-height 0.3s ease-out",
          }}
        >
          <div ref={ref} className="pt-[2.67vw] md:pt-5">
            <p className="leading-6 text-[3.2vw] md:text-sm">
              {company.attributes[`about_text${section}`]}
            </p>
            {company.attributes[`about_photo${section}`].data.length > 0 && (
              <div className="flex flex-row flex-wrap justify-between">
                {company.attributes[`about_photo${section}`].data.map(
                  (photo: any, index: number) => (
                    <img
                      key={index}
                      src={`${baseURL}${photo.attributes.url}`}
                      alt={`About section image ${index + 1}`}
                      className="w-[49%] object-cover cursor-pointer mt-4 rounded-lg h-[26.67vw] md:h-[300px]"
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
