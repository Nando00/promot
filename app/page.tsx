import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="w-full h-screen bg-background flex flex-col items-center justify-center content-center ">
      <div className="space-y-6 text-center">
        {!user ? (
          <><h1 className="text-6xl font-semibold">🔐 Sign In</h1><p className="text-lg">Welcome to Pereira Solutions, Sign In Below</p></>
        ) : (
          <><h1 className="text-6xl font-semibold">Welcome {user?.firstName} 👀</h1><p className="text-lg">Welcome to Pereira Solutions Admins 🎉 You can sign out if you want </p></>
          )}
        {!user ? (
          <SignInButton>
            <Button>Sign in</Button>
          </SignInButton>
        ) : (
          <SignOutButton>
            <Button>Sign Out</Button>
          </SignOutButton>
        )}{" "}
      </div>
    </main>
  );
}
