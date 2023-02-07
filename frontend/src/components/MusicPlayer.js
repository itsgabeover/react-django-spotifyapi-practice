import React from "react";
import { Grid, Typography, Card, LinearProgress, 
  IconButton} from '@mui/material';
import { PauseCircle, PlayArrow, SkipNext } from '@mui/icons-material';

export default function MusicPlayer({ song }) {

    function skipSong() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/skip", requestOptions);
      }
    
    function pauseSong() {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/pause", requestOptions);
    }
    
    function playSong() {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/play", requestOptions);
    }

    console.log(song.is_playing)
    const songProgress = (song.time / song.duration) * 100
    return (


      <Card>
        <Grid container alignItems="center">
            <Grid item align="center" xs={4}>
              <img src={song.image_url} height="100%" width="100%" />
            </Grid>
            <Grid item align="center" xs={8}>
              <Typography component="h5" variant="h5">
                {song.title}
              </Typography>
              <Typography color="textSecondary" variant="subtitle1">
                {song.artist}
              </Typography>
              <div>
                <IconButton onClick={()=> {
                  if (song.is_playing) {
                    pauseSong()
                  } else {
                    playSong()
                  }
                }}>
                  {song.is_playing ? (<PauseCircle/>) : (<PlayArrow/>)}
                </IconButton>
                <IconButton onClick={() => skipSong()}>
                  <SkipNext/> {song.votes} / {song.votes_required}
                </IconButton>
              </div>
            </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    )
}