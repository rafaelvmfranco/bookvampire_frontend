import { useContext } from "react";

import { ToastContext } from "~/islands/ui/Toast/domain/ToastContext";
import type { ToastPublisher } from "~/islands/ui/Toast/domain/types";

export const useToast = (): { publish: ToastPublisher } => {
	const { publish } = useContext(ToastContext);

	return {
		publish,
	};
};
