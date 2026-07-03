import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

function OptionModal({
    open,
    title,
    options = [],
    selectedValue,
    onSelect,
    onClose,
}) {

    const [selected, setSelected] = useState(selectedValue);

    useEffect(() => {
        setSelected(selectedValue);
    }, [selectedValue]);

    if (!open) return null;

    const handleSave = () => {
        onSelect(selected);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-surface w-full max-w-md rounded-2xl shadow-2xl border border-border">

                {/* Header */}

                <div className="flex justify-between items-center px-6 py-5 border-b border-border">

                    <h2 className="text-xl font-bold text-text-primary">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-text-secondary hover:text-text-primary transition"
                    >
                        <FaTimes size={20} />
                    </button>

                </div>

                {/* Options */}

                <div className="p-5 space-y-3">

                    {options.map((option) => (

                        <label
                            key={option.value}
                            className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition

                            ${
                                selected === option.value
                                    ? "border-primary bg-primary text-white"
                                    : "border-border bg-app-bg hover:bg-surface-hover text-text-primary"
                            }`}
                        >

                            <span className="font-medium">
                                {option.label}
                            </span>

                            <input
                                type="radio"
                                checked={selected === option.value}
                                onChange={() => setSelected(option.value)}
                                className="accent-indigo-600"
                            />

                        </label>

                    ))}

                </div>

                {/* Footer */}

                <div className="border-t border-border px-6 py-5 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg border border-border bg-app-bg hover:bg-surface-hover text-text-primary"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white"
                    >
                        Save
                    </button>

                </div>

            </div>

        </div>
    );
}

export default OptionModal;