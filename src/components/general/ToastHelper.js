import { message } from "antd";

export function showSuccessToast(textMessage) {
  message.success(textMessage);
}

export function showErrorToast(textMessage) {
  message.error(textMessage);
}
