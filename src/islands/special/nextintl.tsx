import { NextIntlClientProvider, useMessages } from "next-intl";

export const NextIntlProvider = ({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) => {
  const messages = useMessages(); // Receive messages from i18n.ts
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
