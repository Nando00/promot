import { auth, clerkClient, useAuth, useUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { stringify } from "querystring";
import { z } from "zod";

const prisma = new PrismaClient();

export default async function Home() {
  const { userId } = auth();
  const profile = await prisma.profile.findUnique({
    where: {
      clerkUserId: userId as string,
    },
  });
  const posts = await prisma.post.findMany();
  const prodileID = profile?.id;

  async function createPost(formData: FormData) {
    "use server";
    await prisma.post.create({
      data: {
        description: formData.get("description") as string,
        profileId: Number(prodileID),
      },
    });
    revalidatePath("/");

  }

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

        <form action={createPost} className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Post</span>
            </label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Enter Description"
              className="w-full input input-bordered"
            />
          </div>
          <div>
            <button className="btn btn-block">Submit</button>
          </div>
        </form>

        <ul>
          {posts.map(post => 
            (<li key={post.id}>{post.description}</li>)
          )}
        </ul>
      </div>
    </div>
  );
}
