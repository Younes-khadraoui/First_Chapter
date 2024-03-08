import { component$, useContext } from "@builder.io/qwik";
import { categoryContext } from "~/routes/layout";

export const categories = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Romance",
  "Fantasy",
  "Biography",
  "History",
  "Development",
  "Business",
  "Young Adult",
  "Children",
  "Crime",
  "Horror",
  "Poetry",
  "Travel",
  "Cooking",
  "Art",
  "Religion",
  "Philosophy",
  "Psychology",
];

export const Sidebar = component$(() => {
  const categoryData = useContext(categoryContext);
  return (
    <div class="border-4 border-[#292828] rounded-lg p-4 min-w-fit mt-3 ml-2 inline-block">
      <p class="underline underline-offset-2 text-xl pb-4">Categories</p>
      <ul class="mb-4">
        {categories.map((category, index) => (
          <li key={index}>
            <input
              class="accent-[#292828] outline-none cursor-pointer"
              type="radio"
              id={category}
              name={"category"}
              value={category}
              checked={category === categoryData.value}
              onChange$={() => {
                categoryData.value = category;
              }}
            />
            <label class="px-2 text-sm">{category}</label>
          </li>
        ))}
      </ul>
      <button
        class="bg-white text-sm rounded-sm text-black p-1 hover:bg-[#242121] hover:border hover:border-white hover:text-white transition-all duration-300 ease-in-out"
        onClick$={() => {
          categoryData.value = "";
          document
            .querySelectorAll('input[type="radio"][name="category"]')
            .forEach((input) => {
              (input as HTMLInputElement).checked = false;
            });
        }}
      >
        Clear Selection
      </button>
    </div>
  );
});
