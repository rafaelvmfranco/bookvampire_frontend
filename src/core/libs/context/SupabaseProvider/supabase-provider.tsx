"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	createBrowserSupabaseClient,
	type Session,
} from "@supabase/auth-helpers-nextjs";

import type { SupabaseContextType } from "./types";

export const SupabaseContext = createContext<SupabaseContextType | undefined>(
	undefined,
);

export const SupabaseProvider = ({
	children,
	session,
}: {
	children: React.ReactNode;
	session: Session | null;
}): JSX.Element => {
	const [supabase] = useState(() => createBrowserSupabaseClient());
	const router = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(() => {
			router.refresh();
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [router, supabase]);

	return (
		<SupabaseContext.Provider value={{ supabase, session }}>
			{children}
		</SupabaseContext.Provider>
	);
};
