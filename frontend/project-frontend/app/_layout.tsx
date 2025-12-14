import {Slot} from "expo-router"
import {AuthProvider} from "../context/auth-context.js"
import { QuestionProvider } from "@/context/question-context.js";
export default function RootLayout(){
    return (
    <AuthProvider>
        <QuestionProvider>
        <Slot/>
        </QuestionProvider>
    </AuthProvider>
    );
}