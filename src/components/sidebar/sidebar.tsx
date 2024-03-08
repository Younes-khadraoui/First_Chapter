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
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <input
              class="accent-[#292828] outline-none cursor-pointer"
              type="radio"
              id={category}
              name={"category"}
              value={category}
              onChange$={() => {
                categoryData.value = category;
              }}
            />
            <label class="px-2 text-sm">{category}</label>
          </li>
        ))}
      </ul>
    </div>
  );
});
