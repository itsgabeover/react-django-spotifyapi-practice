import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, redirect, useLoaderData, useRouteError } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material"
import CreateRoomPage from "./CreateRoomPage"
import MusicPlayer from "./MusicPlayer";

export default function Room(props){
    const [showSettings, setShowSettings] = useState(false) 
    const navigate = useNavigate()
    const loadedRoom = useLoaderData() 
    const [isHost, setIsHost] = useState(false) 
    const [voteSkip, setVoteSkip] = useState(2)  
    const [guestPause, setGuestPause] = useState(false)
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false) 
    const [song, setSong] = useState({})
    let { roomCode } = useParams()

    

    useEffect(() => {
        
        let interval = setInterval(() => getCurrentSong(), 1000)
        return (() => clearInterval(interval))
    },[song])
    
    async function handleLeaveRoom(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
        const response = await fetch('/api/leave-room', requestOptions)
        if (response.ok) {
            navigate("/")
        }
    }
    
    function renderSettingsButton(){
        return (
            <Grid item xs={12} align="center">
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => setShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        )
    }
    function renderSettings() {
        return (
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <CreateRoomPage 
                        update={true} 
                        votesToSkip={voteSkip} 
                        guestCanPause={guestPause} 
                        callback={reloadData}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                    color="secondary" 
                    variant="contained" 
                    onClick={() => setShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
    }
    
    function reloadData(roomCode) {
        console.log("reload data function starting")
        fetch('/api/get-room' +'?code=' + roomCode)
        .then((res) => res.json())
        .then((data) => {
            setVoteSkip(data.votes_to_skip)
            setGuestPause(data.guest_can_pause)
            setIsHost(data.is_host)
            if (data.is_host) {
                authenticateSpotify()
            }
        })
    
    }
    
    function authenticateSpotify() {
        fetch('/spotify/is-authenticated').then((res) => res.json()).then((data) => {
            setSpotifyAuthenticated(data.status)
            if (!data.status){
                fetch('/spotify/get-auth-url').then((res) => res.json()).then((data) => {
                    window.location.replace(data.url)
                })
            }
        })
    }

    function getCurrentSong(){
        fetch('/spotify/current-song').then((res) => {
            if (!res.ok){
                setSong({})
                return {}
            } else {
                return res.json()
            }
        }).then((data) => {
            setSong(data)
            console.log(data)
        })
    }
    console.log(song)
    if (showSettings) {
        return renderSettings()
    } 
    return (
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h4">
                    Code: {loadedRoom.code}
                </Typography>
            </Grid>
            { Object.keys(song).length === 0 ? <Grid item xs={12}><Typography align="center" variant="h4" component="h4">Loading</Typography></Grid> : <MusicPlayer song={song} />}
            {loadedRoom.is_host ? renderSettingsButton() : null}
            <Grid item xs={12}>
                <Button color="secondary" variant="contained" onClick={handleLeaveRoom}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>

    )
}


export const getRoomLoader = async ({ params }) => {
    let { roomCode } = params

    const res = await fetch('/api/get-room' +'?code=' + roomCode)
    if (res.ok) {
        console.log("about to run authenticateSpotify")
        fetch('/spotify/is-authenticated').then((res) => res.json()).then((data) => {
            if (!data.is_host){
                return res.json()
            } else {
                if (!data.status){
                fetch('/spotify/get-auth-url').then((res) => res.json()).then((data) => {
                    window.location.replace(data.url)
                })}
            }
        })
    }
    // if (!res.ok) {
    //     throw Error('Room not available')
    //   }
    
    return res.json()
}