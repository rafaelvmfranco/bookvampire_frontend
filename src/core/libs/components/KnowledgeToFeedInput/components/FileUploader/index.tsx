"use client";

import { useTranslations } from "next-intl";
import { IoCloudUploadOutline } from "react-icons/io5";

import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { useCustomDropzone } from "~/core/libs/hooks/useDropzone";
import { redirectToLogin } from "~/core/libs/router/redirectToLogin";
import { Card } from "~/islands/ui/card";

export const FileUploader = (): JSX.Element => {
  const { session } = useSupabase();
  const { getInputProps, isDragActive, open } = useCustomDropzone();

  if (session === null) {
    redirectToLogin();
  }

  const t = useTranslations("upload");

  return (
    <section className="flex w-full flex-col items-center justify-center gap-10 px-0 outline-none">
      <div className="flex w-full max-w-3xl cursor-pointer flex-col items-center gap-5 sm:flex-row">
        <div className="w-full flex-1">
          <Card
            className="flex h-20 items-center justify-center"
            onClick={open}
          >
            <IoCloudUploadOutline className="text-5xl" />
            <input {...getInputProps()} />
            {isDragActive && (
              <p className="text-blue-600">{t("drop", { ns: "upload" })}</p>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};
