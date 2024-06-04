import loadscript from 'load-script'
import { useState, useEffect, createRef } from 'react'
import styles from './css/SCPlayer.module.css'

export default function SCPlayer() {
  const [play, setPlay] = useState(false)
  const [player, setPlayer] = useState()
  const [trackNo, setTrackNo] = useState(0)
  const [volume, setVolume] = useState(25)
  //default set to my liked songs lol
  const [url, setUrl] = useState("https://soundcloud.com/aire9803/aire-colorfc-lilium-x7")
  const iframeRef = createRef()

  useEffect(()=>{
    //load SCWidget api
    //supports connecting, but need to load again after 1st connect for liked status
    loadscript('https://w.soundcloud.com/player/api.js', ()=>{
      //create player to iframe ref
      const player = window.SC.Widget(iframeRef.current)
      setPlayer(player)
      const{ PLAY, PAUSE, FINISH } = window.SC.Widget.Events

      //update react state from player event
      //auto forward to next track on finish
      player.bind( PLAY, ()=>{
        setPlay(true)
        player.getCurrentSoundIndex( (playerTrackNo) => {
          setTrackNo(playerTrackNo)
        })
      })

      player.bind( PAUSE, ()=>{
        player.isPaused( (paused) => {
          if (paused) setPlay(false)
        })
      })

      player.bind( FINISH, ()=>{
        player.getCurrentSoundIndex( (playerTrackNo) => {
          let list = player.getSounds()
          if ((playerTrackNo + 1) > list.length) {
            setTrackNo(playerTrackNo + 1)
            player.seekTo(0)
          }
        })
      })
    })
  },[])

  useEffect(()=>{
    //bind updated state from button
    //and player event from ispaused getter 
    //to adjust play/pause
    if (!player) return 

    player.isPaused( (paused) => {
      if (play && paused) {
        player.play()
      } else if (!play && !paused) {
        player.pause()
      }
    })
  },[play])

  const togglePlayback = () => {
    //button func
    setPlay(!play)
  }


  useEffect(()=>{
    //similar to play/pause control
    //check if trackNo match player getter track index
    //if not, skip to react state trackNo, and set to play from start
    if (!player) return 

    player.getCurrentSoundIndex( (playerTrackNo) => {            
      if (playerTrackNo !== trackNo) {
        player.skip(trackNo)
        player.seekTo(0)}
    })

  },[trackNo])

  const nextTrack = (next = true) => {
    // get list of songs from SC widget
    player.getSounds( (playerTrackList) => {      
      //next or prev
      let index = (next) ? trackNo + 1 : trackNo - 1
      //check oob, less than 0 => final track, larger than max => go back to start
      if (index < 0) index = playerTrackList.length - 1
      else if (index >= playerTrackList.length) index = 0
      setTrackNo(index)
    })
  }

  const handleVolumeChange = (e) => {
    //volume range slider
    setVolume(e.target.value)
  }
  
  useEffect(()=>{
    if (!player) return
    player.setVolume(volume);
  },[volume])

  const handleUrlSubmit = (e) =>{
    e.preventDefault();
    setUrl(document.getElementById("urlInput").value)
  }

  //src in iframe player can be adjusted according to user settings if manually maintained url.
  return (
    <div className="App">
        <iframe ref={iframeRef} title="someSC" id="sound-cloud-player" width="100%" height="160" scrolling="no" allow="autoplay" 
            src={ "https://w.soundcloud.com/player/?url=" + url + "&buying=false&auto_play=true" }>
        </iframe>
        <div className='controls'>        
          <button onClick={ () => nextTrack(false) }>{'<'}</button>
          <button onClick={ togglePlayback }>{ (play) ? 'Pause' : 'Play' }</button>
          <button onClick={ () => nextTrack(true) }>{'>'}</button>
          <p>Volume: {volume}</p>
          <input type="range" min="0" max="100" value={volume} className={styles.volumes} onChange={handleVolumeChange}></input>
          <p>enter your playlist url:</p>
            <form onSubmit={handleUrlSubmit}>
              <input placeholder="Your playlist url from soundcloud..." id="urlInput" size="50"></input>
              <input type="submit" value="Set!"/>
            </form>
        </div>
    </div>
  );
}

