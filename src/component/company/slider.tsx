// nextjs/src/component/company/slider.tsx

import React from "react";
import Slider from "react-slick";
import { gql } from "@apollo/client";
import { initializeApollo } from "@/lib/apollo-client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { css } from "../../../styled-system/css";
import { SampleNextArrow, SamplePrevArrow } from "./arrow";
type Company = {
  id: string;
  attributes: {
    name: string;
    philosophy_title: string;
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
    logo: {
      data: {
        id: string;
        attributes: {
          url: string;
        };
      };
    };
    industry: {
      data: {
        id: string;
        attributes: {
          industry: string;
        };
      };
    };
    occupations: {
      data: {
        id: string;
        attributes: {
          occupation: string;
        };
      }[];
    };
  };
};

const GET_COMPANIES = gql`
  query {
    companies(pagination: { limit: 10000 }) {
      data {
        id
        attributes {
          name
          philosophy_title
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
`;

const OtherImageSlider: React.FC<{ companies: Company[] }> = ({
  companies,
}) => {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const imageAndNames = companies
    .map((company) => ({
      id: company.id,
      name: company.attributes.name,
      philosophy_title: company.attributes.philosophy_title,
      industry: company.attributes.industry.data?.attributes?.industry,
      logo: `${baseURL}${company.attributes.logo?.data?.attributes?.url}`,
      images: company.attributes.image.data.map((image) => ({
        url: `${baseURL}${image.attributes.url}`,
        name: company.attributes.name,
      })),
    }))
    .flatMap((item) =>
      item.images.map((image) => ({
        id: item.id,
        url: image.url,
        name: item.name,
        logo: item.logo,
        philosophy_title: item.philosophy_title,
        industry: item.industry,
      }))
    );

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20%",
    accessibility: true,
    arrows: true,
    pauseOnFocus: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div style={{ margin: "0 auto", width: "100%" }}>
      {imageAndNames && imageAndNames.length > 0 && (
        <Slider {...settings}>
          {imageAndNames.map((item, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <Link href={`/company/${item.id}`}>
                {" "}
                <img
                  src={item.url}
                  alt={`Slide ${index}`}
                  style={{
                    width: "95%",
                    height: "20vw",
                    borderRadius: "5px",
                    objectFit: "cover",
                    maxHeight: "300px",
                  }}
                />
                <div
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10px",
                  })}
                >
                  <img
                    src={item.logo}
                    style={{}}
                    className={css({
                      base: { width: `${20 / 3.75}vw` },
                      md: { width: "30px" },
                    })}
                  />
                  <p
                    style={{ fontWeight: "bold" }}
                    className={css({
                      base: { fontSize: `${10 / 3.75}vw ` },
                      md: { fontSize: "14px" },
                    })}
                  >
                    　{item.name}
                  </p>
                </div>
                <p style={{ marginTop: "10px" }}>{item.philosophy_title}</p>
                <p
                  className={css({
                    marginRight: "10px",
                    fontSize: { base: `8px`, lg: `10px` },
                    border: "1px solid #21BDDB",
                    color: "#fff",
                    backgroundColor: "#21BDDB",
                    padding: "5px 20px",
                    borderRadius: "100px",
                    width: "fit-content",
                    base: { padding: "2px 10px" },
                    md: { padding: "5px 20px" },
                  })}
                >
                  {item.industry}
                </p>
              </Link>
            </div>
          ))}
          {imageAndNames.map((item, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <Link href={`/company/${item.id}`}>
                {" "}
                <img
                  src={item.url}
                  alt={`Slide ${index}`}
                  style={{
                    width: "95%",
                    height: "20vw",
                    borderRadius: "5px",
                    objectFit: "cover",
                    maxHeight: "300px",
                  }}
                />
                <div
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10px",
                  })}
                >
                  <img
                    src={item.logo}
                    style={{}}
                    className={css({
                      base: { width: `${20 / 3.75}vw` },
                      md: { width: "30px" },
                    })}
                  />
                  <p
                    style={{ fontWeight: "bold" }}
                    className={css({
                      base: { fontSize: `${10 / 3.75}vw ` },
                      md: { fontSize: "14px" },
                    })}
                  >
                    　{item.name}
                  </p>
                </div>
                <p style={{ marginTop: "10px" }}>{item.philosophy_title}</p>
                <p
                  className={css({
                    marginRight: "10px",
                    fontSize: { base: `8px`, lg: `10px` },
                    border: "1px solid #21BDDB",
                    color: "#fff",
                    backgroundColor: "#21BDDB",
                    padding: "5px 20px",
                    borderRadius: "100px",
                    width: "fit-content",
                    base: { padding: "2px 10px" },
                    md: { padding: "5px 20px" },
                  })}
                >
                  {item.industry}
                </p>
              </Link>
            </div>
          ))}
          {imageAndNames.map((item, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <Link href={`/company/${item.id}`}>
                {" "}
                <img
                  src={item.url}
                  alt={`Slide ${index}`}
                  style={{
                    width: "95%",
                    height: "20vw",
                    borderRadius: "5px",
                    objectFit: "cover",
                    maxHeight: "300px",
                  }}
                />
                <div
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10px",
                  })}
                >
                  <img
                    src={item.logo}
                    style={{}}
                    className={css({
                      base: { width: `${20 / 3.75}vw` },
                      md: { width: "30px" },
                    })}
                  />
                  <p
                    style={{ fontWeight: "bold" }}
                    className={css({
                      base: { fontSize: `${10 / 3.75}vw ` },
                      md: { fontSize: "14px" },
                    })}
                  >
                    　{item.name}
                  </p>
                </div>
                <p style={{ marginTop: "10px" }}>{item.philosophy_title}</p>
                <p
                  className={css({
                    marginRight: "10px",
                    fontSize: { base: `8px`, lg: `10px` },
                    border: "1px solid #21BDDB",
                    color: "#fff",
                    backgroundColor: "#21BDDB",
                    padding: "5px 20px",
                    borderRadius: "100px",
                    width: "fit-content",
                    base: { padding: "2px 10px" },
                    md: { padding: "5px 20px" },
                  })}
                >
                  {item.industry}
                </p>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_COMPANIES,
  });

  return {
    props: {
      companies: data.companies.data,
    },
  };
};

export default OtherImageSlider;
