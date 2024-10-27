// nextjs/src/pages/contact/index.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { gql } from "@apollo/client";
import { initializeApollo } from "../../lib/apollo-client";
import { css } from "../../../styled-system/css";
import { RequiredMark } from "@/component/form/mark";
import { ConfirmationButton } from "@/component/form/button/confirmationbutton";
import { BackButton } from "@/component/form/button/backbutton";

const GET_CONTACTS_QUERY = gql`
  query GetContacts {
    contacts(pagination: { start: 0, limit: 10000 }) {
      data {
        id
        attributes {
          name
          email
          text
          contact_id
          company {
            data {
              id
              attributes {
                name
              }
            }
          }
          inquiry_item {
            data {
              id
              attributes {
                item
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;

const GET_INQUIRY_ITEMS_QUERY = gql`
  query GetInquiryItem {
    inquiryItems(pagination: { start: 0, limit: 10000 }) {
      data {
        id
        attributes {
          item
        }
      }
    }
  }
`;

const GET_COMPANIES_QUERY = gql`
  query GetCompanies {
    companies(pagination: { start: 0, limit: 10000 }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

interface ContactPageProps {
  contacts: any[];
}

interface InquiryItem {
  id: string;
  attributes: {
    item: string;
  };
}

interface Company {
  id: string;
  attributes: {
    name: string;
  };
}

export default function ContactPage({ contacts }: ContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [inquiryItemId, setInquiryItemId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const selectedCompany = companies.find((c) => c.id === companyId) || null;
  const selectedInquiryItem =
    inquiryItems.find((item) => item.id === inquiryItemId) || null;

  const companyName = selectedCompany
    ? selectedCompany.attributes.name
    : "未選択";
  const inquiryItemName = selectedInquiryItem
    ? selectedInquiryItem.attributes.item
    : "未選択";

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isPrivacyPolicyAccepted, setIsPrivacyPolicyAccepted] = useState(false);

  const handlePrivacyPolicyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPrivacyPolicyAccepted(e.target.checked);
  };

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    setIsLoggedIn(!!jwt);
  }, []);

  const baseURL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apolloClient = initializeApollo();
        const { data } = await apolloClient.query({
          query: GET_INQUIRY_ITEMS_QUERY,
        });

        setInquiryItems(data.inquiryItems.data);
      } catch (error) {
        console.error("Error fetching inquiry items:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apolloClient = initializeApollo();
        const { data } = await apolloClient.query({
          query: GET_COMPANIES_QUERY,
        });

        setCompanies(data.companies.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (router.query.companyId) {
      setCompanyId(router.query.companyId as string);
      setValue("companyId", router.query.companyId as string);
    }
    let inquiryItemValue =
      isLoggedIn && !router.query.inquiryItem ? "3" : router.query.inquiryItem;

    if (inquiryItemValue) {
      setInquiryItemId(inquiryItemValue as string);
      setValue("inquiryItemId", inquiryItemValue);
    }
  }, [router.query, setValue, inquiryItems, isLoggedIn]);

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      fetch(`${baseURL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setEmail(data.mail);
          setText(data.text);
          setValue("name", data.name);
          setValue("email", data.mail);
          setValue("text", data.text);
        })
        .catch((error) => console.error("Error fetching user info:", error));
    }
  }, []);
  useEffect(() => {
    register("companyId", {
      required: isLoggedIn ? "お問い合わせ先は必須です" : false,
    });
  }, [register, isLoggedIn]);

  useEffect(() => {
    setValue("companyId", companyId);
  }, [companyId, setValue]);

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    setIsLoggedIn(!!jwt);
  }, []);

  const onSubmit = async (data: any) => {
    const userId = sessionStorage.getItem("userId");
    const contactData = {
      name: data.name,
      email: data.email,
      text: data.text,
      inquiry_item: data.inquiryItemId || undefined,
      company: data.companyId || undefined,
      userid: userId || undefined,
    };

    try {
      const response = await fetch(`${baseURL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: contactData }),
      });

      if (!response.ok) {
        throw new Error("問い合わせの送信に失敗しました。");
      }

      const responseData = await response.json();
      console.log("問い合わせ送信成功:", responseData);

      const lineUserId = sessionStorage.getItem("lineUserId");
      const lineMessage = `お問い合わせを受け付けました。\nお名前: ${name}\nメールアドレス: ${email}\nお問い合わせ先: ${companyName}\nお問い合わせ項目: ${inquiryItemName}\n内容: ${data.text}`;

      await fetch("/api/line-notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: lineUserId,
          message: lineMessage,
        }),
      });

      alert("送信完了しました。");
    } catch (error) {
      console.error("送信中にエラーが発生しました。", error);
      alert("送信中にエラーが発生しました。");
    }
  };

  return (
    <div>
      <div
        className={css({
          display: `flex`,
          fontWeight: `bold`,
          fontSize: { base: `${15 / 3.75}vw`, lg: `24px` },
          color: `#39414e`,
        })}
      >
        <img
          src={`/svg/file-invoice-solid.svg`}
          className={css({
            w: { base: `${14 / 3.75}vw`, lg: `22px` },
            ml: { base: `${20 / 3.75}vw`, lg: `${480 / 19.2}vw` },
            mr: { base: `${5 / 3.75}vw`, lg: `${25 / 19.2}vw` },
          })}
        />
        <div
          className={css({
            py: { base: `${15 / 3.75}vw`, lg: `${24 / 19.2}vw` },
          })}
        >
          お問い合わせフォーム
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={css({
          w: { base: `${345 / 3.75}vw`, lg: `${976 / 19.2}vw` },
          mx: `auto`,
        })}
      >
        <div
          className={css({
            w: { base: `${335 / 3.75}vw`, lg: `${976 / 19.2}vw` },
            mx: `auto`,
            borderTop: `2px solid rgba(65,164,250,0.25)`,
            borderLeft: `2px solid rgba(65,164,250,0.25)`,
            borderRight: `2px solid rgba(65,164,250,0.25)`,
          })}
        >
          <div
            className={css({
              display: `flex`,
              borderBottom: `2px solid rgba(65,164,250,0.25)`,
              fontSize: { base: `${12 / 3.75}vw`, lg: `16px` },
              color: `#39414e`,
            })}
          >
            <div
              className={css({
                w: { base: `${125 / 3.75}vw`, lg: `${320 / 19.2}vw` },
                py: { base: `${15 / 3.75}vw`, lg: `${24 / 19.2}vw` },
                px: { base: `${8 / 3.75}vw`, lg: `${40 / 19.2}vw` },
                bg: `#F9FCFE`,
                fontWeight: `bold`,
              })}
            >
              お名前
              <RequiredMark />
            </div>
            <div
              className={css({
                w: { base: `${200 / 3.75}vw`, lg: `${510 / 19.2}vw` },
                pt: { base: `${20 / 3.75}vw`, lg: `${33 / 19.2}vw` },
                mx: { base: `${8 / 3.75}vw`, lg: `${70 / 19.2}vw` },
                whiteSpace: `pre-wrap`,
              })}
            >
              <input
                type="text"
                {...register("name", { required: "お名前は必須です" })}
                placeholder="お名前を入力してください"
                className={css({
                  w: { base: `${200 / 3.75}vw`, lg: `${510 / 19.2}vw` },
                  whiteSpace: `pre-wrap`,
                  border: `1px solid #999999`,
                })}
              />
              {errors.name && errors.name.message && (
                <p className={css({ color: `red`, fontSize: `10px` })}>
                  {errors.name.message.toString()}
                </p>
              )}
            </div>
          </div>
          <div
            className={css({
              display: `flex`,
              borderBottom: `2px solid rgba(65,164,250,0.25)`,
              fontSize: { base: `${12 / 3.75}vw`, lg: `16px` },
              color: `#39414e`,
            })}
          >
            <div
              className={css({
                w: { base: `${125 / 3.75}vw`, lg: `${320 / 19.2}vw` },
                py: { base: `${15 / 3.75}vw`, lg: `${24 / 19.2}vw` },
                px: { base: `${8 / 3.75}vw`, lg: `${40 / 19.2}vw` },
                bg: `#F9FCFE`,
                fontWeight: `bold`,
              })}
            >
              メールアドレス
              <RequiredMark />
            </div>
            <div
              className={css({
                w: { base: `${200 / 3.75}vw`, lg: `${510 / 19.2}vw` },
                pt: { base: `${20 / 3.75}vw`, lg: `${33 / 19.2}vw` },
                mx: { base: `${8 / 3.75}vw`, lg: `${70 / 19.2}vw` },
                whiteSpace: `pre-wrap`,
              })}
            >
              <input
                type="email"
                {...register("email", {
                  required: "メールアドレスは必須です",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "無効なメールアドレス形式です",
                  },
                })}
                placeholder="メールアドレスを入力してください"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={css({
                  w: { base: `${200 / 3.75}vw`, lg: `${510 / 19.2}vw` },
                  whiteSpace: `pre-wrap`,
                  border: `1px solid #999999`,
                })}
              />
              {errors.email && errors.email.message && (
                <p className={css({ color: `red`, fontSize: `10px` })}>
                  {errors.email.message.toString()}
                </p>
              )}
            </div>
          </div>

          {isLoggedIn && (
            <div
              className={css({
                display: `flex`,
                borderBottom: `2px solid rgba(65,164,250,0.25)`,
                fontSize: { base: `${12 / 3.75}vw`, lg: `16px` },
                color: `#39414e`,
              })}
            >
              <div
                className={css({
                  w: { base: `${125 / 3.75}vw`, lg: `${320 / 19.2}vw` },
                  py: { base: `${15 / 3.75}vw`, lg: `${24 / 19.2}vw` },
                  px: { base: `${8 / 3.75}vw`, lg: `${40 / 19.2}vw` },
                  bg: `#F9FCFE`,
                  fontWeight: `bold`,
                })}
              >
                お問い合わせ先
                <RequiredMark />
              </div>
              <div
                className={css({
                  w: { base: `${200 / 3.75}vw`, lg: `${510 / 19.2}vw` },
                  pt: { base: `${20 / 3.75}vw`, lg: `${33 / 19.2}vw` },

                  mx: { base: `${8 / 3.75}vw`, lg: `${70 / 19.2}vw` },
                  whiteSpace: `pre-wrap`,
                })}
              >
                {isLoggedIn && (
                  <div>
                    <select
                      {...register("companyId")}
                      value={companyId}
                      onChange={(e) => setCompanyId(e.target.value)}
                      className={css({
                        w: { base: `${200 / 3.75}vw`, lg: `${510 / 19.2}vw` },
                        whiteSpace: `pre-wrap`,
                        border: `1px solid #999999`,
                      })}
                    >
                      <option value="">選択してください</option>
                      {companies.map((company: any) => (
                        <option key={company.id} value={company.id}>
                          {company.attributes.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {errors.companyId && errors.companyId.message && (
                  <p className={css({ color: `red`, fontSize: `10px` })}>
                    {errors.companyId.message.toString()}
                  </p>
                )}
              </div>
            </div>
          )}
          <div
            className={css({
              display: `flex`,
              borderBottom: `2px solid rgba(65,164,250,0.25)`,
              fontSize: { base: `${12 / 3.75}vw`, lg: `16px` },
              color: `#39414e`,
            })}
          >
            <div
              className={css({
                w: { base: `${125 / 3.75}vw`, lg: `${320 / 19.2}vw` },
                py: { base: `${15 / 3.75}vw`, lg: `${24 / 19.2}vw` },
                px: { base: `${8 / 3.75}vw`, lg: `${40 / 19.2}vw` },
                bg: `#F9FCFE`,
                fontWeight: `bold`,
              })}
            >
              お問い合わせ項目
              <RequiredMark />
            </div>
            <div
              className={css({
                w: { base: `${200 / 3.75}vw`, lg: `${510 / 19.2}vw` },
                pt: { base: `${20 / 3.75}vw`, lg: `${33 / 19.2}vw` },
                mx: { base: `${8 / 3.75}vw`, lg: `${70 / 19.2}vw` },
                whiteSpace: `pre-wrap`,
              })}
            >
              <select
                {...register("inquiryItemId", {
                  required: "お問い合わせ項目は必須です",
                })}
                className={css({
                  w: { base: `${200 / 3.75}vw`, lg: `${510 / 19.2}vw` },
                  whiteSpace: `pre-wrap`,
                  border: `1px solid #999999`,
                })}
              >
                <option value="">選択してください</option>
                {inquiryItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.attributes.item}
                  </option>
                ))}
              </select>
              {errors.inquiryItemId && errors.inquiryItemId.message && (
                <p className={css({ color: `red`, fontSize: `10px` })}>
                  {errors.inquiryItemId.message.toString()}
                </p>
              )}
            </div>
          </div>

          <div
            className={css({
              display: `flex`,
              borderBottom: `2px solid rgba(65,164,250,0.25)`,
              fontSize: { base: `${12 / 3.75}vw`, lg: `16px` },
              color: `#39414e`,
            })}
          >
            <div
              className={css({
                w: { base: `${125 / 3.75}vw`, lg: `${320 / 19.2}vw` },
                py: { base: `${15 / 3.75}vw`, lg: `${24 / 19.2}vw` },
                px: { base: `${8 / 3.75}vw`, lg: `${40 / 19.2}vw` },
                bg: `#F9FCFE`,
                fontWeight: `bold`,
              })}
            >
              お問い合わせ内容
              <RequiredMark />
            </div>
            <div
              className={css({
                w: { base: `${200 / 3.75}vw`, lg: `${510 / 19.2}vw` },
                pb: { base: `${15 / 3.75}vw`, lg: `${24 / 19.2}vw` },
                pt: { base: `${20 / 3.75}vw`, lg: `${33 / 19.2}vw` },
                mx: { base: `${8 / 3.75}vw`, lg: `${70 / 19.2}vw` },
                whiteSpace: `pre-wrap`,
              })}
            >
              <textarea
                {...register("text", {
                  required: "お問い合わせ内容は必須です",
                  minLength: {
                    value: 10,
                    message: "お問い合わせ内容は最低10文字必要です",
                  },
                })}
                className={css({
                  w: { base: `${200 / 3.75}vw`, lg: `${510 / 19.2}vw` },
                  h: { base: `${150 / 3.75}vw`, lg: `${200 / 19.2}vw` },
                  whiteSpace: `pre-wrap`,
                  border: `1px solid #999999`,
                })}
              />
              {errors.text && errors.text.message && (
                <p className={css({ color: `red`, fontSize: `10px` })}>
                  {errors.text.message.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div
          className={css({
            py: { base: `${15 / 3.75}vw`, lg: `${24 / 19.2}vw` },
            textAlign: `center`,
            fontSize: { base: `${14 / 3.75}vw`, lg: `20px` },
            whiteSpace: `pre-wrap`,
            objectFit: `cover`,
            fontWeight: `bold`,
            color: `#39414E`,
          })}
        >
          <input
            type="checkbox"
            checked={isPrivacyPolicyAccepted}
            onChange={handlePrivacyPolicyChange}
            className={css({
              transform: { md: `scale(1.8)`, lg: `scale(1.3)` },
              py: { base: `${15 / 3.75}vw`, lg: `${24 / 19.2}vw` },
              mr: { base: `${8 / 3.75}vw`, lg: `${20 / 19.2}vw` },
            })}
          />
          <span
            className={css({
              borderBottom: `2px solid #39414e`,
            })}
          >
            <Link href="/privacy-policy">プライバシーポリシー</Link>
          </span>
          ・
          <span
            className={css({
              borderBottom: `2px solid #39414e`,
            })}
          >
            <Link href="/teams">利用規約</Link>
          </span>
          に同意する
        </div>
        <div
          className={css({
            display: { lg: `flex` },
            flexDirection: `row-reverse`,
          })}
        >
          <ConfirmationButton
            title="送信する"
            disabled={!isPrivacyPolicyAccepted}
          />

          <BackButton title="戻る" />
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_CONTACTS_QUERY,
  });

  return {
    props: {
      contacts: data.contacts.data,
    },
  };
}
