import { createContext, useEffect, useState } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [ student, setStudent ] = useState (() => {
        const storedStudent = localStorage.getItem("student");
        return storedStudent ? JSON.parse(storedStudent) : null;
    });

    useEffect(() => {
        if(student) {
            localStorage.setItem("student", JSON.stringify(student));
        } else {
            localStorage.removeItem("student");
        }
    }, [student]);

    return (
        <StudentContext.Provider value={{ student, setStudent }}>
            { children }
        </StudentContext.Provider>
    )
}