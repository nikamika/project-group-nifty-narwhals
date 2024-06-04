import React from "react";
import styles from './css/ToDoList.module.css';
import { BsXSquare } from 'react-icons/bs';
import { DateTime } from "luxon";

const currentDay = DateTime.now().day;
const currentMonth = DateTime.now().month;
const currentYear = DateTime.now().year;

const currentDate = DateTime.fromObject({day: currentDay, month: currentMonth, year: currentYear});

function ToDoList({ todos, onTodoStatusChanged, onDeleteItem }) {

    // Map each todo as a list item with a checkbox and due label
    return (
        <div>
            <ul className="todo-list text-center me-3">
                {todos && todos.length > 0 ?
                    todos.map((todo, index) =>
                        <li key={index}>
                            <input className="mt-2 me-1" type='checkbox' value={todo.description} checked={todo.isComplete}
                                onChange={() => onTodoStatusChanged(index, todo.isComplete)} />
                            {/* Figure out if the todo item is complete or not, and if not, whether it is overdue or not */}
                            <label className={todo.isComplete ? styles.complete : isOverdue(todo) ? styles.overdue : styles.incomplete}>
                                {buildLabel(todo)}
                            </label>
                            <BsXSquare className="mt-1 ms-1" onClick={() => onDeleteItem(index)}>X</BsXSquare>
                        </li>) :
                    <p className="text-center mt-2">Nothing to do! Add a Todo below</p>}
            </ul>
        </div>
    );
}

/*
Calculates the difference between the current date and the due date
If the item is overdue, the result will be negative
The result is rounded down to the nearest integer
*/
function calcDifference(date1, date2) {
    var end = DateTime.fromISO(date1);
    var start = DateTime.fromISO(date2);

    var diffInDays = end.diff(start, 'days').toObject()
    return diffInDays.days;
}
// Formats the difference into a positive integer
function formattedDifference(difference) {
    return Math.abs(difference);
}

// Returns date into string form [Month Day, Year]
function stringify(date) {
    return `${date.monthLong} ${date.day}, ${date.year}`;
}

// Determine if the todo is overdue
function isOverdue(todo) {
    const difference = calcDifference(todo.dueDate, currentDate)
    if (difference < 0) {
        return true;
    } else {
        return false;
    }
}

/*
Builds the todo list item label.
The label consists of the todo description, and if it is yet to be completed, the due date.
The number of days between the current date and defined due date are also displayed based 
on the status of the todo.
*/
function buildLabel(todo) {

    const description = todo.description;
    const date = DateTime.fromISO(todo.dueDate);
    const difference = calcDifference(date, currentDate);
    const isComplete = todo.isComplete;
    const overdue = isOverdue(todo)
    let labelEnd;

    if (isComplete) {
        return description
    } else if (overdue) {
        labelEnd = `[${formattedDifference(difference)} days overdue]`
    } else if (difference === 0) {
        labelEnd = '[today]'
    } else if (difference > 1) {
        labelEnd = `[${difference} days remaining]`
    } else {
        labelEnd = '[1 day remaining]'
    }
    return `${description} Due ${stringify(date)} ${labelEnd}`
}


export default ToDoList;