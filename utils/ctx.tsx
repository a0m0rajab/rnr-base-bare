import { use, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
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

    return (
        <AuthContext
            value={{
                signIn: () => {
                    // Perform sign-in logic here
                    setSession("xxx");
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}
        >
            {children}
        </AuthContext>
    );
}
