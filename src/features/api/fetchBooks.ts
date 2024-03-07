export const API_KEY = process.env.API_KEY;
export const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export interface Book {
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    categories: string[];
  };
}

export async function getBooks(
  category: string = "",
  searchTerm: string = "",
  controller: AbortController
): Promise<Book[]> {
  const res = await fetch(
    `${BASE_URL}?q=${searchTerm}:${category}&key=${API_KEY}&maxResults=40`,
    { signal: controller.signal }
  );
  const data = await res.json();
  const books: Book[] = data.items;

  return books;
}
