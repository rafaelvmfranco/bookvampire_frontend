"use client";

import { useTranslations } from "next-intl";

import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { redirectToLogin } from "~/core/libs/router/redirectToLogin";
import { Button } from "~/islands/ui/button";
import PageHeading from "~/islands/ui/PageHeading";
import Spinner from "~/islands/ui/Spinner";

import { useInvitation } from "./hooks/useInvitation";

const InvitationPage = (): JSX.Element => {
	const t = useTranslations("invitation");
	const {
		handleAccept,
		isProcessingRequest,
		handleDecline,
		isLoading,
		brainName,
		role,
	} = useInvitation();
	const { session } = useSupabase();

	if (isLoading) {
		return <Spinner />;
	}

	if (session?.user === undefined) {
		redirectToLogin();
	}

	if (role === undefined) {
		// This should never happen
		// It is a way to prevent the page from crashing when invitation is invalid instead of throwing an error
		// The user will be redirected to the home page (handled in the useInvitation hook)
		return <div />;
	}

	return (
		<main className="pt-10">
			<PageHeading
				title={t("wellcome", { brain: brainName, ns: "invitation" })}
				subtitle={t("invitationMessage", { role: role, ns: "invitation" })}
			/>
			{isProcessingRequest ? (
				<div className="mt-5 flex flex-col items-center justify-center">
					<Spinner />
					<p className="text-center">
						{t("processingRequest", { ns: "invitation" })}
					</p>
				</div>
			) : (
				<div className="mt-5 flex flex-col items-center justify-center gap-5">
					<Button
						onClick={() => void handleAccept()}
						variant={"secondary"}
						className="py-3"
					>
						{t("accept", { ns: "invitation" })}
					</Button>
					<Button
						onClick={() => void handleDecline()}
						variant={"danger"}
						className="py-3"
					>
						{t("reject", { ns: "invitation" })}
					</Button>
				</div>
			)}
		</main>
	);
};

export default InvitationPage;
