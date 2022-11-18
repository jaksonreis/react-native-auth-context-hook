import React, { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../services/auth";
import AsyncStorage from '@react-native-community/async-storage'
//import api from "../services/api";

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(): Promise<void>;
    signOut(): void;
    loading: boolean;
}
interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {

            const storageUser = await AsyncStorage.getItem('@RNAuth:user');
            const storageToken = await AsyncStorage.getItem('@RNAuth:token');

            //api.defaults.headers.common['Authorization'] =  `Bearer ${storageToken}`;

            //await new Promise(resolve => setTimeout(resolve, 2000));

            if (!!storageUser && !!storageToken) {
                setUser(JSON.parse(storageUser));
            }
            setLoading(false);
        }
        loadStorageData();
    }, [])


     async function signIn() {
        setLoading(true);
        auth.signIn().then( async (response)=>{

        setUser(response.user);

        setLoading(false);

        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@RNAuth:token', response.token);
            
        });


        //api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
    }

    async function signOut() {
        await AsyncStorage.removeItem('@RNAuth:user');
        await AsyncStorage.removeItem('@RNAuth:token');

        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}