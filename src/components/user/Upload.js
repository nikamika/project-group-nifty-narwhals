import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { db, storage } from "../../firebase"
import Button from "react-bootstrap/Button"
import ProgressBar from "react-bootstrap/ProgressBar"

const Upload = () => {

    // get user from context
    const { user } = useAuth()

    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)

    // get the input image file
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    // upload image
    const handleUpload = () => {
        // upload image to folder "images"
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            snapshot => {
                const percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100
                setProgress(percentage) // track uploading process
            },
            error => { console.log("Error uploading image: ", error) },
            () => {
                // get the image url once upload complete
                storage.ref("images").child(image.name).getDownloadURL().then((url) => {
                    setUrl(url)
                    // update the user imageURL in the db
                    if (user) {
                        db.collection("users").doc(user.uid).update({
                            imageURL: url
                        }).catch((error) => {
                            console.error("Error updating imageURL: ", error)
                        })
                    }
                    alert("Upload complete!")
                    window.location.reload(true)
                })
            })
    }

    return <div>
        <input type="file" accept="image/*" onChange={handleChange} />
        {image && <>
            <Button className="m-1" onClick={handleUpload}>Upload Image</Button>
            <ProgressBar animated now={progress} />
        </>}
    </div>
}

export default Upload