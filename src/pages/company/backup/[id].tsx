// nextjs/src/pages/company/[id].tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { initializeApollo } from "../../../lib/apollo-client";
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
import { css } from "../../../../styled-system/css";
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

      <div
        className={css({
          fontFamily: "'Noto Sans JP', sans-serif",
          color: "#333",
        })}
      >
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            padding: "10px",
            fontWeight: "bold",
          })}
        >
          {logo.data && (
            <img
              src={`${baseURL}${logo.data.attributes.url}`}
              alt={`Top image of ${name}`}
              className={css({
                fontSize: "13px",
                padding: "10px 10px",
                boxShadow: "5px 5px 5px 0 rgba(0, 0, 0, 0.1)",

                base: { width: `${40 / 3.75}vw` },
                md: { width: "60px", height: "60px" },
              })}
            />
          )}
          <h1
            className={css({
              base: {
                fontSize: `${10 / 3.75}vw`,
                marginLeft: `${10 / 3.75}vw`,
              },
              md: { fontSize: "14px", marginLeft: `10px` },
            })}
          >
            {name}
          </h1>
        </div>
        {top_image.data && (
          <img
            src={`${baseURL}${top_image.data.attributes.url}`}
            alt={`Top image of ${name}`}
            className={css({
              height: "auto",
              base: {
                width: "100%",
                height: `${150 / 3.75}vw`,
                objectFit: "cover",
              },
              md: { width: "100%", height: "360px" },
            })}
          />
        )}
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            maxWidth: "1200px",

            base: { margin: `${20 / 3.75}vw auto` },
            md: { margin: "30px auto" },
          })}
        >
          <div
            className={css({
              maxWidth: "900px",
              base: {
                w: "95%",
                margin: "0 auto",
              },
              xl: {
                w: "100%",
              },
            })}
          >
            <div className={css({ margin: "auto" })}>
              <h2
                className={css({
                  fontWeight: "bold",

                  base: { fontSize: `${20 / 3.75}vw` },
                  md: { fontSize: "40px" },
                })}
              >
                {company.attributes.philosophy_title}
              </h2>
              <p
                className={css({
                  padding: "10px 0",
                  base: {
                    fontSize: `${12 / 3.75}vw`,
                    padding: `${5 / 3.75}vw 0`,
                  },
                  md: { fontSize: "14px" },
                })}
              >
                {company.attributes.philosophy_explanation}
              </p>
            </div>
            <div
              className={css({
                display: "flex",
                flexWrap: `wrap`,
                width: "100%",
              })}
            >
              {occupations.data.length > 0 ? (
                <ul
                  className={css({
                    display: "flex",
                    flexWrap: "wrap",
                  })}
                >
                  {occupations.data.map((occupation: any, index: number) => (
                    <li
                      className={css({
                        border: "1px solid #333",
                        borderRadius: "100px",

                        base: {
                          fontSize: `${8 / 3.75}vw`,
                          padding: `${2 / 3.75}vw ${10 / 3.75}vw`,
                          marginRight: `${5 / 3.75}vw`,
                          mb: `${5 / 3.75}vw`,
                        },
                        md: {
                          fontSize: "10px",
                          marginRight: "10px",
                          padding: "5px 20px",
                          mb: `10px`,
                        },
                      })}
                      key={index}
                    >
                      {occupation.attributes.occupation}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>職種情報はありません。</p>
              )}

              {industry.data ? (
                <p
                  className={css({
                    border: "1px solid #21BDDB",
                    color: "#fff",
                    backgroundColor: "#21BDDB",
                    borderRadius: "100px",

                    base: {
                      fontSize: `${8 / 3.75}vw`,
                      padding: `${2 / 3.75}vw ${10 / 3.75}vw`,
                      marginRight: `${5 / 3.75}vw`,
                      mb: `${5 / 3.75}vw`,
                    },
                    md: {
                      fontSize: "10px",
                      marginRight: "10px",
                      padding: "5px 20px",
                      mb: `10px`,
                    },
                  })}
                >
                  {industry.data.attributes.industry}
                </p>
              ) : (
                <p>業界情報はありません。</p>
              )}
            </div>

            <h2
              className={css({
                fontWeight: "bold",
                color: "#21BDDB",

                base: {
                  fontSize: `${14 / 3.75}vw`,
                  marginTop: `${20 / 3.75}vw`,
                },
                md: { fontSize: "18px", marginTop: "30px" },
              })}
            >
              企業について
            </h2>
            <div
              className={css({
                width: "100%",

                base: { margin: `${10 / 3.75}vw auto ${20 / 3.75}vw` },
                md: { margin: "10px auto 50px" },
              })}
            >
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

            <h2
              className={css({
                fontWeight: "bold",
                color: "#21BDDB",

                base: {
                  fontSize: `${14 / 3.75}vw`,
                  marginTop: `${20 / 3.75}vw`,
                },
                md: { fontSize: "18px", marginTop: "30px" },
              })}
            >
              募集している求人
            </h2>

            <div style={{ margin: "auto", width: "100%" }}>
              {company.attributes.recruitments.data.length > 0 ? (
                <RecruitmentSlider
                  recruitments={company.attributes.recruitments.data}
                  baseURL={baseURL ?? ""}
                />
              ) : (
                <p>募集している求人はありません。</p>
              )}
            </div>

            <h2
              className={css({
                fontWeight: "bold",
                color: "#21BDDB",

                base: {
                  fontSize: `${14 / 3.75}vw`,
                  marginTop: `${50 / 3.75}vw`,
                },
                md: { fontSize: "18px", marginTop: "30px" },
              })}
            >
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
            <h2
              className={css({
                fontWeight: "bold",
                color: "#21BDDB",

                base: {
                  fontSize: `${14 / 3.75}vw`,
                  marginTop: `${50 / 3.75}vw`,
                },
                md: { fontSize: "18px", marginTop: "30px" },
              })}
            >
              会社情報
            </h2>
            <div
              className={css({
                display: "flex",
                width: "100%",
                base: { flexDirection: "column" },
                md: { flexDirection: "row" },
              })}
            >
              <div
                className={css({
                  base: { width: "100%" },
                  md: { width: "50%" },
                })}
              >
                <div
                  className={css({
                    display: "flex",
                    alignItems: "center",

                    fontWeight: "bold",
                    base: { padding: "0" },
                    md: { padding: "10px" },
                  })}
                >
                  {logo.data && (
                    <img
                      src={`${baseURL}${logo.data.attributes.url}`}
                      alt={`Top image of ${name}`}
                      className={css({
                        base: {
                          width: `${30 / 3.75}vw`,
                          maxWidth: "50px",
                          padding: `${5 / 3.75}vw`,
                        },
                        md: { width: "50px", padding: "10px 10px" },
                      })}
                    />
                  )}
                  <h2
                    className={css({
                      margin: "0 0 0 10px",

                      base: { fontSize: `${12 / 3.75}vw` },
                      md: { fontSize: "14px" },
                    })}
                  >
                    {name}
                  </h2>
                </div>
                <p
                  className={css({
                    base: { fontSize: `${12 / 3.75}vw` },
                    md: { fontSize: "14px" },
                  })}
                >
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={css({ width: "1em" })}
                  />
                  　{company.attributes.address}
                </p>
                <p
                  className={css({
                    base: { fontSize: `${12 / 3.75}vw` },
                    md: { fontSize: "14px" },
                  })}
                >
                  <FontAwesomeIcon
                    icon={faLink}
                    className={css({ width: "1em" })}
                  />
                  　
                  <a
                    href={company.attributes.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {company.attributes.url}
                  </a>
                </p>
                <p
                  className={css({
                    base: { fontSize: `${12 / 3.75}vw` },
                    md: { fontSize: "14px" },
                  })}
                >
                  <FontAwesomeIcon
                    icon={faPerson}
                    className={css({ width: "1em" })}
                  />
                  　{company.attributes.employees}
                </p>
                <p
                  className={css({
                    base: { fontSize: `${12 / 3.75}vw` },
                    md: { fontSize: "14px" },
                  })}
                >
                  <FontAwesomeIcon
                    icon={faFlag}
                    className={css({ width: "1em" })}
                  />
                  　{company.attributes.founding}
                </p>
              </div>
              <div
                className={css({
                  overflow: "hidden",
                  boxShadow: "5px 5px 5px 0 rgba(0, 0, 0, 0.1)",

                  base: { width: "100%", marginTop: `${10 / 3.75}vw` },
                  md: { width: "50%", marginTop: "0" },
                })}
                dangerouslySetInnerHTML={{ __html: company.attributes.map }}
              ></div>
            </div>
          </div>
          <div
            className={css({
              base: { display: "none" },
              xl: {
                display: "block",
                position: "sticky",
                top: 10,
                zIndex: 100,
                background: "#fff",
                padding: "10px 0",
                height: "300px",
                margin: "30px auto",
                width: "220px",
              },
            })}
          >
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                padding: "10px",
                fontWeight: "bold",
              })}
            >
              {logo.data && (
                <img
                  src={`${baseURL}${logo.data.attributes.url}`}
                  alt={`Top image of ${name}`}
                  className={css({
                    fontSize: "13px",
                    padding: "5px 5px",
                    boxShadow: "5px 5px 5px 0 rgba(0, 0, 0, 0.1)",
                    width: "30px",
                  })}
                />
              )}
              <h2 className={css({ margin: "0 0 0 10px", fontSize: "12px" })}>
                {name}
              </h2>
            </div>
            <div className={css({})}>
              <a
                href={company.attributes.url}
                target="_blank"
                rel="noopener noreferrer"
                className={css({ fontSize: "10px" })}
              >
                <FontAwesomeIcon
                  icon={faLink}
                  className={css({ width: "1em" })}
                />
                <span> </span>
                {company.attributes.url}
              </a>
              <p className={css({ fontSize: "10px" })}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={css({ width: "1em" })}
                />
                <span> </span>
                {company.attributes.address}
              </p>
            </div>
            {/* {isLoggedIn && ( */}
            <>
              <div
                className={css({
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "flex-start",
                })}
              >
                <EntryButton onClick={handleApplyClick} />
                <GoodButton handleLike={handleLike} />
              </div>
            </>
            {/* )} */}
          </div>
        </div>
        <div
          className={css({
            backgroundColor: "#FAFAFA",

            base: { marginTop: `${30 / 3.75}vw`, padding: `${10 / 3.75}vw` },
            md: { marginTop: "50px", padding: "20px" },
          })}
        >
          <div className={css({ maxWidth: "1200px", margin: "auto" })}>
            <h2
              className={css({
                fontWeight: "bold",
                color: "#21BDDB",

                base: {
                  fontSize: `${14 / 3.75}vw`,
                  marginTop: `${20 / 3.75}vw`,
                  mb: `${10 / 3.75}vw`,
                },
                md: { fontSize: "18px", marginTop: "30px", mb: "10px" },
              })}
            >
              他の企業HP
            </h2>

            <OtherImageSlider companies={relatedCompanies} />
          </div>
        </div>

        <div
          className={css({
            base: {
              display: "flex",
              position: "sticky",
              bottom: "10px",
              padding: "10px",

              zIndex: 100,
              justifyContent: "space-around",
            },
            xl: {
              display: "none",
            },
          })}
        >
          {/* {isLoggedIn && ( */}
          <>
            <EntryButton onClick={handleApplyClick} />
            <GoodButton handleLike={handleLike} />
          </>
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
