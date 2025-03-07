// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ClickSpark from "./_components/ClickSpark";

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
      <ClickSpark
        sparkColor="black"
        sparkSize={12}
        sparkRadius={15}
        sparkCount={8}
        duration={200}
      >
        <Header />
        <Hero />
      </ClickSpark>
    </>
  );
}
