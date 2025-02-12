// nextjs/src/pages/company/[id].tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { initializeApollo } from "../../lib/apollo-client";
import { gql } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faLink,
  faLocationDot,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import AboutImageSlider from "@/component/company/image-slider";
import RecruitmentSlider from "@/component/company/RecruitmentSlider";
import EmployeeFeedbackSlider from "@/component/company/EmployeeFeedbackSlider";
import Modal from "@/component/Modal";
import ToggleInfo from "@/component/company/toggleInfo";
import OtherImageSlider from "@/component/company/slider";
import EntryButton from "@/component/company/entryButton";
import GoodButton from "@/component/company/goodButton";
import Head from "next/head";
const CompanyPage = ({ company, relatedCompanies }: any) => {
  const { name, image, occupations, industry, top_image, logo } =
    company.attributes;
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

  const [isOpen, setIsOpen] = useState({
    about1: false,
    about2: false,
    about3: false,
  });
  const toggleAccordion = (section: string) => {
    setIsOpen((prev: any) => ({ ...prev, [section]: !prev[section] }));
  };

  const router = useRouter();

  const handleApplyClick = () => {
    router.push(`/contact?companyId=${company.id}&inquiryItem=3`);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    setIsLoggedIn(!!jwt);
  }, []);
  const handleLike = async () => {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
      alert("ログインが必要です。");
      return;
    }

    const userId = sessionStorage.getItem("userId");
    const name = sessionStorage.getItem("name");
    const mail = sessionStorage.getItem("mail");
    const lineUserId = sessionStorage.getItem("lineUserId");
    if (!userId) {
      alert("ユーザーIDが取得できません。");
      return;
    }

    try {
      const response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
        body: JSON.stringify({
          userId: userId,
          name: name,
          mail: mail,
          companyId: company.id,
          lineUserId: lineUserId,
        }),
      });

      if (!response.ok) {
        throw new Error("既にいいね！をしています。");
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };
  const aboutPhotos = [
    ...company.attributes.about_photo1.data.map(
      (photo: any) => `${baseURL}${photo.attributes.url}`
    ),
    ...company.attributes.about_photo2.data.map(
      (photo: any) => `${baseURL}${photo.attributes.url}`
    ),
    ...company.attributes.about_photo3.data.map(
      (photo: any) => `${baseURL}${photo.attributes.url}`
    ),
  ];
  const openModal = (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(company.attributes);

  return (
    <>
      <Head>
        <title>
          {name}｜{company.attributes.philosophy_explanation}
        </title>
        <meta
          name="description"
          content={company.attributes.philosophy_explanation}
        />
        <meta
          property="og:title"
          content={`${name} | ${company.attributes.philosophy_explanation}`}
        />
        <meta
          property="og:description"
          content={company.attributes.philosophy_explanation}
        />
        <meta
          property="og:image"
          content={`${baseURL}${image.data[0].attributes.url}`}
        />
        <meta
          name="twitter:title"
          content={`${name} | ${company.attributes.philosophy_explanation}`}
        />
        <meta
          name="twitter:description"
          content={company.attributes.philosophy_explanation}
        />
        <meta
          name="twitter:image"
          content={`${baseURL}${image.data[0].attributes.url}`}
        />
      </Head>

      <div className="font-sans text-[#333]">
        <div className="flex items-center p-2 font-bold">
          {logo.data && (
            <img
              src={`${baseURL}${logo.data.attributes.url}`}
              alt={`Top image of ${name}`}
              className="text-[13px] p-2 shadow-[5px_5px_5px_rgba(0,0,0,0.1)] w-[10.67vw] md:w-[60px] md:h-[60px]"
            />
          )}
          <h1 className="text-[2.67vw] ml-[2.67vw] md:text-[14px] md:ml-[10px]">
            {name}
          </h1>
        </div>
        {top_image.data && (
          <img
            src={`${baseURL}${top_image.data.attributes.url}`}
            alt={`Top image of ${name}`}
            className="h-[40vw] w-full object-cover md:h-[360px]"
          />
        )}
        <div className="flex justify-center max-w-[1200px] my-[5.33vw] md:my-[30px] mx-auto">
          <div className="max-w-[900px] w-[95%] mx-auto xl:w-full">
            <div className="mx-auto">
              <h2 className="font-bold text-[5.33vw] md:text-[40px]">
                {company.attributes.philosophy_title}
              </h2>
              <p className="py-[1.33vw] text-[3.2vw] md:text-[14px]">
                {company.attributes.philosophy_explanation}
              </p>
            </div>
            <div className="flex flex-wrap w-full">
              {occupations.data.length > 0 ? (
                <ul className="flex flex-wrap">
                  {occupations.data.map((occupation: any, index: number) => (
                    <li
                      key={index}
                      className="border border-[#333] rounded-full text-[2.13vw] p-[0.53vw_2.67vw] mr-[1.33vw] mb-[1.33vw] md:text-[10px] md:mr-[10px] md:p-[5px_20px] md:mb-[10px]"
                    >
                      {occupation.attributes.occupation}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>職種情報はありません。</p>
              )}

              {industry.data ? (
                <p className="border border-[#21BDDB] text-white bg-[#21BDDB] rounded-full text-[2.13vw] p-[0.53vw_2.67vw] mr-[1.33vw] mb-[1.33vw] md:text-[10px] md:mr-[10px] md:p-[5px_20px] md:mb-[10px]">
                  {industry.data.attributes.industry}
                </p>
              ) : (
                <p>業界情報はありません。</p>
              )}
            </div>

            <h2 className="font-bold text-[#21BDDB] text-[3.73vw] mt-[5.33vw] md:text-[18px] md:mt-[30px]">
              企業について
            </h2>
            <div className="w-full my-[2.67vw] md:m-[10px_auto_50px]">
              <AboutImageSlider images={aboutPhotos} />
            </div>

            <ul>
              <ToggleInfo
                company={company}
                section="1"
                toggleAccordion={toggleAccordion}
                isOpen={isOpen}
                openModal={openModal}
              />
              <ToggleInfo
                company={company}
                section="2"
                toggleAccordion={toggleAccordion}
                isOpen={isOpen}
                openModal={openModal}
              />
              <ToggleInfo
                company={company}
                section="3"
                toggleAccordion={toggleAccordion}
                isOpen={isOpen}
                openModal={openModal}
              />
            </ul>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              imageSrc={currentImage}
            />

            <h2 className="font-bold text-[#21BDDB] text-[3.73vw] mt-[5.33vw] md:text-[18px] md:mt-[30px]">
              募集している求人
            </h2>

            <div className="w-full mx-auto">
              {company.attributes.recruitments.data.length > 0 ? (
                <RecruitmentSlider
                  recruitments={company.attributes.recruitments.data}
                  baseURL={baseURL ?? ""}
                />
              ) : (
                <p>募集している求人はありません。</p>
              )}
            </div>

            <h2 className="font-bold text-[#21BDDB] text-[3.73vw] mt-[13.33vw] md:text-[18px] md:mt-[30px]">
              社員の声
            </h2>
            {company.attributes.feedbacks.data.length > 0 ? (
              <EmployeeFeedbackSlider
                feedbacks={company.attributes.feedbacks.data}
                baseURL={baseURL ?? ""}
              />
            ) : (
              <p>社員の声はありません。</p>
            )}
            <h2 className="font-bold text-[#21BDDB] text-[3.73vw] mt-[13.33vw] md:text-[18px] md:mt-[30px]">
              会社情報
            </h2>
            <div className="flex w-full flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                <div className="flex items-center font-bold p-0 md:p-2.5">
                  {logo.data && (
                    <img
                      src={`${baseURL}${logo.data.attributes.url}`}
                      alt={`Top image of ${name}`}
                      className="w-[8vw] max-w-[50px] p-[1.33vw] md:w-[50px] md:p-2.5"
                    />
                  )}
                  <h2 className="ml-2.5 text-[3.2vw] md:text-[14px]">{name}</h2>
                </div>
                <p className="text-[3.2vw] md:text-[14px]">
                  <FontAwesomeIcon icon={faLocationDot} className="w-4" />{" "}
                  {company.attributes.address}
                </p>
                <p className="text-[3.2vw] md:text-[14px]">
                  <FontAwesomeIcon icon={faLink} className="w-4" />{" "}
                  <a
                    href={company.attributes.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {company.attributes.url}
                  </a>
                </p>
                <p className="text-[3.2vw] md:text-[14px]">
                  <FontAwesomeIcon icon={faPerson} className="w-4" />{" "}
                  {company.attributes.employees}
                </p>
                <p className="text-[3.2vw] md:text-[14px]">
                  <FontAwesomeIcon icon={faFlag} className="w-4" />{" "}
                  {company.attributes.founding}
                </p>
              </div>
              <div
                className="w-full mt-[2.67vw] md:w-1/2 md:mt-0 overflow-hidden shadow-[5px_5px_5px_rgba(0,0,0,0.1)]"
                dangerouslySetInnerHTML={{ __html: company.attributes.map }}
              ></div>
            </div>
          </div>
          <div className="hidden xl:block sticky top-[10px] z-[100] bg-white py-[10px] h-[300px] w-[220px] m-[30px_auto]">
            <div className="flex items-center p-2.5 font-bold">
              {logo.data && (
                <img
                  src={`${baseURL}${logo.data.attributes.url}`}
                  alt={`Top image of ${name}`}
                  className="text-[13px] p-[5px] shadow-[5px_5px_5px_rgba(0,0,0,0.1)] w-[30px]"
                />
              )}
              <h2 className="ml-2.5 text-[12px]">{name}</h2>
            </div>
            <div>
              <a
                href={company.attributes.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px]"
              >
                <FontAwesomeIcon icon={faLink} className="w-4" />{" "}
                {company.attributes.url}
              </a>
              <p className="text-[10px]">
                <FontAwesomeIcon icon={faLocationDot} className="w-4" />{" "}
                {company.attributes.address}
              </p>
            </div>
            <div className="flex flex-col items-start">
              <EntryButton onClick={handleApplyClick} />
              <GoodButton handleLike={handleLike} />
            </div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] mt-[8vw] p-[2.67vw] md:mt-[50px] md:p-[20px]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-bold text-[#21BDDB] text-[3.73vw] mt-[5.33vw] mb-[2.67vw] md:text-[18px] md:mt-[30px] md:mb-[10px]">
              他の企業HP
            </h2>
            <OtherImageSlider companies={relatedCompanies} />
          </div>
        </div>

        <div className="flex sticky bottom-2.5 p-2.5 z-[100] justify-around xl:hidden">
          <EntryButton onClick={handleApplyClick} />
          <GoodButton handleLike={handleLike} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { params } = context;
  const apolloClient = initializeApollo();
  const relatedCompaniesData = await apolloClient.query({
    query: gql`
      query {
        companies(pagination: { limit: 10000 }) {
          data {
            id
            attributes {
              name
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
              logo {
                data {
                  attributes {
                    url
                  }
                }
              }
              occupations {
                data {
                  attributes {
                    occupation
                  }
                }
              }
              industry {
                data {
                  attributes {
                    industry
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { industry: "特定の業界" },
  });

  const { data } = await apolloClient.query({
    query: gql`
      query GetCompany($id: ID!) {
        company(id: $id) {
          data {
            id
            attributes {
              name
              philosophy_title
              philosophy_explanation
              about_title1
              about_text1
              about_title2
              about_text2
              about_title3
              about_text3
              address
              url
              employees
              founding
              map

              recruitments {
                data {
                  attributes {
                    image {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                    occupation
                    title
                    minimum_salary
                    maximum_salary
                    work_place
                  }
                }
              }
              feedbacks {
                data {
                  attributes {
                    text
                    occupation
                    age

                    image {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                  }
                }
              }
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
              top_image {
                data {
                  attributes {
                    url
                  }
                }
              }
              about_photo1 {
                data {
                  attributes {
                    url
                  }
                }
              }
              about_photo2 {
                data {
                  attributes {
                    url
                  }
                }
              }
              about_photo3 {
                data {
                  attributes {
                    url
                  }
                }
              }
              logo {
                data {
                  attributes {
                    url
                  }
                }
              }
              occupations {
                data {
                  attributes {
                    occupation
                  }
                }
              }
              industry {
                data {
                  attributes {
                    industry
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { id: params.id },
  });

  return {
    props: {
      company: data.company.data,
      relatedCompanies: relatedCompaniesData.data.companies.data,
    },
  };
}

export default CompanyPage;
