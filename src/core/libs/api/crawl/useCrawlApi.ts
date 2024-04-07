import { useAxios } from "~/core/libs/hooks";

import { crawlWebsiteUrl, type CrawlInputProps } from "./crawl";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCrawlApi = () => {
  const { axiosInstance } = useAxios();

  return {
    crawlWebsiteUrl: async (props: CrawlInputProps) =>
      crawlWebsiteUrl(props, axiosInstance),
  };
};
