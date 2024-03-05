import {
  component$,
  createContextId,
  type Signal,
  Slot,
  useContextProvider,
  useSignal,
} from "@builder.io/qwik";

import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Footer } from "~/components/footer/footer";
import { Navbar } from "~/components/navbar/navbar";
import { Sidebar } from "~/components/sidebar/sidebar";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});
export const categoryContext =
  createContextId<Signal<string>>("Category_Context");
export default component$(() => {
  const selectedCategory = useSignal("");

  useContextProvider(categoryContext, selectedCategory);
  return (
    <>
      <Navbar />
      <div class="flex items-start">
        <Sidebar />
        <main>
          <Slot />
        </main>
      </div>
      <Footer />
    </>
  );
});
