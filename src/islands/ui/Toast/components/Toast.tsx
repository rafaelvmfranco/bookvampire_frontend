"use client";

import type { ReactNode } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { cn } from "~/core/libs/utils";

import { Button } from "~/islands/ui/button";
import { ToastContext } from "../domain/ToastContext";
import { ToastVariants } from "../domain/types";
import { useToastBuilder } from "../hooks/useToastBuilder";

export const Toast = ({
	children,
	...toastProviderProps
}: {
	children?: ReactNode;
} & ToastPrimitive.ToastProviderProps): JSX.Element => {
	const { publish, toasts, toggleToast } = useToastBuilder();
	const t = useTranslations("translation");

	return (
		<ToastPrimitive.Provider {...toastProviderProps}>
			<ToastContext.Provider value={{ publish }}>
				{children}
				<AnimatePresence mode="popLayout">
					{toasts.map((toast) => {
						if (toast.open !== true) {
							return;
						}

						return (
							<ToastPrimitive.Root
								open={toast.open}
								onOpenChange={(value) => toggleToast(value, toast.id)}
								asChild
								forceMount
								key={toast.id}
							>
								<motion.div
									layout
									initial={{ x: "100%", opacity: 0 }}
									animate={{
										x: "0%",
										opacity: 1,
									}}
									exit={{ opacity: 0 }}
									className={cn(ToastVariants({ variant: toast.variant }))}
								>
									<ToastPrimitive.Description className="flex-1">
										{toast.text}
									</ToastPrimitive.Description>
									<ToastPrimitive.Close asChild>
										<Button variant={"tertiary"} className="text-white">
											{t("toastDismiss")}
										</Button>
									</ToastPrimitive.Close>
								</motion.div>
							</ToastPrimitive.Root>
						);
					})}
				</AnimatePresence>
				<ToastPrimitive.Viewport className="pointer-events-none fixed bottom-0 left-0 right-0 z-[99999] flex flex-col items-end gap-2 p-5 outline-none" />
			</ToastContext.Provider>
		</ToastPrimitive.Provider>
	);
};

Toast.displayName = "Toast";
