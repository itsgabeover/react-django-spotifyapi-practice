import React, { useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography } from '@mui/material';
import { Link, Navigate, redirect, useLoaderData, useLocation, useNavigate } from "react-router-dom";


export default function HomePage(props) {
    const navigate = useNavigate()
    const room = useLoaderData()
    // if (useLocation() !== null)
    const location = useLocation()
    // const location = useLocation()
    //let room = props.roomCode
    //props.setRoomCode(roomData.code) && location.state.type !== "error"

    useEffect(() => {
        console.log(location)
        if (location == null && room.code !== null) {
            return navigate("/room/" + room.code) 
        } else if (room.code !== null && location != null) {
            return navigate("/room/" + room.code) 
        }
        return console.log("do nothing")
      }, []);
    

    return (
        <Grid container align="center" spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3" compact="h3">
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/join" component={Link}>
                        Join a Room
                    </Button>
                    <Button color="secondary" to="/create" component={Link}>
                        Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
        );
    
}

export const checkUserInRoomLoader = async () => {
    const res = await fetch('/api/user-in-room')
    if (!res.ok) {
        console.log('session deleted')
    } 
    if (res.ok) {
        console.log("session still exists")
    }
    return res.json()
}