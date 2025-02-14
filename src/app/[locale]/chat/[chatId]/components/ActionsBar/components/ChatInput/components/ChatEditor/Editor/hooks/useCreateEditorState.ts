import { Document } from "@tiptap/extension-document";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Text } from "@tiptap/extension-text";
import { Extension, useEditor } from "@tiptap/react";
import { useTranslations } from "next-intl";

import { useBrainMention } from "./useBrainMention";

export const useCreateEditorState = (placeholder?: string) => {
  const t = useTranslations("chat");

  const { BrainMention, items } = useBrainMention();

  const PreventEnter = Extension.create({
    addKeyboardShortcuts: () => {
      return {
        Enter: () => true,
        Escape: () => true,
      };
    },
  });

  const editor = useEditor(
    {
      autofocus: true,
      onFocus: () => {
        editor?.commands.focus("end");
      },
      parseOptions: {
        preserveWhitespace: "full",
      },
      extensions: [
        PreventEnter,
        Placeholder.configure({
          showOnlyWhenEditable: true,
          placeholder: placeholder ?? t("actions_bar_placeholder"),
        }),
        Document,
        Text,
        Paragraph,
        BrainMention,
        HardBreak,
      ],
    },
    [items.length],
  );

  return {
    editor,
  };
};
