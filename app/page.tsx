import { auth, clerkClient, useAuth, useUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { stringify } from "querystring";
import prisma from "../lib/prisma"

export default async function Home() {
  const { userId } = auth();
  const profile = await prisma.profile.findUnique({
    where: {
      clerkUserId: userId as string,
    },
  });


  return (
    <div className="h-screen bg-[#14213d] flex place-content-center content-center">
      <div className="flex flex-col place-content-center ">
        <h1>Hello Welcome to Pereira Solutions LLC Admin</h1>
        <button
          className="bg-[#ffb703] w-[100px] h-[30px] rounded ml-auto mr-auto mt-2"
          type="button"
        >
          Fetch data
        </button>


      </div>
    </div>
  );
}
