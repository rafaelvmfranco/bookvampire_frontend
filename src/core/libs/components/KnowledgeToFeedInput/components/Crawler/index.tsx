"use client";

import { useTranslations } from "next-intl";
import { MdSend } from "react-icons/md";

import { Button } from "~/islands/ui/button";
import Field from "~/islands/ui/Field";

import { useCrawler } from "./hooks/useCrawler";

export const Crawler = (): JSX.Element => {
	const { urlInputRef, urlToCrawl, handleSubmit, setUrlToCrawl } = useCrawler();
	const t = useTranslations("upload");

	return (
		<div className="flex w-full items-center justify-center">
			<div className="w-full max-w-xl">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
					className="w-full"
				>
					<Field
						name="crawlurl"
						ref={urlInputRef}
						type="text"
						data-testid="urlToCrawlInput"
						placeholder={t("webSite", { ns: "upload" })}
						className="w-full"
						value={urlToCrawl}
						onChange={(e) => setUrlToCrawl(e.target.value)}
						icon={
							<Button data-testid="urlToCrawlInputSubmit" variant={"tertiary"}>
								<MdSend />
							</Button>
						}
					/>
				</form>
			</div>
		</div>
	);
};
