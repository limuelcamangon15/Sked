import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Default from "./templates/Default";

export default function Home() {
  return (
    <>
      <Default
        header={<Header />}
        footer={<Footer />}
        className="flex flex-col items-center justify-center"
      >
        <Hero />
      </Default>
    </>
  );
}
