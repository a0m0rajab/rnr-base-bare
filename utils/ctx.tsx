import { use, createContext, type PropsWithChildren, useEffect } from "react";
import { useStorageState } from "./useStorageState";
import { supabase } from "./supabase";
import type { Session } from "@supabase/supabase-js";

const AuthContext = createContext<{
    signIn: (email: string, password: string) => Promise<{ error?: string }>;
    signUp: (email: string, password: string) => Promise<{ error?: string }>;
    signOut: () => Promise<void>;
    session?: Session | null;
    isLoading: boolean;
}>({
    signIn: async () => ({ error: "Not implemented" }),
    signUp: async () => ({ error: "Not implemented" }),
    signOut: async () => { },
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = use(AuthContext);
    if (!value) {
        throw new Error("useSession must be wrapped in a <SessionProvider />");
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session ? JSON.stringify(session) : null);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session ? JSON.stringify(session) : null);
            }
        );

        return () => subscription.unsubscribe();
    }, [setSession]);

    const parsedSession = session ? JSON.parse(session) : null;

    return (
        <AuthContext
            value={{
                signIn: async (email: string, password: string) => {
                    const { error } = await supabase.auth.signInWithPassword({
                        email,
                        password,
                    });
                    return { error: error?.message };
                },
                signUp: async (email: string, password: string) => {
                    const { error } = await supabase.auth.signUp({
                        email,
                        password,
                    });
                    return { error: error?.message };
                },
                signOut: async () => {
                    await supabase.auth.signOut();
                },
                session: parsedSession,
                isLoading,
            }}
        >
            {children}
        </AuthContext>
    );
}
