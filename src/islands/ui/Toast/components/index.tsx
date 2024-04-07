"use client";

import type { ReactNode } from "react";
import type * as ToastPrimitive from "@radix-ui/react-toast";

import { Toast } from "./Toast";

export const ToastProvider = ({
  children,
  ...toastProviderProps
}: {
  children?: ReactNode;
} & ToastPrimitive.ToastProviderProps): JSX.Element => {
  return <Toast {...toastProviderProps}>{children}</Toast>;
};
