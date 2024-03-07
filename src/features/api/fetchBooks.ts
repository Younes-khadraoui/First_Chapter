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

// export async function getBooks(
//   category: string = "",
//   searchTerm: string = "",
//   controller?: AbortController
// ): Promise<Book[]> {

//   return books;
// }
