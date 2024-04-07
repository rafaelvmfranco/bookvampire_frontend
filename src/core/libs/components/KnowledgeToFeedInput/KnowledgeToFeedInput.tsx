import { useTranslations } from "next-intl";

import { useKnowledgeToFeedContext } from "~/core/libs/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import { Button } from "~/islands/ui/button";

import { FeedItems } from "./components";
import { Crawler } from "./components/Crawler";
import { FileUploader } from "./components/FileUploader";

export const KnowledgeToFeedInput = ({
	feedBrain,
}: {
	feedBrain: () => void;
}): JSX.Element => {
	const t = useTranslations("upload");

	const { knowledgeToFeed } = useKnowledgeToFeedContext();

	return (
		<div className="px-20">
			<div className="mt-5 flex flex-row items-center justify-between gap-10">
				<FileUploader />
				<span className="whitespace-nowrap">and / or</span>
				<Crawler />
			</div>
			<FeedItems />
			<div className="mt-5 flex justify-center">
				<Button
					disabled={knowledgeToFeed.length === 0}
					className="rounded-xl border-white bg-primary"
					onClick={() => void feedBrain()}
					data-testid="submit-feed-button"
				>
					{t("feed_form_submit_button", { ns: "upload" })}
				</Button>
			</div>
		</div>
	);
};
