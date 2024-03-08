import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { type Book, getBook } from "~/features/api/fetchBooks";
import placeholder from "~/assets/placeholder.jpg";

export const useBook = routeLoader$(async (requestEvent) => {
  return (await getBook(requestEvent.params.id)) as Book;
});

export default component$(() => {
  const res = useBook();
  const book = res.value;

  return (
    <div class="h-screen grid grid-cols-2">
      <div class="p-4 bg-[#292828] gap-4 lg:flex">
        <img
          class="rounded-sm flex-shrink max-h-80 min-w-[200px]"
          src={book.volumeInfo.imageLinks?.thumbnail || placeholder}
          width={200}
          height={120}
        />
        <div class="py-5 lg:py-0">
          <h1 class="text-2xl">{book.volumeInfo.title}</h1>
          <p class="opacity-70">{book.volumeInfo.authors?.join(", ")}</p>
          <p class="opacity-70 mb-4">
            {book.volumeInfo.categories?.join(", ")}
          </p>
          <Link
            class="bg-white rounded-lg text-black p-2 hover:bg-[#242121] hover:border hover:border-white hover:text-white transition-all duration-300 ease-in-out"
            href={book.volumeInfo.previewLink}
          >
            Preview
          </Link>
        </div>
      </div>
      <div class="p-4 flex-grow">
        {book.volumeInfo.description && (
          <h2 class="text-2xl pb-2">Description :</h2>
        )}
        {!book.volumeInfo.description && (
          <h2 class="text-2xl pb-2 opacity-80">No Description available </h2>
        )}
        <p class="opacity-70">{book.volumeInfo.description}</p>
      </div>
    </div>
  );
});
