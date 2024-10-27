// src/component/top/slider.tsx
import React from "react";
import Slider from "react-slick";
import { gql } from "@apollo/client";
import { initializeApollo } from "@/lib/apollo-client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { css } from "../../../styled-system/css";
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
    companies {
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

const ImageSlider: React.FC<{ companies: Company[] }> = ({ companies }) => {
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
    centerPadding: "22%",
    accessibility: false,
    arrows: false,
    pauseOnFocus: false,
  };

  return (
    <div
      className={css({
        display: { base: `none`, lg: `block` },
        w: `100%`,
        m: `0 auto`,
        py: { base: `20px`, lg: `${8 / 12}vw` },
        bg: `rgba(0 0 0 /3%)`,
      })}
    >
      {imageAndNames && imageAndNames.length > 0 && (
        <Slider {...settings}>
          {imageAndNames.map((item, index) => (
            <div key={index}>
              <Link href={`/company/${item.id}`}>
                <div
                  className={css({
                    bg: `#ffffff`,
                    borderRadius: `4px`,
                    w: { base: `${15 / 3.75}vw`, lg: `${650 / 12}vw` },
                  })}
                >
                  <img
                    src={item.url}
                    alt={`Slide ${index}`}
                    className={css({
                      w: { base: `${15 / 3.75}vw`, lg: `${640 / 12}vw` },
                      h: { base: `${15 / 3.75}vw`, lg: `${272 / 12}vw` },
                      mx: `auto`,
                      objectFit: `cover`,
                      overflow: `hidden`,
                    })}
                  />
                  <div
                    className={css({
                      px: { base: `10px`, lg: `${25 / 12}vw` },
                    })}
                  >
                    <p
                      className={css({
                        w: `fit-content`,
                        color: `#353535`,
                        fontSize: { base: `12px`, lg: `${8 / 12}vw` },
                        px: { base: `10px`, lg: `${15 / 12}vw` },
                        mt: { base: `10px`, lg: `${16 / 12}vw` },
                        mb: { base: `10px`, lg: `${12 / 12}vw` },

                        border: `1px solid #000000`,
                        borderRadius: `100px`,
                      })}
                    >
                      {item.industry}
                    </p>
                    <p
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      className={css({
                        fontWeight: `bold`,
                        fontSize: { base: `12px`, lg: `${20 / 12}vw` },
                      })}
                    >
                      {item.philosophy_title}
                    </p>
                    <div
                      className={css({
                        display: `flex`,
                        mt: { base: `10px`, lg: `${31 / 12}vw` },
                        pb: { base: `10px`, lg: `${10 / 12}vw` },
                      })}
                    >
                      <img
                        src={item.logo}
                        alt={`ロゴ`}
                        className={css({
                          w: { base: `20px`, lg: `${34 / 12}vw` },
                        })}
                      />
                      <div
                        className={css({
                          mt: { base: `10px`, lg: `${10 / 12}vw` },
                          ml: { base: `10px`, lg: `${7 / 12}vw` },
                          fontSize: { base: `12px`, lg: `${10 / 12}vw` },
                          color: `rgba(0, 0, 0, 0.53)`,
                        })}
                      >
                        {item.name}
                      </div>
                    </div>
                  </div>
                </div>
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

export default ImageSlider;
