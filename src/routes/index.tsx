import {
  Resource,
  component$,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { getBooks, type Book } from "~/features/api/fetchBooks";
import { categoryContext } from "~/routes/layout";

export default component$(() => {
  const userData = useContext(categoryContext);
  console.log(userData.value);
  const categoriesResource = useResource$<Book[]>(
    async ({ track, cleanup }) => {
      track(() => userData.value);
      console.log(userData.value);

      const controller = new AbortController();
      cleanup(() => controller.abort());

      return await getBooks(userData.value, "search+subject", controller);
    }
  );
  return (
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
                src={book.volumeInfo.imageLinks?.thumbnail}
                width={200}
                height={80}
              />
            </div>
          ))}
        </div>
      )}
    />
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
