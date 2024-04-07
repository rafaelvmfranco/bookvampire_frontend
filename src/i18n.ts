import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = ["en"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./data/locales/${locale}.json`)).default,
  };
});
