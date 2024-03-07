import {
  Resource,
  component$,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { searchContext, categoryContext } from "./layout";
import { type Book, getBooks } from "~/features/api/fetchBooks";
import placeholder from "~/assets/placeholder.jpg";
import { categories } from "~/components/sidebar/sidebar";

export const useCategory = routeLoader$(async () => {
  const books = await getBooks();
  books.map((book) => {
    if (book.volumeInfo?.categories) {
      book.volumeInfo.categories.map((category) => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
    }
  });
});

export default component$(() => {
  const categorieData = useContext(categoryContext);
  const searchData = useContext(searchContext);

  const dataResource = useResource$<Book[]>(async ({ track, cleanup }) => {
    track(() => categorieData.value);
    track(() => searchData.value);

    const controller = new AbortController();
    cleanup(() => controller.abort("cleanup"));

    if (searchData.value)
      return getBooks(searchData.value, categorieData.value, controller);
    else return getBooks("Search", categorieData.value, controller);
  });

  return (
    <div class="min-h-screen">
      <Resource
        value={dataResource}
        onPending={() => <div class="bg-red-500 text-center">Loading...</div>}
        onRejected={(reason) => <div>Error: {reason.message}</div>}
        onResolved={(Books) => (
          <div class="flex flex-wrap gap-4 p-4 justify-center ">
            {Books.map((book) => (
              <div key={book.id}>
                <img
                  class="h-full cursor-pointer"
                  src={book.volumeInfo.imageLinks?.thumbnail || placeholder}
                  width={200}
                  height={80}
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
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
