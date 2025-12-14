import { createContext,useState } from "react";
export const QuestionContext = createContext();

export const QuestionProvider = ({children}) => {
    const [Question,SetQuestion] = useState(null);
    const SetUserQuestion = (q) => {
        SetQuestion(q)
    }
   
    return (
        <QuestionContext.Provider
        value={{Question,SetUserQuestion}}>
            {children}
    </QuestionContext.Provider>
)
}