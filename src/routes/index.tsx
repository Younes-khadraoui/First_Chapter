import {
  Resource,
  component$,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { searchContext, categoryContext } from "./layout";
import { getBooks } from "~/features/api/fetchBooks";

export default component$(() => {
  const userData = useContext(categoryContext);
  const searchData = useContext(searchContext);
  const categoriesResource = useResource$(async ({ track, cleanup }) => {
    track(() => userData.value && searchData.value);

    const controller = new AbortController();
    cleanup(() => controller.abort("cleanup"));

    if (searchData.value)
      return getBooks(searchData.value, userData.value, controller);
    else return getBooks("Search", userData.value, controller);
  });

  return (
    <div class="min-h-screen">
      <Resource
        value={categoriesResource}
        onPending={() => <div class="bg-red-500">Loading...</div>}
        onRejected={(reason) => <div>Error: {reason.message}</div>}
        onResolved={(Books) => (
          <div class="flex flex-wrap gap-4 p-4 justify-center">
            {Books.map((book) => (
              <div key={book.id}>
                <img
                  class="h-full"
                  src={book.volumeInfo.imageLinks.thumbnail}
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
