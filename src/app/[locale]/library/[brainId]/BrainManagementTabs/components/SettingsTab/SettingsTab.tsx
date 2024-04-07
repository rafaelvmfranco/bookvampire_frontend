"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import type { UUID } from "node:crypto";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";

import type { Brain } from "~/core/libs/context/BrainProvider/types";
import { MessageInfoBox } from "~/islands/ui/MessageInfoBox/MessageInfoBox";
import QuivrButton from "~/islands/ui/QuivrButton/QuivrButton";
import { useBrainFetcher } from "../../hooks/useBrainFetcher";
import { GeneralInformation } from "./components/GeneralInformation/GeneralInformation";
import { ModelSelection } from "./components/ModelSelection/ModelSelection";
import { Prompt } from "./components/Prompt/Prompt";
import { useBrainFormState } from "./hooks/useBrainFormState";
import { usePermissionsController } from "./hooks/usePermissionsController";
import type { UsePromptProps } from "./hooks/usePrompt";
import { useSettingsTab } from "./hooks/useSettingsTab";
import styles from "./SettingsTab.module.scss";
import Link from "next/link";
import { Button, buttonVariants } from "~/islands/ui/button";
import { cn } from "~/core/libs/utils";
import { Trash, UploadCloud } from "lucide-react";

type SettingsTabProps = {
  //   bookId: UUID | number;
  bookId: string;
};

