import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MyProfilePage() {
  const user = await currentUser();
  
  if (!user?.username) {
    redirect("/sign-in");
  }
  
  redirect(`/user/${user.username}`);
}
