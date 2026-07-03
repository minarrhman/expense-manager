import { FaChevronRight } from "react-icons/fa";

function SettingsItem({ icon, title, value, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition"
        >
            <div className="flex items-center gap-4">
                {icon}

                <div className="text-left">
                    <p className="font-medium">
                        {title}
                    </p>

                    <p className="text-sm text-gray-500">
                        {value}
                    </p>
                </div>
            </div>

            <FaChevronRight className="text-gray-400" />
        </button>
    );
}

export default SettingsItem;