import { Outlet } from "react-router";
import Hero from "../components/Hero";

const HomeLayout = () => {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 my-8">
        <Hero name="Micheline" />
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
