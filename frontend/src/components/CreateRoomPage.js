import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Grid, Typography, TextField, FormHelperText, Alert, 
    FormControl, FormControlLabel, RadioGroup, Radio, Collapse } from "@mui/material"

CreateRoomPage.defaultProps = {
    votesToSkip: 3,
    guestCanPause: true,
    update: false,
    roomCode: null
    }
    // update={true} 
    // votesToSkip={room.votes_to_skip} 
    // guestCanPause={room.guest_can_pause} 
    // roomCode={room.code}
    // room={room}
    // callback={reloadData}
export default function CreateRoomPage({
    votesToSkip, 
    guestCanPause, 
    callback,
    update,
    }) {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")  
    const [successMessage, setSuccessMessage] = useState("")  
    const [voteSkip, setVoteSkip] = useState(votesToSkip)  
    const [guestPause, setGuestPause] = useState(guestCanPause)  
    let { roomCode } = useParams()
   
    function handleRoomButtonClick() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: voteSkip,
                guest_can_pause: guestPause
            }),
        };
        fetch('api/create-room', requestOptions)
        .then((resp) => resp.json())
        .then((data) => navigate("/room/" + data.code))
    }
    function renderCreateButtons() {
        return (
            <>
            <Grid item xs={12} align="center">
                <Button 
                color="primary" 
                variant="contained" 
                onClick={handleRoomButtonClick}>
                    Create A Room
                </Button>
            </Grid>
                <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" component={Link} to="/">
                    Back
                </Button>
            </Grid>
            </>
        )

    }
    function renderUpdateButtons() {
        return (
            <Grid item xs={12} align="center">
                <Button 
                color="primary" 
                variant="contained" 
                onClick={handleUpdateButtonClick}>
                    Update Room
                </Button>
            </Grid>
        )
    }
    function handleUpdateButtonClick() {

        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: voteSkip,
                guest_can_pause: guestPause,
                code: roomCode,
            }),
        };
        fetch('/api/update-room', requestOptions)
        .then((res) => {
            if (res.ok) {
                setSuccessMessage("Room updated!")
                callback(roomCode)
            } else {
                setErrorMessage("Room failed to update...")
            }
        })

    }

    const title = update ? "Update Room" : "Create a Room"
    return (
        <>
        <Grid item xs={12} align="center">
        <Collapse
            in={errorMessage != "" || successMessage != ""}
          >
            {successMessage != "" ? (
              <Alert
                severity="success"
                onClose={() => {
                  setSuccessMessage("");
                }}
              >
                {successMessage}
              </Alert>
            ) : (
              <Alert
                severity="error"
                onClose={() => {
                  setErrorMessage("");
                }}
              >
                {errorMessage}
              </Alert>
            )}
          </Collapse>
        </Grid>
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText >
                        <div align='center'>
                            Guest Control of Playback State 
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue={guestPause} onChange={(e) => setGuestPause(e.target.value)}>
                        <FormControlLabel 
                            value="true" 
                            control={<Radio color="primary"/>}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel 
                            value="false" 
                            control={<Radio color="secondary"/>}
                            label="No Control"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type="number" 
                    defaultValue={voteSkip}
                    inputProps={{ 
                        min: 1, 
                        style: { textAlign: "center" },
                    }}
                    onChange={(e) => setVoteSkip(e.target.value)}
                    />
                    <FormHelperText>
                        <div align="center">
                            Votes Required To Skip Song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            {update ? renderUpdateButtons() : renderCreateButtons()}
        </Grid>
        </>
    );
}