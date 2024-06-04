import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

// app modules
import ModulePopUp from "./ModulePopUp";
import ToDoList from "../todo/ToDoList";
import AddToDo from "../todo/AddToDo";
import Clock from "../Timer/Clock";
import Vplayer from "../video/Vplayer";
import SCPlayer from "../SC/SCPlayer";
import Weather from "../weather/Weather";

function Toolbar() {
    const { todos, onTodoStatusChanged, onAddItem, onDeleteItem } = useContext(AppContext);

    // Array representing toolbar buttons
    const toolbarItems = [
        {
            name: "Todo",
            iconClassName: "bi bi-list-task",
            isOpen: false, content:
                <div>
                    <ToDoList todos={todos}
                        onTodoStatusChanged={onTodoStatusChanged}
                        onDeleteItem={onDeleteItem} />
                    <AddToDo onAddItem={onAddItem} />
                </div>,
            positionLeft: window.screen.availWidth * -0.29,
            positionBottom: window.screen.availHeight * 0.1
        },
        {
            name: "Clock",
            iconClassName: "bi bi-clock",
            isOpen: false, content: <Clock />,
            positionLeft: window.screen.availWidth * 0.02,
            positionBottom: window.screen.availHeight * 0.1
        },
        {
            name: "Weather",
            content: <Weather />,
            iconClassName: "bi bi-brightness-high",
            isOpen: false,
            positionLeft: window.screen.availWidth * 0.32,
            positionBottom: window.screen.availHeight * 0.02
        },
        {
            name: "Video",
            iconClassName: "bi bi-play-btn-fill",
            isOpen: false, content: <Vplayer />,
            positionLeft: window.screen.availWidth * 0.2,
            positionBottom: window.screen.availHeight * -0.03
        },
        {
            name: "Music",
            content: <SCPlayer />,
            iconClassName: "bi bi-music-note-beamed",
            isOpen: false,
            positionLeft: window.screen.availWidth * -0.2,
            positionBottom: window.screen.availHeight * 0.07
        },
        {
            name: "Clean up",
            iconClassName: "bi bi-stars"
        }

    ]

    return (
        <div className="toolbar">
            <div className="content">
                <ul className="modules">
                    {toolbarItems.map((tbItem, index) => (
                        <li className="module" key={index}>
                            <ModulePopUp item={tbItem} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Toolbar;
