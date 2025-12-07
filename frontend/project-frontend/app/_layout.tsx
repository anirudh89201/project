import {Slot} from "expo-router"
import {AuthProvider} from "../context/auth-context.js"
export default function RootLayout(){
    return (
    <AuthProvider>
        <Slot/>
    </AuthProvider>
    );
}