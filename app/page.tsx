
import Link from "next/link";
import { Button } from "./_components/ui/button";
import { PlaneTakeoffIcon, SmilePlusIcon } from "lucide-react";

const Home = () => {


  return (
    <>
      <main className="bg-slate-600 h-screen">
        <div className="flex flex-col items-center justify-center gap-8 h-full flex-wrap">
          <Button
            className="w-[15rem] h-fit text-white hover:bg-transparent p-6 border shadow-black shadow-md gap-3"
            asChild
          >
            <Link href={"/cadastro-de-voluntarios"}>
              Cadastro de Voluntário
              <SmilePlusIcon size={20} />
            </Link>
          </Button>

          <Button
            className="w-[15rem] h-fit text-white hover:bg-transparent p-6 border shadow-black shadow-md gap-3"
            asChild
          >
            <Link href={"/voos"}>
              Listagem de Voos
              <PlaneTakeoffIcon size={20} />
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}

export default Home;