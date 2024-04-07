"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const NewBookModal = ({ onClose, onSave }) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const handleSave = () => {
    // Handle saving the new book
    onSave({ name: bookName, author, coverImage });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg border border-slate-600 max-h-[90vh] max-w-full mx-4 overflow-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">New Book</h2>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="text-text-2 hover:text-text-1"
            >
              <X />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="bookName">Book name:</Label>
              <Input
                id="bookName"
                type="text"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="author">Author:</Label>
              <Input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label>Book cover image:</Label>
              {coverImage ? (
                <Image
                  src={URL.createObjectURL(coverImage)}
                  alt="Cover"
                  width={200}
                  height={300}
                  className="mt-2"
                />
              ) : (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <div
                  className="border border-gray-300 p-4 rounded cursor-pointer mt-2"
                  onClick={() =>
                    document.getElementById("coverImageInput")?.click()
                  }
                >
                  Click or drop to upload
                  <input
                    id="coverImageInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                        setCoverImage(e.target.files[0] as any);
                      }
                    }}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button type="button" onClick={handleSave} variant="default">
              + Add book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
