import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuButton } from "~/core/libs/components/Menu/components/MenuButton/MenuButton";
import { useUserData } from "~/core/libs/hooks/useUserData";

export const ProfileButton = (): JSX.Element => {
	const pathname = usePathname() ?? "";
	const isSelected = pathname.includes("/user");
	const { userIdentityData } = useUserData();

	let username = userIdentityData?.username ?? "Profile";

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		username = userIdentityData?.username ?? "Profile";
	}, [userIdentityData]);

	return (
		<Link href="/user">
			<MenuButton
				label={username}
				iconName="user"
				type="open"
				isSelected={isSelected}
				color="primary"
			/>
		</Link>
	);
};
