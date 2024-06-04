import React from 'react';
import { render } from '@testing-library/react';
import ModulePopUp from '../components/toolbar/ModulePopUp';
import ToDoList from '../components/todo/ToDoList';
import AddToDo from '../components/todo/AddToDo';
import Clock from '../components/Timer/Clock';
import Vplayer from '../components/video/Vplayer';
import SCPlayer from '../components/SC/SCPlayer';
import Weather from '../components/weather/Weather';

it('Todo app module should display', () => {
    const { queryByText, getByRole } = render(<ModulePopUp item={{
        name: "Todo",
        iconClassName: "bi bi-list-task",
        isOpen: false, content:
            <div>
                <ToDoList />
                <AddToDo />
            </div>
    }} />)
    expect(queryByText('Todo')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
})

it('Clock app module should display', () => {
    const { queryByText, getByRole } = render(<ModulePopUp item={{
        name: "Clock",
        iconClassName: "bi bi-clock",
        isOpen: false, content: <Clock />
    }} />)
    expect(queryByText('Clock')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
})

it('Weather app module should display', () => {
    const { queryByText, getByRole } = render(<ModulePopUp item={{
        name: "Weather",
        content: <Weather />,
        iconClassName: "bi bi-brightness-high",
        isOpen: false
    }} />)
    expect(queryByText('Weather')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
})

it('Video app module should display', () => {
    const { queryByText, getByRole } = render(<ModulePopUp item={{
        name: "Video",
        iconClassName: "bi bi-play-btn-fill",
        isOpen: false, content: <Vplayer />
    }} />)
    expect(queryByText('Video')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
})

it('Music app module should display', () => {
    const { queryByText, getByRole } = render(<ModulePopUp item={{
        name: "Music",
        content: <SCPlayer />,
        iconClassName: "bi bi-music-note-beamed",
        isOpen: false
    }} />)
    expect(queryByText('Music')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
})

it('Cleanup app module should display', () => {
    const { queryByText, getByRole } = render(<ModulePopUp item={{
        name: "Clean up",
        iconClassName: "bi bi-stars"
    }} />)
    expect(queryByText('Clean up')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
})