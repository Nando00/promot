import { authMiddleware } from "@clerk/nextjs";
import  prisma  from "./lib/prisma"

export default authMiddleware({
  publicRoutes: ["/", "/contact"],
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 