import React, { useState } from "react";
import Button from "react-bootstrap/Button"

function Fullscreen() {
  //Setting state for toggle button
  const [fullscreen, setFullscreen] = useState(false);

  // Closing function
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    setFullscreen(false)
  }

  // Opening function
  const openFullscreen = () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    setFullscreen(true)
  }

  //toggles between functions based on state
  const fullscreenToggle = () => {
    fullscreen === true ? closeFullscreen() : openFullscreen()
  }
  return <Button variant="info" className="m-1" onClick={fullscreenToggle}><i className="bi bi-arrows-fullscreen"></i></Button>
}

export default Fullscreen;
