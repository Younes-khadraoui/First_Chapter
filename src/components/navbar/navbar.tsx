import { component$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { FaHeartRegular } from "@qwikest/icons/font-awesome";
import { FaBellRegular } from "@qwikest/icons/font-awesome";
import { FaGemRegular } from "@qwikest/icons/font-awesome";
import BooksIcon from "~/assets/Books.svg?jsx";
import { searchContext } from "~/routes/layout";

export const Navbar = component$(() => {
  const searhData = useContext(searchContext);
  return (
    <div class="bg-[#292828] flex justify-between p-2 items-center">
      <div class="flex flex-grow text-start items-center ">
        <BooksIcon width={80} />
        <p class="text-2xl flex-grow">First Chapter</p>
      </div>
      <dvi class="flex-grow flex pr-10 ">
        <input
          class="flex-grow p-1 pl-4 rounded-lg bg-[#373737] border-none active:border-none focus:outline-none"
          placeholder="search a book"
          type="text"
          bind:value={searhData}
        />
      </dvi>
      <dvi class="flex-grow flex gap-4 justify-end items-center ">
        <Link href="/" class="text-2xl">
          <FaHeartRegular />
        </Link>
        <Link href="/" class="text-2xl">
          <FaBellRegular />
        </Link>
        <Link href="/" class="text-2xl">
          <FaGemRegular />
        </Link>
        <Link href="/">
          <img class="rounded-full bg-white" width={30} height={30} />
        </Link>
      </dvi>
    </div>
  );
});
