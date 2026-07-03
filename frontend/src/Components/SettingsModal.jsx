import {
    FaTimes,
    FaMoon,
    FaGlobe,
    FaDollarSign,
    FaChevronRight,
} from "react-icons/fa";

function SettingsModal({
    open,
    onClose,
    onOpenDarkMode,
    onOpenCurrency,
    onOpenLanguage,
}) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-surface w-full max-w-md rounded-2xl shadow-2xl border border-border">

                {/* Header */}

                <div className="flex justify-between items-center px-6 py-5 border-b border-border">

                    <h2 className="text-xl font-bold text-text-primary">
                        Settings
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-text-secondary hover:text-text-primary transition"
                    >
                        <FaTimes size={20} />
                    </button>

                </div>

                {/* Settings */}

                <div className="p-4">

                    <button
                        onClick={onOpenDarkMode}
                        className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-surface-hover transition"
                    >

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">

                                <FaMoon className="text-indigo-600" />

                            </div>

                            <div className="text-left">

                                <p className="font-semibold text-text-primary">
                                    Dark Mode
                                </p>

                                <p className="text-sm text-text-secondary">
                                    Light • Dark • System
                                </p>

                            </div>

                        </div>

                        <FaChevronRight className="text-text-secondary" />

                    </button>

                    <button
                        onClick={onOpenCurrency}
                        className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-surface-hover transition"
                    >

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">

                                <FaDollarSign className="text-green-600" />

                            </div>

                            <div className="text-left">

                                <p className="font-semibold text-text-primary">
                                    Currency
                                </p>

                                <p className="text-sm text-text-secondary">
                                    Choose your preferred currency
                                </p>

                            </div>

                        </div>

                        <FaChevronRight className="text-text-secondary" />

                    </button>

                    <button
                        onClick={onOpenLanguage}
                        className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-surface-hover transition"
                    >

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center">

                                <FaGlobe className="text-yellow-600" />

                            </div>

                            <div className="text-left">

                                <p className="font-semibold text-text-primary">
                                    Language
                                </p>

                                <p className="text-sm text-text-secondary">
                                    Select application language
                                </p>

                            </div>

                        </div>

                        <FaChevronRight className="text-text-secondary" />

                    </button>

                </div>

                {/* Footer */}

                <div className="border-t border-border p-5 flex justify-end">

                    <button
                        onClick={onClose}
                        className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg transition"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}

export default SettingsModal;