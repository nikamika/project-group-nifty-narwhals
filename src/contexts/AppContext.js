import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";

export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {

    // get user from context
    const { user } = useAuth()
    const key = 'todos'
    const initialValue = []

    // Helper function to parse date strings back into proper JavaScript dates
    // Source: https://weblog.west-wind.com/posts/2014/jan/06/javascript-json-date-parsing-and-real-dates
    if (window.JSON && !window.JSON.dateParser) {
        var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        var reMsAjax = /^\/Date\((d|-|.*)\)[|\\]$/;

        JSON.dateParser = function (key, value) {
            if (typeof value === 'string') {
                var a = reISO.exec(value);
                if (a)
                    return new Date(value);
                a = reMsAjax.exec(value);
                if (a) {
                    var b = a[1].split(/[-+,.]/);
                    return new Date(b[0] ? +b[0] : 0 - +b[1]);
                }
            }
            return value;
        };
    }

    const [todos, setTodos] = useState(() => {
        if (user == null) { // if user is not logged in, fetch local data 
            try {
                retrieveLocalData();
            } catch {
                console.error("fectching from local storage failed")
                return initialValue;
            }
        } else {
            return [];
        }
    });

    // get existing initial todos if logged in
    useEffect(() => {
        if (user) {
            setTodos([]) // clear todos 
            db.collection("users").doc(user.uid).get().then((doc) => {
                if (doc.data()) {
                    let initialTodos = doc.data().todos
                    initialTodos.forEach(todo => {
                        todo.dueDate = todo.dueDate.toDate() // convert timestamp to data object
                    })
                    setTodos(initialTodos)
                }
            }).catch((error) => {
                console.error("Error getting todos: ", error)
            })
        } else {
            setTodos(retrieveLocalData()) // clear synced todos when not logged in and replace with local data 
            
        }
    }, [user])

    useEffect(() => {
        if (user == null){ // only add to local storage if user is not logged in
            window.localStorage.setItem(key, JSON.stringify(todos));
        }
    }, [key, todos, setTodos]);

    function retrieveLocalData() {
        const data = window.localStorage.getItem(key);
        return data ? JSON.parse(data, JSON.dateParser) : initialValue;
    }

    function onTodoStatusChanged(index, status) {
        const todo = todos[index];
        todo.isComplete = !status;
        const newTodos = [...todos];
        newTodos[index] = todo;
        setTodos(newTodos);
        syncTodos(newTodos);
    }

    function onAddItem(data) {
        // Get input values
        var newItem = data.newItem;
        var date = data.dueDate;
      
        // Create the new to-do object
        const newToDo = { description: newItem, isComplete: false, dueDate: date };

        // Add it to the list and set state
        const newTodos = [...todos, newToDo];
        setTodos(newTodos);
        syncTodos(newTodos);
    }

    function onDeleteItem(index) {
        // remove the todo by index
        const newToDos = [...todos]
        newToDos.splice(index, 1)
        setTodos(newToDos)
        syncTodos(newToDos)
    }

    // sync todos in the db if logged in
    function syncTodos(newTodos) {
        if (user) {
            const todoField = { todos: newTodos }
            db.collection("users").doc(user.uid).update(todoField).catch((error) => {
                console.error("Error syncing todos: ", error)
            })
        }
    }

    const context = {
        todos, onTodoStatusChanged, onAddItem, onDeleteItem
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}

