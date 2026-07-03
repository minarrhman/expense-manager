import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function FAQ() {
    const navigate = useNavigate();

    const faqs = [
        {
            question: "What is Expense Flow?",
            answer:
                "Expense Flow is a personal finance manager that helps you track your income, expenses, budgets and financial habits.",
        },
        {
            question: "Is my financial data secure?",
            answer:
                "Yes. Your data is stored securely in your personal account and is only accessible after authentication.",
        },
        {
            question: "Can I edit or delete transactions?",
            answer:
                "Yes. You can edit or delete any transaction from the Transactions page.",
        },
        {
            question: "How does the budget feature work?",
            answer:
                "You can create budgets for different categories. Expense Flow monitors your spending and warns you when you are close to exceeding your budget.",
        },
        {
            question: "Can I change my profile information?",
            answer:
                "Yes. Visit the Profile page and click 'Edit Profile' to update your personal information or click the camera icon to change your profile picture.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-app-bg text-text-primary p-8 transition-colors duration-300">

            <div className="max-w-4xl mx-auto">

                {/* Header */}

                <div className="flex items-center gap-4 mb-8">

                    <button
                        onClick={() => navigate("/profile")}
                        className="w-11 h-11 rounded-full bg-surface border border-border shadow hover:bg-surface-hover transition flex items-center justify-center"
                    >
                        <FaArrowLeft />
                    </button>

                    <div>

                        <h1 className="text-3xl font-bold">
                            Frequently Asked Questions
                        </h1>

                        <p className="text-text-secondary mt-1">
                            Find answers to common questions about Expense Flow.
                        </p>

                    </div>

                </div>

                {/* FAQ List */}

                <div className="space-y-4">

                    {faqs.map((faq, index) => (

                        <div
                            key={index}
                            className="bg-surface border border-border rounded-xl shadow overflow-hidden transition-colors"
                        >

                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex justify-between items-center p-5 text-left hover:bg-surface-hover transition"
                            >

                                <span className="font-semibold text-text-primary">
                                    {faq.question}
                                </span>

                                {openIndex === index ? (
                                    <FaChevronUp className="text-text-secondary" />
                                ) : (
                                    <FaChevronDown className="text-text-secondary" />
                                )}

                            </button>

                            {openIndex === index && (

                                <div className="px-5 pb-5 border-t border-border">

                                    <p className="pt-4 text-text-secondary leading-7">
                                        {faq.answer}
                                    </p>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default FAQ;