/* eslint-disable max-lines */
"use client";

import { useTranslations } from "next-intl";

import { Button } from "~/islands/ui/button";
import { CopyButton } from "~/islands/ui/CopyButton";
import { FieldHeader } from "~/islands/ui/FieldHeader/FieldHeader";

import styles from "./ApiKeyConfig.module.scss";
import { useApiKeyConfig } from "./hooks/useApiKeyConfig";

export const ApiKeyConfig = (): JSX.Element => {
	const { apiKey, handleCopyClick, handleCreateClick } = useApiKeyConfig();
	const t = useTranslations("config");

	return (
		<div>
			<FieldHeader iconName="key" label={`Quivr ${t("apiKey")}`} />
			{apiKey === "" ? (
				<Button
					data-testid="create-new-key"
					variant="secondary"
					onClick={() => void handleCreateClick()}
				>
					Create New Key
				</Button>
			) : (
				<div className={styles.response_wrapper}>
					<span>{apiKey}</span>
					<CopyButton handleCopy={handleCopyClick} size="small" />
				</div>
			)}
		</div>
	);
};
