import { DefaultSession, DefaultUser, Profile } from "next-auth";
import { GoogleProfile } from "next-auth/providers/google";

declare module "next-auth" {

    interface Session{
        user: {
            id: string;
        } & DefaultSession["user"]
    }

    interface user extends DefaultUser {
        id: string;
    }

    interface Profile extends GoogleProfile { }
}
