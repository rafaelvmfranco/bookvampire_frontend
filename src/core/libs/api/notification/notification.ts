import type { AxiosInstance } from "axios";

import type { Notification } from "~/app/[locale]/chat/[chatId]/types";

export const getChatNotifications = async (
  chatId: string,
  axiosInstance: AxiosInstance,
): Promise<Notification[]> => {
  return (await axiosInstance.get<Notification[]>(`/notifications/${chatId}`))
    .data;
};
