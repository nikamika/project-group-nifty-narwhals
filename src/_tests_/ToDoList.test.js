import React from 'react';
import { render } from '@testing-library/react';
import ToDoList from '../components/todo/ToDoList';
import { DateTime } from 'luxon';

var todos;
const currentDay = DateTime.now().day;
const currentMonth = DateTime.now().month;
const currentYear = DateTime.now().year;

const currentDate = DateTime.fromObject({day: currentDay, month: currentMonth, year: currentYear});

function stringify(date) {
    return `${date.monthLong} ${date.day}, ${date.year}`;
} 

it('renders correctly when there are no todos', () => {

    todos = [];
    const { queryByText } = render(
        <ToDoList todos={todos} />
    )

    expect(queryByText('Nothing to do! Add a Todo below')).toBeInTheDocument();
})


it('correctly renders a todo item that is 1 day left', () => {

    const testDate = currentDate.plus({days: 1})
    todos = [{ description: 'Weekly Reading', isComplete: false, dueDate: testDate.toISODate() }];

    const { queryByText, getByText} = render(
        <ToDoList todos={todos} />
    )

    const testDateString = stringify(testDate);

    expect(getByText(`Weekly Reading Due ${testDateString} [1 day remaining]`)).toBeInTheDocument();
})

it('correctly renders a todo item that is due on the current day', () => {

    const testDate = currentDate;
    todos = [{ description: 'Weekly Reading', isComplete: false, dueDate: testDate.toISODate() }];

    const { queryByText } = render(
        <ToDoList todos={todos} />
    )

    const testDateString = stringify(testDate);
    expect(queryByText(`Weekly Reading Due ${testDateString} [today]`)).toBeInTheDocument();
})

it('correctly renders a todo that is past its due date by 2 day', () => {

    const testDate = currentDate.minus({days: 2})

    todos = [{ description: 'Weekly Reading', isComplete: false, dueDate:testDate.toISODate() }];

    const { queryByText } = render(
        <ToDoList todos={todos} />
    )

    const testDateString = stringify(testDate);
    expect(queryByText(`Weekly Reading Due ${testDateString} [2 days overdue]`)).toBeInTheDocument();
})

it('correctly renders a completed todo as checked', () => {
    todos = [{ description: 'Weekly Reading', isComplete: true, dueDate: '2022-05-10' }];

    const { queryByRole } = render(
        <ToDoList todos={todos} />
    )

    const checkbox = queryByRole('checkbox');
    expect(checkbox).toBeChecked();
})

it('correctly renders an incompleted todo as unchecked', () => {
    todos = [{ description: 'Weekly Reading', isComplete: false, dueDate: '2022-05-10' }];

    const { queryByRole } = render(
        <ToDoList todos={todos} />
    )

    const checkbox = queryByRole('checkbox');
    expect(checkbox).not.toBeChecked();
})