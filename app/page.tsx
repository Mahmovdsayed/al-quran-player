import AsmaAlHusnaa from "@/components/Layout/AsmaAlHusnaa";
import Banner from "@/components/Layout/Banner";
import Home from "@/components/Sections/Home";


export default function Page() {

  return (
    <main className="w-full ">
      <Banner />
      <div className="container mx-auto my-6 px-4">
        <AsmaAlHusnaa />
        <div className="my-3">
          <Home />
        </div>
      </div>
    </main>
  );
}
