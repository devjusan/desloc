import { toast, ToastOptions } from "react-toastify";

const defaultConfig = {
    position: "bottom-left",
    style: {
        width: "400px",
        height: "75px",
    },
} as ToastOptions;

const success = (message: string, options?: ToastOptions) =>
    toast.success(message, { ...defaultConfig, ...options });

const error = (message: string, options?: ToastOptions) =>
    toast.error(message, { ...defaultConfig, ...options });

const warning = (message: string, options?: ToastOptions) =>
    toast.warning(message, { ...defaultConfig, ...options });

const actions = {
    success,
    error,
    warning,
}

export default actions
