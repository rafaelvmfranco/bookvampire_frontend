import { Fragment, useState } from "react";
import { MdLink } from "react-icons/md";

import type { Notification } from "~/app/[locale]/chat/[chatId]/types";
import { getFileIcon } from "~/core/libs/helpers/getFileIcon";

import { notificationStatusToIcon, type NotificationMessage } from "./types";

type NotificationDisplayerProps = {
  content: Notification;
};

export const NotificationDisplayer = ({
  content,
}: NotificationDisplayerProps): JSX.Element => {
  const { message: nonParsedMessage, action } = content;
  const [isHovered, setIsHovered] = useState(false);

  if (nonParsedMessage === null || nonParsedMessage === undefined) {
    return <Fragment />;
  }

  let message, status, name;

  try {
    const parsedMessage = JSON.parse(
      nonParsedMessage.replace(/'/g, '"'),
    ) as NotificationMessage;

    message = parsedMessage.message;
    status = parsedMessage.status;
    name = parsedMessage.name;
  } catch (error) {
    return <Fragment />;
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex cursor-pointer flex-row items-center gap-1 rounded-sm p-2 transition duration-300 hover:bg-gray-100"
    >
      <span className="text-2xl text-gray-400">
        {notificationStatusToIcon[status]}
      </span>
      <div className="ml-2 flex flex-row rounded-sm bg-white p-2">
        <div className="flex flex-row items-center gap-1">
          <div className="flex items-center justify-center rounded-sm bg-gray-100 p-1">
            {action === "CRAWL" ? <MdLink size={16} /> : getFileIcon(name)}
          </div>
          <span className="text-sm text-gray-600">{name}</span>
        </div>
      </div>
      {isHovered && (
        <div
          className="absolute z-10 translate-x-1/4 translate-y-1 transform rounded-sm border border-gray-100 bg-white p-2 shadow-sm transition-transform"
          style={{ bottom: "-10px", right: "10px" }}
        >
          {message}
        </div>
      )}
    </div>
  );
};
