// nextjs/src/pages/index.tsx
import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apollo-client";
import ImageSlider from "../component/top/slider";
import { GetServerSideProps } from "next";
import { css } from "../../styled-system/css";
import Link from "next/link";
import Head from "next/head";

type Company = {
  id: string;
  attributes: {
    name: string;
    philosophy_title: string;
    philosophy_explanation: string;
    createdAt: string;
    updatedAt: string;
    image: {
      data: {
        id: string;
        attributes: {
          url: string;
        };
      }[];
    };
    occupations: {
      data: {
        id: string;
        attributes: {
          occupation: string;
        };
      }[];
    };
    industry: {
      data: {
        id: string;
        attributes: {
          industry: string;
        };
      };
    };
    logo: {
      data: {
        id: string;
        attributes: {
          url: string;
        };
      };
    };
  };
};

const itemsPerPage = 5;
type HomeProps = {
  allCompanies: Company[];
  totalPages: number;
};

export default function Home({
  allCompanies,
  totalPages: initialTotalPages,
}: HomeProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const [filteredCompanies, setFilteredCompanies] = useState(allCompanies);

  const [filteredTotalPages, setFilteredTotalPages] =
    useState(initialTotalPages);

  const [searchedName, setSearchedName] = useState("");

  useEffect(() => {
    const result = allCompanies.filter(({ attributes }) => {
      const occupationMatch = selectedOccupation
        ? attributes.occupations.data.some(
            (occupation) =>
              occupation.attributes.occupation === selectedOccupation
          )
        : true;
      const industryMatch = selectedIndustry
        ? attributes.industry.data?.attributes.industry === selectedIndustry
        : true;
      const nameMatch = attributes.name
        .toLowerCase()
        .includes(searchedName.toLowerCase());

      return occupationMatch && industryMatch && nameMatch;
    });

    setFilteredCompanies(result);
    setFilteredTotalPages(Math.ceil(result.length / itemsPerPage));
    setCurrentPage(0);
  }, [selectedOccupation, selectedIndustry, allCompanies, searchedName]); // searchQu

  const resetFilters = () => {
    setSearchedName("");
    setSelectedOccupation("");
    setSelectedIndustry("");
  };

  const baseURL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

  const currentCompanies = allCompanies.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < filteredTotalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const renderPageNumbers = () => {
    let pages = [];
    let startPage = Math.max(currentPage - 1, 0);
    let endPage = Math.min(startPage + 2, filteredTotalPages - 1);

    if (currentPage < 1) {
      startPage = 0;
      endPage = Math.min(2, filteredTotalPages - 1);
    }

    if (currentPage > filteredTotalPages - 2) {
      startPage = Math.max(filteredTotalPages - 3, 0);
      endPage = filteredTotalPages - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={css({
            mr:
              startPage === endPage
                ? ``
                : { base: `${15 / 3.75}vw`, lg: `${25 / 12}vw` },
            fontWeight: `bold`,
            color: i === currentPage ? `black` : `rgba(0, 0, 0, 0.4)`,
            textDecoration: i === currentPage ? "underline" : "none",
            fontSize: { base: `${16 / 3.75}vw`, lg: `${16 / 12}vw` },
            _hover: {
              cursor: "pointer",
              color: `black`,
            },
          })}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  const firstPage = () => {
    if (currentPage > 0) {
      setCurrentPage(0);
    }
  };

  const lastPage = () => {
    setCurrentPage(filteredTotalPages - 1);
  };

  const currentFilteredCompanies = filteredCompanies.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  console.log("現在のページの会社データ:", currentCompanies);

  const companyEvents = Math.min(
    itemsPerPage * (currentPage + 1),
    filteredCompanies.length
  );

  return (
    <div>
      <Head>
        <title>新大生の就職はSHINDAI BOX!!｜新大生専門マッチングサイト</title>
        <meta
          name="description"
          content="SHINDAI BOXで新大生の就活が変わる！企業からのオファーで理想の仕事を見つけよう。新大生と企業を直結するマッチングサイト。"
        />
        <meta
          property="og:title"
          content="新大生の就職はSHINDAI BOX!!｜新大生専門マッチングサイト"
        />
        <meta
          property="og:description"
          content="SHINDAI BOXで新大生の就活が変わる！企業からのオファーで理想の仕事を見つけよう。新大生と企業を直結するマッチングサイト。"
        />
        <meta
          name="twitter:title"
          content="新大生の就職はSHINDAI BOX!!｜新大生専門マッチングサイト"
        />
        <meta
          name="twitter:description"
          content="SHINDAI BOXで新大生の就活が変わる！企業からのオファーで理想の仕事を見つけよう。新大生と企業を直結するマッチングサイト。"
        />
        <meta name="twitter:image" content="/ogp.png" />
      </Head>
      <ImageSlider companies={allCompanies} />
      <div
        className={css({
          display: "flex",
          flexDirection: { base: `column-reverse`, lg: `initial` },
          ml: { base: `${15 / 3.75}vw`, lg: `${153 / 12}vw` },
        })}
      >
        <div>
          <p
            className={css({
              display: { base: `none`, lg: `block` },
              mt: { base: `${15 / 3.75}vw`, lg: `${50 / 12}vw` },
              mb: { base: `${15 / 3.75}vw`, lg: `${30 / 12}vw` },
              fontWeight: "bold",
              fontSize: { base: "1.5rem", lg: `${16 / 12}vw` },
            })}
          >
            {companyEvents}/{filteredCompanies.length} companies
          </p>
          <ul
            className={css({
              w: { base: `${345 / 3.75}vw`, lg: `${640 / 12}vw` },
            })}
          >
            {currentFilteredCompanies.map(({ id, attributes }) => (
              <li key={id}>
                <Link href={`/company/${id}`}>
                  {attributes.image.data.length > 0 && (
                    <img
                      src={`${baseURL}${attributes.image.data[0].attributes.url}`}
                      alt={attributes.name}
                      className={css({
                        w: { base: `${345 / 3.75}vw`, lg: `${640 / 12}vw` },
                        h: { base: `${150 / 3.75}vw`, lg: `${272 / 12}vw` },
                        objectFit: `cover`,
                        borderRadius: "4px",
                        overflow: "hidden",
                      })}
                    />
                  )}
                  <div
                    className={css({
                      display: "flex",
                      flexWrap: `wrap`,
                      mt: { base: `${15 / 3.75}vw`, lg: `${13 / 12}vw` },
                    })}
                  >
                    {attributes.industry.data && (
                      <div
                        className={css({
                          w: `fit-content`,
                          border: "1px solid #9EA4A6",
                          color: `#4c4b4b`,
                          py: { base: `${5 / 3.75}vw`, lg: `${4 / 12}vw` },
                          px: { base: `${10 / 3.75}vw`, lg: `${18 / 12}vw` },
                          mr: { base: `${5 / 3.75}vw`, lg: `${8 / 12}vw` },
                          mb: { base: `${5 / 3.75}vw`, lg: `${5 / 12}vw` },
                          borderRadius: "999px",
                          fontSize: {
                            base: `${10 / 3.75}vw`,
                            lg: `${8 / 12}vw`,
                          },
                          lineHeight: `2em`,
                        })}
                      >
                        {attributes.industry.data.attributes.industry}
                      </div>
                    )}
                    {attributes.occupations.data.length > 0 &&
                      attributes.occupations.data.map((occupation, index) => (
                        <div
                          key={index}
                          className={css({
                            w: `fit-content`,
                            bg: `#21BDDB`,
                            color: `#ffffff`,
                            py: { base: `${5 / 3.75}vw`, lg: `${4 / 12}vw` },
                            px: { base: `${10 / 3.75}vw`, lg: `${18 / 12}vw` },
                            mr: { base: `${5 / 3.75}vw`, lg: `${8 / 12}vw` },
                            mb: { base: `${5 / 3.75}vw`, lg: `${5 / 12}vw` },
                            borderRadius: "999px",
                            fontSize: {
                              base: `${10 / 3.75}vw`,
                              lg: `${8 / 12}vw`,
                            },
                            lineHeight: `2em`,
                          })}
                        >
                          {occupation.attributes.occupation}
                        </div>
                      ))}
                  </div>

                  <p
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    className={css({
                      mt: { base: "5px", lg: `${7 / 12}vw` },
                      fontWeight: `bold`,
                      fontSize: { base: `${18 / 3.75}vw`, lg: `${16 / 12}vw` },
                    })}
                  >
                    {attributes.philosophy_title}
                  </p>
                  <p
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    className={css({
                      mt: { base: "5px", lg: `${7 / 12}vw` },
                      fontSize: { base: `${14 / 3.75}vw`, lg: `${9 / 12}vw` },
                      lineHeight: { base: `1.5em`, lg: `2.5em` },
                    })}
                  >
                    {attributes.philosophy_explanation}
                  </p>
                  <div
                    className={css({
                      display: { lg: `none` },
                      w: `100%`,
                      borderTop: `1px solid rgba(0, 0, 0, 0.12)`,
                      my: { base: `${8 / 3.75}vw` },
                    })}
                  />
                  <div
                    className={css({
                      display: "flex",
                      mt: { base: `${5 / 3.75}vw`, lg: `${10 / 12}vw` },
                      mb: { base: `${16 / 3.75}vw`, lg: `${0 / 12}vw` },
                    })}
                  >
                    {attributes.logo.data && (
                      <img
                        src={`${baseURL}${attributes.logo.data.attributes.url}`}
                        alt={`${attributes.name}のロゴ`}
                        className={css({
                          w: { base: `${34 / 3.75}vw`, lg: `${36 / 12}vw` },

                          mr: { base: `${10 / 3.75}vw`, lg: `${8 / 12}vw` },
                        })}
                      />
                    )}
                    <h3
                      className={css({
                        fontSize: {
                          base: `${14 / 3.75}vw`,
                          lg: `${14 / 12}vw`,
                        },
                        fontWeight: `600`,
                        color: `rgba(0, 0, 0, 0.53)`,
                        lineHeight: `2.5em`,
                      })}
                    >
                      {attributes.name}
                    </h3>
                  </div>
                </Link>
                <div
                  className={css({
                    display: { base: `none`, lg: `block` },
                    w: `100%`,
                    borderTop: `1px solid rgba(0, 0, 0, 0.12)`,
                    mt: { lg: `${10 / 12}vw` },
                    mb: { lg: `${48 / 12}vw` },
                  })}
                />
              </li>
            ))}
          </ul>
        </div>

        <div
          className={css({
            position: { lg: `sticky` },
            top: "0",
            w: { base: `${345 / 3.75}vw`, lg: `${240 / 12}vw` },
            h: `fit-content`,
            mt: { base: `${15 / 3.75}vw`, lg: `${52 / 12}vw` },
            mb: { base: `${15 / 3.75}vw`, lg: `${48 / 12}vw` },
            ml: { base: `${0 / 3.75}vw`, lg: `${52 / 12}vw` },
          })}
        >
          <div
            className={css({
              display: `flex`,
              fontWeight: `bold`,
              fontSize: { base: `${16 / 3.75}vw`, lg: `${16 / 12}vw` },
              mb: { base: `${15 / 3.75}vw`, lg: `${18 / 12}vw` },
              justifyContent: `space-between`,
            })}
          >
            条件を絞り込む
            <img
              src={`/svg/xbutton.svg`}
              alt={`バツ印`}
              onClick={resetFilters}
              className={css({
                w: { base: `${24 / 3.75}vw`, lg: `${20 / 12}vw` },
                opacity: 0.4,
                _hover: {
                  cursor: "pointer",
                  opacity: 1,
                },
              })}
            />
          </div>
          <input
            type="text"
            value={searchedName}
            onChange={(e) => setSearchedName(e.target.value)}
            placeholder="会社名で検索"
            className={css({
              fontSize: { base: `${14 / 3.75}vw`, lg: `${16 / 19.2}vw` },
              w: { base: `${345 / 3.75}vw`, lg: `${240 / 12}vw` },
              h: { base: `${44 / 3.75}vw`, lg: `${36 / 12}vw` },
              backgroundColor: { base: `#f5f5f5`, lg: `white` },
              border: { lg: `1px solid rgba(0, 0, 0, 0.4)` },
              borderRadius: `4px`,
              color: `rgba(0, 0, 0, 0.4)`,
              mb: { base: `${15 / 3.75}vw`, lg: `${12 / 12}vw` },
            })}
          />
          <div
            className={css({
              position: "relative",
              w: { base: `${345 / 3.75}vw`, lg: `${240 / 12}vw` },
              h: { base: `${44 / 3.75}vw`, lg: `${36 / 12}vw` },
              mb: { base: `${15 / 3.75}vw`, lg: `${12 / 12}vw` },
              _after: {
                // 疑似要素を使用して矢印を表示
                content: '""',
                position: "absolute",
                right: { base: `${10 / 3.75}vw`, lg: `${10 / 12}vw` },
                top: "50%",
                transform: "translateY(-50%)",
                w: { base: `${10 / 3.75}vw`, lg: `${10 / 12}vw` },
                h: { base: `${5 / 3.75}vw`, lg: `${5 / 12}vw` },
                backgroundImage: "url('/svg/select.svg')",
                backgroundSize: "cover",
                pointerEvents: "none",
              },
            })}
          >
            <select
              value={selectedOccupation}
              onChange={(e) => setSelectedOccupation(e.target.value)}
              className={css({
                fontSize: { base: `${14 / 3.75}vw`, lg: `${16 / 19.2}vw` },
                appearance: `none`,
                w: { base: `${345 / 3.75}vw`, lg: `${240 / 12}vw` },
                h: { base: `${44 / 3.75}vw`, lg: `${36 / 12}vw` },
                backgroundColor: { base: `#f5f5f5`, lg: `white` },
                border: { lg: `1px solid rgba(0, 0, 0, 0.4)` },
                borderRadius: `4px`,
                color: `rgba(0, 0, 0, 0.4)`,
              })}
            >
              <option value="">職種を選択</option>
              {allCompanies
                .flatMap((company) =>
                  company.attributes.occupations.data.map(
                    (occupation) => occupation.attributes.occupation
                  )
                )
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((occupation, index) => (
                  <option key={index} value={occupation}>
                    {occupation}
                  </option>
                ))}
            </select>
          </div>

          <div
            className={css({
              position: "relative",
              w: { base: `${345 / 3.75}vw`, lg: `${240 / 12}vw` },
              h: { base: `${44 / 3.75}vw`, lg: `${36 / 12}vw` },
              mb: { base: `${15 / 3.75}vw`, lg: `${12 / 12}vw` },
              _after: {
                // 疑似要素を使用して矢印を表示
                content: '""',
                position: "absolute",
                right: { base: `${10 / 3.75}vw`, lg: `${10 / 12}vw` },
                top: "50%",
                transform: "translateY(-50%)",
                w: { base: `${10 / 3.75}vw`, lg: `${10 / 12}vw` },
                h: { base: `${5 / 3.75}vw`, lg: `${5 / 12}vw` },
                backgroundImage: "url('/svg/select.svg')",
                backgroundSize: "cover",
                pointerEvents: "none",
              },
            })}
          >
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className={css({
                appearance: `none`,
                fontSize: { base: `${14 / 3.75}vw`, lg: `${16 / 19.2}vw` },
                w: { base: `${345 / 3.75}vw`, lg: `${240 / 12}vw` },
                h: { base: `${44 / 3.75}vw`, lg: `${36 / 12}vw` },
                backgroundColor: { base: `#f5f5f5`, lg: `white` },
                border: { lg: `1px solid rgba(0, 0, 0, 0.4)` },
                borderRadius: `4px`,
                color: `rgba(0, 0, 0, 0.4)`,
              })}
            >
              <option value="">業界を選択</option>
              {allCompanies
                .map(
                  (company) =>
                    company.attributes.industry.data?.attributes.industry
                )
                .filter(
                  (value, index, self) => value && self.indexOf(value) === index
                )
                .map((industry, index) => (
                  <option key={index} value={industry}>
                    {industry}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* モバイル版 */}
      <div
        className={css({
          display: { base: `flex`, lg: `none` },
          w: `fit-content`,
          mx: `auto`,
        })}
      >
        {currentPage > 0 && (
          <div
            onClick={prevPage}
            className={css({
              display: { lg: `none` },
              w: `fit-content`,
              // mr: `${55 / 3.75}vw`,
              my: `${16 / 3.75}vw`,
              border: "1px solid",
              opacity: `0.56`,
              py: { base: `${5 / 3.75}vw` },
              px: { base: `${20 / 3.75}vw`, lg: `${18 / 12}vw` },
              borderRadius: "999px",
              fontSize: {
                base: `${14 / 3.75}vw`,
              },
              fontWeight: `bold`,
              lineHeight: `2em`,
              _hover: {
                cursor: "pointer",
                opacity: `0.3`,
              },
            })}
          >
            前のページ
          </div>
        )}
        {currentPage + 1 < filteredTotalPages && currentPage > 0 && (
          <div
            className={css({
              display: { lg: `none` },
              mr: `${55 / 3.75}vw`,
            })}
          ></div>
        )}
        {currentPage + 1 < filteredTotalPages && (
          <div
            onClick={nextPage}
            className={css({
              display: { lg: `none` },
              w: `fit-content`,
              mx: `auto`,
              my: `${16 / 3.75}vw`,
              border: "1px solid",
              opacity: `0.56`,
              py: { base: `${5 / 3.75}vw` },
              px: { base: `${20 / 3.75}vw`, lg: `${18 / 12}vw` },
              borderRadius: "999px",
              fontSize: {
                base: `${14 / 3.75}vw`,
              },
              fontWeight: `bold`,
              lineHeight: `2em`,
              _hover: {
                cursor: "pointer",
                opacity: `0.3`,
              },
            })}
          >
            次のページ
          </div>
        )}
      </div>

      {/* ////////// */}
      <div
        className={css({
          display: { base: `none`, lg: `block` },
          ml: { lg: `${153 / 12}vw` },
        })}
      >
        <div
          className={css({
            w: { base: `${350 / 3.75}vw`, lg: `${640 / 12}vw` },
            mx: { base: `auto`, lg: `initial` },
          })}
        >
          <div
            className={css({
              display: "flex",
              justifyContent: `center`,
            })}
          >
            <img
              onClick={firstPage}
              src={`/svg/back.svg`}
              alt={`最初のページへ`}
              className={css({
                w: { base: `${25 / 3.75}vw`, lg: `${20 / 12}vw` },
                mr: { base: `${15 / 3.75}vw`, lg: `${90 / 12}vw` },
                opacity: 0.4,
                _hover: {
                  cursor: "pointer",
                  opacity: 1,
                },
              })}
            />

            {currentPage > 0 && (
              <img
                onClick={prevPage}
                src={`/svg/back.svg`}
                alt={`戻る`}
                className={css({
                  w: { base: `${25 / 3.75}vw`, lg: `${20 / 12}vw` },
                  mr: { base: "5px", lg: `${25 / 12}vw` },
                  opacity: 0.4,

                  _hover: {
                    cursor: "pointer",
                    opacity: 1,
                  },
                })}
              />
            )}

            {renderPageNumbers()}
            {currentPage + 1 < filteredTotalPages && (
              <img
                src={`/svg/next.svg`}
                alt={`次へ`}
                onClick={nextPage}
                className={css({
                  w: { base: `${25 / 3.75}vw`, lg: `${20 / 12}vw` },
                  opacity: 0.4,

                  _hover: {
                    cursor: "pointer",
                    opacity: 1,
                  },
                })}
              />
            )}

            <img
              src={`/svg/next.svg`}
              alt={`最後のページへ`}
              onClick={lastPage}
              className={css({
                w: { base: `${25 / 3.75}vw`, lg: `${20 / 12}vw` },
                ml: { base: `${15 / 3.75}vw`, lg: `${90 / 12}vw` },
                opacity: 0.4,

                _hover: {
                  cursor: "pointer",
                  opacity: 1,
                },
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      query GetCompanies {
        companies(pagination: { start: 0, limit: 10000 }) {
          data {
            id
            attributes {
              name
              philosophy_title
              philosophy_explanation
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
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
        }
      }
    `,
  });

  const allCompanies: Company[] = data.companies.data;

  const totalPages: number = Math.ceil(allCompanies.length / itemsPerPage);

  return {
    props: {
      allCompanies,
      totalPages,
    },
  };
};
