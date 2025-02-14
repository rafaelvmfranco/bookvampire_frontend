import { useEffect, useState } from "react";

import type { IconSize } from "~/core/libs/types/Icons";
import Icon from "~/islands/ui/Icon/Icon";

import { Button } from "./button";

type CopyButtonProps = {
	handleCopy: () => void;
	size: IconSize;
};

export const CopyButton = ({
	handleCopy,
	size,
}: CopyButtonProps): JSX.Element => {
	const [isCopied, setIsCopied] = useState(false);

	const handleClick = () => {
		handleCopy();
		setIsCopied(true);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isCopied) {
			const timer = setTimeout(() => {
				setIsCopied(false);
			}, 2000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [isCopied]);

	return (
		<Button
			className="text-gray-500 hover:text-gray-700 transition"
			onClick={handleClick}
			title={isCopied ? "Copied!" : "Copy to clipboard"}
		>
			<Icon
				name={isCopied ? "checkCircle" : "copy"}
				color={isCopied ? "primary" : "black"}
				size={size}
				handleHover={true}
			/>
		</Button>
	);
};
