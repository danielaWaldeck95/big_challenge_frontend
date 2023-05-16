import { toast } from "react-toastify";
import axios from "axios";

type ToastProps = {
  error?: unknown;
  message?: string;
  source?: string;
  type: "success" | "error";
};

export function showToast({
  error,
  message = "",
  source = "A backend endpoint",
  type = "success",
}: ToastProps) {
  if (type === "error") {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message, {
        hideProgressBar: true,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error(`Whoops! ${source} had an unexpected error`, {
        hideProgressBar: true,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  } else if (type === "success") {
    toast.success(message, {
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
}
