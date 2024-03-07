import { server$ } from "@builder.io/qwik-city";

const getAPI = server$(function () {
  return this.env.get("API_KEY");
});
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export interface Book {
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail?: string;
    };
    categories?: string[];
  };
}

export interface Category {
  id: string;
  volumeInfo: {
    categories: string[];
  };
}

export async function getBooks(
  category: string = "",
  searchTerm: string = "",
  controller: AbortController = new AbortController()
): Promise<Book[]> {
  const API_KEY = await getAPI();
  const res = await fetch(
    `${BASE_URL}?q=${searchTerm}:${category}&key=${API_KEY}&maxResults=40`,
    { signal: controller.signal }
  );
  const data = await res.json();
  const books: Book[] = data.items;

  return books;
}
