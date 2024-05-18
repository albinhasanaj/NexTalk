// types/next-auth.d.ts

import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
    /**
     * Extending the built-in session types to include user ID.
     */
    interface Session {
        user?: DefaultSession["user"] & { id?: string };
    }

    /**
     * Extending the built-in JWT types to include user ID.
     */
    interface JWT {
        id?: string;
    }
}
