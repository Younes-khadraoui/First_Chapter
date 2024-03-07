import {
  Resource,
  component$,
  // useContext,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  API_KEY,
  BASE_URL,
  //  getBooks
} from "~/features/api/fetchBooks";
// import { categoryContext } from "~/routes/layout";
import { type Book } from "~/features/api/fetchBooks";

export default component$(() => {
  // const userData = useContext(categoryContext);
  // console.log(userData.value);
  const tracked = useSignal<string>("");
  const categoriesResource = useResource$(async ({ track, cleanup }) => {
    track(() => tracked.value);
    console.log(tracked.value);

    const controller = new AbortController();
    cleanup(() => controller.abort("cleanup"));

    const res = await fetch(
      `${BASE_URL}?q="search+subject":${tracked.value}&key=${API_KEY}&maxResults=40`,
      { signal: controller.signal }
    );
    const data = await res.json();
    const books: Book[] = data.items;

    return books;
  });

  return (
    <div>
      <input class="text-black" bind:value={tracked} />
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
