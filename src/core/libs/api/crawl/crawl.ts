import type { UUID } from "node:crypto";
import type { AxiosInstance } from "axios";

import type { ToastData } from "~/islands/ui/Toast/domain/types";

export type CrawlInputProps = {
  brainId: UUID;
  chat_id?: UUID;
  config: {
    url: string;
    js: boolean;
    depth: number;
    max_pages: number;
    max_time: number;
  };
};

export type CrawlResponse = {
  data: { type: ToastData["variant"]; message: ToastData["text"] };
};

export const crawlWebsiteUrl = async (
  props: CrawlInputProps,
  axiosInstance: AxiosInstance,
): Promise<CrawlResponse> => {
  let crawlUrl = `/crawl?brain_id=${props.brainId}`;

  if (props.chat_id !== undefined) {
    crawlUrl = crawlUrl.concat(`&chat_id=${props.chat_id}`);
  }

  return axiosInstance.post(crawlUrl, props.config);
};
