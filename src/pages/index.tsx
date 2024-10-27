// nextjs/src/pages/index.tsx
import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apollo-client";
import ImageSlider from "../component/top/slider";
import { GetServerSideProps } from "next";
import { css } from "../../styled-system/css";
import Link from "next/link";
import Head from "next/head";
import Header from "@/components/Header";

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

  return <Header />;
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