export const SettingsTabContent = ({
  bookId,
}: SettingsTabProps): JSX.Element => {
  const t = useTranslations("config");

  /* const { handleSubmit, isUpdating, formRef, accessibleModels, setIsUpdating } =
		useSettingsTab({ brainId });

	const promptProps: UsePromptProps = {
		setIsUpdating,
	};

	useBrainFormState();

	const { hasEditRights } = usePermissionsController({
		brainId,
	});

	const { brain } = useBrainFetcher({
		brainId,
	}); */
  /* const [name, setName] = useState(bookId.name);
  const [author, setAuthor] = useState(bookId.author); */

  /* const handleSave = () => {
    onSave({ ...book, name, author });
  }; */

  /* const BookTable = () => {
  const [books, setBooks] = useState([
    { id: 1, name: "Book 1", author: "Author 1" },
    { id: 2, name: "Book 2", author: "Author 2" },
    { id: 3, name: "Book 3", author: "Author 3" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [editingBookId, setEditingBookId] = useState(null);
  const [showOptions, setShowOptions] = useState(null);

  const handleEdit = (bookId) => {
    setEditingBookId(bookId);
  };

  const handleDelete = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleOptions = (bookId) => {
    setShowOptions(bookId === showOptions ? null : bookId);
  }; */

  /* const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  ); */

  // Mock book data
  const books = [
    {
      id: 1,
      name: "Harry Potter",
      author: "J.K. Rowling",
      coverImage:
        "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
    },
    {
      id: 2,
      name: "Game of Thrones",
      author: "George R.R. Martin",
      coverImage:
        "https://upload.wikimedia.org/wikipedia/en/d/dc/A_Song_of_Ice_and_Fire_book_collection_box_set_cover.jpg",
    },
    {
      id: 3,
      name: "Hunger Games",
      author: "Suzanne Collins",
      coverImage:
        "https://upload.wikimedia.org/wikipedia/en/3/39/The_Hunger_Games_cover.jpg",
    },
  ];

  // Find the book based on the bookId
  const book = books.find((book) => book.id === Number.parseInt(bookId));

  if (!book) {
    return <div>Book not found...</div>;
  }

  return (
    <>
      <form className="flex flex-col gap-6 my-6 font-semibold">
        <div>
          <label className="block mb-4">Book name:</label>
          <input
            type="text"
            value={book.name}
            readOnly
            className="dark:bg-slate-800 rounded-lg font-semibold"
          />
        </div>
        <div>
          <label className="block mb-4">Author:</label>
          <input
            type="text"
            value={book.author}
            readOnly
            className="dark:bg-slate-800 rounded-lg font-semibold"
          />
        </div>
        <div>
          <label className="block mb-4 font-semibold">Book cover image:</label>
          <div className="flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.coverImage}
              alt={book.name}
              width={200}
              height={300}
            />
            <div className="flex flex-col ml-3 gap-2">
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "whitespace-nowrap px-3",
                )}
              >
                <UploadCloud className="sm:mr-2 max-w-5" />
                <span className="hidden sm:block">Upload</span>
              </Link>
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "whitespace-nowrap px-3",
                )}
              >
                <Trash className="sm:mr-2 max-w-5" />
                <span className="hidden sm:block">Remove</span>
              </Link>
            </div>
          </div>
        </div>
        <Button
          type="button"
          variant="default"
          className="px-4 py-2 rounded-md self-end p-6"
        >
          Save
        </Button>
      </form>

      {/* 
      <div>
        <input
          type="text"
          placeholder="Search for a book"
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300/50 rounded-md px-4 py-2 mb-4 dark:bg-[#1D262D] dark:text-white"
        />

        <table className="table-auto w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <tr
                key={book.id}
                className="hover:bg-primary cursor-pointer"
                onClick={() => {
                  if (editingBookId !== book.id) {
                    window.location.href = `/library/${book.id}`;
                  }
                }}
              >
                <td className="border px-4 py-2">
                  {editingBookId === book.id ? (
                    <input
                      type="text"
                      value={book.name}
                      onChange={(e) =>
                        setBooks(
                          books.map((b) =>
                            b.id === book.id
                              ? { ...b, name: e.target.value }
                              : b,
                          ),
                        )
                      }
                      className="border border-gray-300/50 rounded-md px-2 py-1 dark:bg-[#1D262D] dark:text-white"
                    />
                  ) : (
                    book.name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingBookId === book.id ? (
                    <input
                      type="text"
                      value={book.author}
                      onChange={(e) =>
                        setBooks(
                          books.map((b) =>
                            b.id === book.id
                              ? { ...b, author: e.target.value }
                              : b,
                          ),
                        )
                      }
                      className="border border-gray-300/50 rounded-md px-2 py-1 dark:bg-[#1D262D] dark:text-white"
                    />
                  ) : (
                    book.author
                  )}
                </td>
                <td className="border px-4 py-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleOptions(book.id)}
                      className=""
                    >
                      <DotsHorizontalIcon />
                    </button>
                    {showOptions === book.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-card border border-gray-200/50 divide-y divide-gray-100 rounded-md shadow-lg">
                        <button
                          type="button"
                          onClick={() => handleEdit(book.id)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(book.id)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {/* <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300/50 rounded-md px-2 py-1 dark:bg-[#1D262D] dark:text-white"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border border-gray-300/50 rounded-md px-2 py-1 dark:bg-[#1D262D] dark:text-white"
        />
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Save
        </button>
      </form> */}
      {/* 
			<form
				onSubmit={(e) => {
					e.preventDefault();
					void handleSubmit();
				}}
				ref={formRef}
			>
				<div className={styles.main_container}>
					<div className={styles.main_infos_wrapper}>
						<span className={styles.section_title}>General Information</span>
						<div className={styles.inputs_wrapper}>
							<div className={styles.general_information}>
								<GeneralInformation hasEditRights={hasEditRights} />
							</div>
							{(!!brain?.integration_description?.allow_model_change ||
								brain?.brain_type === "doc") && (
								<div className={styles.model_information}>
									<ModelSelection
										accessibleModels={accessibleModels}
										hasEditRights={hasEditRights}
										brainId={brainId}
										handleSubmit={handleSubmit}
									/>
								</div>
							)}
						</div>
						{hasEditRights && (
							<div className={styles.save_button}>
								<QuivrButton
									label="Save"
									iconName="upload"
									color="primary"
									onClick={() => handleSubmit()}
								/>
							</div>
						)}
					</div>
					{hasEditRights && (
						<div className={styles.prompt_wrapper}>
							<span className={styles.section_title}>Prompt</span>
							<MessageInfoBox type="info">
								Select a suggested prompt or create your own for tailored
								interactions
							</MessageInfoBox>
							<Prompt
								usePromptProps={promptProps}
								isUpdatingBrain={isUpdating}
							/>
							<div>
								{isUpdating && <FaSpinner className="animate-spin" />}
								{isUpdating && (
									<span>{t("updatingBrainSettings", { ns: "config" })}</span>
								)}
							</div>
						</div>
					)}
				</div>
			</form> */}
    </>
  );
};

export const SettingsTab = ({ bookId }: SettingsTabProps): JSX.Element => {
  const methods = useForm<Brain>();

  return (
    <FormProvider {...methods}>
      <SettingsTabContent bookId={bookId} />
    </FormProvider>
  );
};
