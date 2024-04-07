import { useEffect, useState } from "react";

import Icon from "~/islands/ui/Icon/Icon";
import { SingleSelector } from "~/islands/ui/SingleSelector/SingleSelector";
import { TextInput } from "~/islands/ui/TextInput/TextInput";

import {
	userRoleToAssignableRoles,
	type BrainRoleAssignation,
	type BrainRoleType,
} from "../../types";
import styles from "./UserToInvite.module.scss";

type UserToInviteProps = {
	onChange: (newRole: BrainRoleAssignation) => void;
	removeCurrentInvitation?: () => void;
	roleAssignation: BrainRoleAssignation;
};

export const UserToInvite = ({
	onChange,
	removeCurrentInvitation,
	roleAssignation,
}: UserToInviteProps): JSX.Element => {
	const [selectedRole, setSelectedRole] = useState<BrainRoleType>(
		roleAssignation.role,
	);
	const [email, setEmail] = useState(roleAssignation.email);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (
			email !== roleAssignation.email ||
			selectedRole !== roleAssignation.role
		) {
			onChange({
				...roleAssignation,
				email,
				role: selectedRole,
			});
		}
	}, [email, onChange, roleAssignation, selectedRole]);

	return (
		<div className={styles.user_to_invite_wrapper}>
			<Icon
				color="dangerous"
				name="delete"
				handleHover={true}
				size="normal"
				onClick={removeCurrentInvitation}
			/>

			<TextInput label="Email" inputValue={email} setInputValue={setEmail} />

			<div className={styles.selector}>
				<SingleSelector
					selectedOption={{ label: selectedRole, value: selectedRole }}
					// biome-ignore lint/complexity/useLiteralKeys: <explanation>
					options={userRoleToAssignableRoles["Owner"]}
					onChange={setSelectedRole}
					placeholder="Role"
					iconName="user"
				/>
			</div>
		</div>
	);
};
