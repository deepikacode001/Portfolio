import Image from "next/image";
import Header from "./components/header-page";
import Hero from "./section/section-one";

export default function Home() {
  return (
    <div>
      <Header/>
      <Hero />
    </div>
  );
}
