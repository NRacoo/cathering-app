
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      fullname: string;
      role: "admin" | "member" | string;
    };
  }

  interface User {
    email: string;
    fullname: string;
    role: "admin" | "member" | string;
  }
}
