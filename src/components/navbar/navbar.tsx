import {
  component$,
  useContext,
  useSignal,
  $,
  type QRL,
} from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { FaHeartRegular } from "@qwikest/icons/font-awesome";
import { FaBellRegular } from "@qwikest/icons/font-awesome";
import { FaGemRegular } from "@qwikest/icons/font-awesome";
import BooksIcon from "~/assets/Books.svg?jsx";
import { searchContext } from "~/routes/layout";
import { useAuthSession, useAuthSignin } from "~/routes/plugin@auth";

export const useDebouncer = (fn: QRL<(args: any) => void>, delay: number) => {
  const timeoutId = useSignal<number>();

  return $((args: any) => {
    clearTimeout(timeoutId.value);
    timeoutId.value = Number(setTimeout(() => fn(args), delay));
  });
};

export const Navbar = component$(() => {
  const session = useAuthSession();
  const signIn = useAuthSignin();

  const searchData = useContext(searchContext);
  const debounce = useDebouncer(
    $((value: string) => {
      searchData.value = value;
    }),
    1000
  );
  return (
    <div class="bg-[#292828] flex justify-between p-2 items-center">
      <div class="flex flex-grow text-start items-center ">
        <Link href="/">
          <BooksIcon width={80} />
        </Link>
        <Link href="/">
          <p class="text-2xl flex-grow hover:opacity-80 ">First Chapter</p>
        </Link>
      </div>
      <div class="flex-grow flex pr-10 ">
        <input
          class="flex-grow p-1 pl-4 rounded-lg bg-[#373737] border-none active:border-none focus:outline-none"
          placeholder="search a book"
          type="text"
          onInput$={(_, target) => {
            debounce(target.value);
          }}
        />
      </div>
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
        {session.value?.user === undefined && (
          <Form action={signIn}>
            <input type="hidden" name="providerId" value="github" />
            <input
              type="hidden"
              name="options.callbackUrl"
              value="https://firstchap.vercel.app/"
            />
            <button>
              <img
                src=""
                class="rounded-full bg-white"
                width={30}
                height={30}
              />
            </button>
          </Form>
        )}
        {session.value?.user !== undefined && (
          <Link href="/account">
            <img
              src={session.value.user.image || ""}
              class="rounded-full bg-white"
              width={30}
              height={30}
            />
          </Link>
        )}
      </dvi>
    </div>
  );
});
