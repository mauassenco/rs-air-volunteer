
import Link from "next/link";
import { Button } from "./_components/ui/button";

const Home = () => {


  return (
    <>
      <main className="bg-slate-600 h-screen">
        <div className="relative flex flex-col items-center justify-center gap-4 h-full flex-wrap">
          <Button
            variant="default"
            className="w-[12rem] h-fit  text-white hover:bg-transparent p-6 border shadow-black shadow-md"
            asChild
          >
            <Link href={"/cadastro-de-voluntarios"}>
              Cadastro de Voluntário
            </Link>
          </Button>

          <Button
            className="w-[12rem] h-fit text-white hover:bg-transparent p-6 border shadow-black shadow-md"
            asChild
          >
            <Link href={"/voos"}>
              Listagem de Voos
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}

export default Home;