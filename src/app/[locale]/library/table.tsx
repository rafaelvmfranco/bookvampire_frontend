"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "~/islands/ui/button";

const BookTable = () => {
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

  const handleDelete = (event, bookId) => {
    event.stopPropagation();
    setBooks(books.filter((book) => book.id !== bookId));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleOptions = (event, bookId) => {
    event.stopPropagation();
    setShowOptions(bookId === showOptions ? null : bookId);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a book"
        value={searchQuery}
        onChange={handleSearch}
        className="border border-input rounded-md px-4 py-2 mb-4 dark:bg-card"
      />

      <table className="table-auto w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 border border-input">Name</th>
            <th className="px-4 py-2 border border-input">Author</th>
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <th className="px-4 py-2 border border-input"></th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <tr
              key={book.id}
              className="hover:bg-card dark:hover:bg-[#24000A] cursor-pointer border-b"
              onClick={() => {
                if (editingBookId !== book.id) {
                  window.location.href = `/library/${book.id}`;
                }
              }}
            >
              <td className="border border-input px-4 py-3">
                {editingBookId === book.id ? (
                  <input
                    type="text"
                    value={book.name}
                    onChange={(e) =>
                      setBooks(
                        books.map((b) =>
                          b.id === book.id ? { ...b, name: e.target.value } : b,
                        ),
                      )
                    }
                    className="border border-card rounded-lg px-2 py-1 dark:bg-card"
                  />
                ) : (
                  book.name
                )}
              </td>
              <td className="border border-input px-4 py-3">
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
                    className="border border-card rounded-md px-2 py-1 dark:bg-card"
                  />
                ) : (
                  book.author
                )}
              </td>
              <td className="border border-input px-4 py-3">
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(event) => toggleOptions(event, book.id)}
                  >
                    <DotsHorizontalIcon />
                  </Button>
                  {showOptions === book.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-muted divide-y divide-input rounded-md shadow-lg">
                      <Link
                        href={`/library/${book.id}`}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
                      >
                        Edit
                      </Link>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={(event) => handleDelete(event, book.id)}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
