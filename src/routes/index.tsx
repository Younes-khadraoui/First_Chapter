import {
  Resource,
  component$,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { searchContext, categoryContext } from "./layout";
import { type Book, getBooks } from "~/features/api/fetchBooks";
import placeholder from "~/assets/placeholder.jpg";

export default component$(() => {
  const nav = useNavigate();

  const categorieData = useContext(categoryContext);
  const searchData = useContext(searchContext);

  const dataResource = useResource$<Book[]>(async ({ track, cleanup }) => {
    track(() => categorieData.value);
    track(() => searchData.value);

    const controller = new AbortController();
    cleanup(() => controller.abort("cleanup"));

    if (searchData.value) {
      const books = await getBooks(
        searchData.value,
        categorieData.value,
        controller
      );
      return books;
    } else {
      const books = await getBooks("search", categorieData.value, controller);
      return books;
    }
  });

  return (
    <div class="min-h-screen">
      <Resource
        value={dataResource}
        onPending={() => (
          <div class="loader w-full p-10 flex justify-center items-center">
            Loading...
          </div>
        )}
        onRejected={(reason) => (
          <div class="p-4 text-red-500">Error: {reason.message}</div>
        )}
        onResolved={(Books) => (
          <div class="flex flex-wrap gap-4 p-4 justify-center ">
            {Books.map((book) => (
              <div key={book.id}>
                <img
                  class="h-full cursor-pointer"
                  src={book.volumeInfo.imageLinks?.thumbnail || placeholder}
                  width={200}
                  height={80}
                  onClick$={() => {
                    nav("/books/" + book.id);
                  }}
                  alt="Book Image"
                />
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "First Chapter",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
