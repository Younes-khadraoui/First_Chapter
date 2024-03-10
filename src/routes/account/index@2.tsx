import { component$ } from "@builder.io/qwik";
import { useAuthSession, useAuthSignout } from "../plugin@auth";
import { Form } from "@builder.io/qwik-city";

export default component$(() => {
  const session = useAuthSession();
  const signOut = useAuthSignout();

  //   if (!session) {
  //     throw redirect("/login");
  //   }

  return (
    <div class="flex justify-center items-center  h-screen">
      {session.value && (
        <div>
          <h1 class="text-4xl py-4">Account</h1>
          <div>
            <div class="flex gap-6">
              <div class="flex gap-4">
                <img
                  class="rounded-lg"
                  src={session.value.user?.image || ""}
                  width={80}
                  height={20}
                ></img>
                <div>
                  <p>User : {session.value.user?.name}</p>
                  <p>Email : {session.value.user?.email}</p>
                </div>
              </div>
              <Form action={signOut}>
                <input
                  type="hidden"
                  name="callbackUrl"
                  value="https://firstchap.vercel.app/"
                />
                <button class="bg-red-500 rounded-lg p-2 hover:bg-[#242121] hover:border hover:border-white hover:text-white transition-all duration-300 ease-in-out">
                  Signout
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
