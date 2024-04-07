import type { Notification } from "~/app/[locale]/chat/[chatId]/types";

import { NotificationDisplayer } from "./components";

type NotificationProps = {
  content: Notification[];
};

export const ChatNotification = ({
  content,
}: NotificationProps): JSX.Element => {
  return (
    <div className="flex max-w-[50%] flex-1 flex-col rounded-xl bg-blue-50 p-3">
      {content.map((notification) => (
        <NotificationDisplayer key={notification.id} content={notification} />
      ))}
    </div>
  );
};
