import { MessageInfoBox } from "~/islands/ui/MessageInfoBox/MessageInfoBox";

import styles from "./PricingTable.module.scss";

const PRICING_TABLE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID;
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const StripePricingTable = (): JSX.Element => {
  return (
    <>
      <div className={styles.info_content}>
        <MessageInfoBox type="info" unforceWhite={true}>
          <div>
            {"The free tier allows you to have"}
            <span className={styles.bold}> 3 books </span>
            {"and"}
            <span className={styles.bold}> 100 chat credits </span>
            {
              "per month. You can upgrade to unlock more brains, more chat credits and access to premium models."
            }
          </div>
        </MessageInfoBox>
      </div>
      <div className="p-2">
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <stripe-pricing-table
          pricing-table-id={PRICING_TABLE_ID}
          publishable-key={PUBLISHABLE_KEY}
        ></stripe-pricing-table>
      </div>
    </>
  );
};
