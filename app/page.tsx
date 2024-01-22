import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { stringify } from "querystring";

export default async function Home() {
  return (
    <main className="h-full bg-background flex flex-col items-center justify-center  ">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold">🔐 Sign In</h1>
        <p className="text-lg">Welcome to Pereira Solutions, Sign In!</p>
      </div>
    </main>
  );
}
