import React, {
    createContext,
    useContext,
    useState,
} from "react";

import AppToast from "./AppToast";

const ToastContext = createContext();

export function ToastProvider({ children }) {

    const [toast, setToast] = useState({
        visible: false,
        message: "",
        type: "success",
    });

    const showToast = (message, type = "success") => {
        setToast({
            visible: true,
            message,
            type,
        });
    };

    const hideToast = () => {
        setToast((prev) => ({
            ...prev,
            visible: false,
        }));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>

            {children}

            <AppToast
                visible={toast.visible}
                message={toast.message}
                type={toast.type}
                onHide={hideToast}
            />

        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);