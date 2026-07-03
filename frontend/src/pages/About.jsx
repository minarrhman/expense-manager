import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
    FaWallet,
    FaChartPie,
    FaBullseye,
    FaRobot,
    FaReact,
    FaPython,
    FaDatabase,
    FaMobileAlt,
} from "react-icons/fa";

function About() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-app-bg text-text-primary p-8 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-8">

                <button
                    onClick={() => navigate("/profile")}
                   className="w-11 h-11 rounded-full bg-surface border border-border shadow hover:bg-surface-hover transition flex items-center justify-center"
                >
                    <FaArrowLeft />
                </button>

                <div>

                    <h1 className="text-3xl font-bold">
                        About Expense Flow
                    </h1>

                    <p className="text-text-secondary">
                        Learn more about the application and the technologies behind it.
                    </p>

                </div>

            </div>

            <div className="max-w-5xl mx-auto">

                {/* Hero */}

                <div className="bg-gradient-to-r from-primary to-primary-hover rounded-3xl text-white p-10 shadow-lg">

                    <h1 className="text-4xl font-bold">
                        Expense Flow
                    </h1>

                    <p className="mt-4 text-lg text-indigo-100 max-w-3xl">
                        Expense Flow is a modern personal finance manager
                        designed to help users take control of their money
                        through simple budgeting, expense tracking and insightful
                        analytics.
                    </p>

                </div>

                {/* Mission */}

                <div className="bg-surface border border-border rounded-2xl shadow mt-8 p-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Our Mission
                    </h2>

                    <p className="text-text-secondary leading-8">
                        Managing personal finances should be simple, accessible
                        and insightful. Expense Flow was created to give users
                        an easy way to record income and expenses, monitor
                        spending habits, stay within budget and understand
                        financial trends through meaningful analytics.
                    </p>

                </div>

                {/* Features */}

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-6">
                        Key Features
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-surface border border-border rounded-2xl shadow p-6 flex gap-5">

                            <FaWallet
                                className="text-indigo-600 text-3xl mt-1"
                            />

                            <div>

                                <h3 className="font-semibold text-lg">
                                    Transaction Management
                                </h3>

                                <p className="text-text-secondary mt-2">
                                    Add, edit, delete and search income and
                                    expense transactions with ease.
                                </p>

                            </div>

                        </div>

                        <div className="bg-surface border border-border rounded-2xl shadow p-6 flex gap-5">

                            <FaBullseye
                                className="text-indigo-600 text-3xl mt-1"
                            />

                            <div>

                                <h3 className="font-semibold text-lg">
                                    Budget Planning
                                </h3>

                                <p className="text-text-secondary mt-2">
                                    Set monthly budgets for different categories
                                    and receive warnings when you're close to
                                    your limits.
                                </p>

                            </div>

                        </div>

                        <div className="bg-surface border border-border rounded-2xl shadow p-6 flex gap-5">

                            <FaChartPie
                                className="text-indigo-600 text-3xl mt-1"
                            />

                            <div>

                                <h3 className="font-semibold text-lg">
                                    Financial Analytics
                                </h3>

                                <p className="text-text-secondary mt-2">
                                    Understand your spending with dashboards,
                                    reports and category-based summaries.
                                </p>

                            </div>

                        </div>

                        <div className="bg-surface border border-border rounded-2xl shadow p-6 flex gap-5">

                            <FaRobot
                                className="text-indigo-600 text-3xl mt-1"
                            />

                            <div>

                                <h3 className="font-semibold text-lg">
                                    AI Insights
                                </h3>

                                <p className="text-text-secondary mt-2">
                                    Receive intelligent financial insights based
                                    on your spending behaviour and saving
                                    patterns.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Technologies */}

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-6">
                        Built With
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                        <div className="bg-surface border border-border rounded-xl shadow p-6 text-center">

                            <FaReact className="text-4xl text-sky-500 mx-auto" />

                            <p className="mt-3 font-semibold">
                                React
                            </p>

                        </div>

                        <div className="bg-surface border border-border rounded-xl shadow p-6 text-center">

                            <FaPython className="text-4xl text-yellow-500 mx-auto" />

                            <p className="mt-3 font-semibold">
                                Django REST
                            </p>

                        </div>

                        <div className="bg-surface border border-border rounded-xl shadow p-6 text-center">

                            <FaDatabase className="text-4xl text-green-600 mx-auto" />

                            <p className="mt-3 font-semibold">
                                PostgreSQL
                            </p>

                        </div>

                        <div className="bg-surface border border-border rounded-xl shadow p-6 text-center">

                            <FaMobileAlt className="text-4xl text-indigo-600 mx-auto" />

                            <p className="mt-3 font-semibold">
                                React Native
                            </p>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="text-center mt-12 text-text-secondary">

                    <p className="font-medium">
                        Expense Flow
                    </p>

                    <p className="text-sm mt-2">
                        Version 1.0.0
                    </p>

                    <p className="text-sm mt-1">
                        Designed and developed for learning and portfolio purposes.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default About;