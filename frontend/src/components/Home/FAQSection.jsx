import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
    {
        question: "What is CollegeBuzz and how does it work?",
        answer: "CollegeBuzz is a platform that aggregates news, events, research updates, and tenders from AICTE-approved college websites. It automatically collects publicly available information, organizes it by college and category, and shows the latest updates in one place."
    },
    {
        question: "Is CollegeBuzz an official government or AICTE website?",
        answer: "No. CollegeBuzz is not an official government or AICTE website. It is an independent information aggregation platform built to help students and educators easily discover updates from official college websites."
    },
    {
        question: "Which colleges are covered on CollegeBuzz?",
        answer: "CollegeBuzz focuses on AICTE-approved colleges across India. Coverage depends on publicly available data from college websites, including announcements related to events, research activities, and tenders."
    },
    {
        question: "How often is the information updated?",
        answer: "CollegeBuzz updates its data regularly by re-checking college websites for new or changed information. New updates appear at the top, while older or removed items may be archived."
    },
    {
        question: "Is CollegeBuzz free to use?",
        answer: "Yes, CollegeBuzz is completely free to use. Anyone can browse college news, events, research updates, and tenders without any restrictions."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div style={{
            borderBottom: "1px solid #D4D4D4"
        }}>
            <button
                onClick={onClick}
                style={{
                    width: "100%",
                    padding: "1.25rem 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left"
                }}
            >
                <span style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "#2B2B2B",
                    paddingRight: "1rem"
                }}>
                    {question}
                </span>
                <ChevronDown
                    size={20}
                    style={{
                        flexShrink: 0,
                        color: "#B3B3B3",
                        transition: "transform 0.2s ease",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                />
            </button>
            <div style={{
                maxHeight: isOpen ? "200px" : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease"
            }}>
                <p style={{
                    margin: 0,
                    paddingBottom: "1.25rem",
                    fontSize: "0.9375rem",
                    color: "#666666",
                    lineHeight: "1.6"
                }}>
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section style={{
            backgroundColor: "#FFFFFF",
            padding: "4rem 1.5rem"
        }}>
            <div style={{
                maxWidth: "700px",
                margin: "0 auto"
            }}>
                <div style={{
                    textAlign: "center",
                    marginBottom: "2.5rem"
                }}>
                    <h2 style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "#2B2B2B",
                        marginBottom: "0.5rem"
                    }}>
                        Frequently Asked Questions
                    </h2>
                    <p style={{
                        fontSize: "1rem",
                        color: "#666666"
                    }}>
                        Everything you need to know about CollegeBuzz
                    </p>
                </div>

                <div style={{
                    borderTop: "1px solid #D4D4D4"
                }}>
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
