import { use, createContext, type PropsWithChildren, useEffect } from "react";
import { useStorageState } from "./useStorageState";
import { supabase } from "./supabase";
import type { Session } from "@supabase/supabase-js";
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';

const AuthContext = createContext<{
    signIn: (email: string, password: string) => Promise<{ error?: string }>;
    signUp: (email: string, password: string) => Promise<{ error?: string }>;
    signInWithApple: () => Promise<{ error?: string }>;
    signOut: () => Promise<void>;
    session?: Session | null;
    isLoading: boolean;
}>({
    signIn: async () => ({ error: "Not implemented" }),
    signUp: async () => ({ error: "Not implemented" }),
    signInWithApple: async () => ({ error: "Not implemented" }),
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
                signInWithApple: async () => {
                    if (Platform.OS !== 'ios') {
                        return { error: 'Apple Sign In is only available on iOS devices' };
                    }

                    try {
                        const credential = await AppleAuthentication.signInAsync({
                            requestedScopes: [
                                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                            ],
                        });

                        if (credential.identityToken) {
                            const { error } = await supabase.auth.signInWithIdToken({
                                provider: 'apple',
                                token: credential.identityToken,
                            });
                            return { error: error?.message };
                        } else {
                            return { error: 'No identity token received from Apple' };
                        }
                    } catch (e: any) {
                        if (e.code === 'ERR_REQUEST_CANCELED') {
                            return { error: 'Apple Sign In was canceled' };
                        }
                        return { error: e.message || 'Apple Sign In failed' };
                    }
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
