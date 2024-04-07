import { Modal } from "~/islands/ui/Modal/Modal";
import { StripePricingTable } from "./components/PricingTable/PricingTable";

type StripePricingModalProps = {
	Trigger: JSX.Element;
};

export const StripePricingModal = ({
	Trigger,
}: StripePricingModalProps): JSX.Element => {
	return (
		<Modal Trigger={Trigger} CloseTrigger={<div />} unforceWhite={true}>
			<StripePricingTable />
		</Modal>
	);
};
