// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Header from "./components/Header";
import Hero from "./components/Hero";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export default async function Home() {
  // const supabase = createServerComponentClient({ cookies });
  // const { data } = await supabase.auth.getSession();

  // if (!data.session) {
  //   redirect("/login");
  // }
  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
