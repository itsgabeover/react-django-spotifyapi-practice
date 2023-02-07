import { useRouteError, Link, useNavigate, Navigate } from "react-router-dom";
import React from "react";
import { Grid, Button, Typography } from "@mui/material"

export default function RoomError() {
    const error = useRouteError()
    const navigate = useNavigate()

    return (
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h4">
                    {error.message}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button
                    component={Link} 
                    color="secondary" 
                    variant="contained"
                    to="/"
                    state={{ type: "error" }}
                    >Return Home
                </Button>
            </Grid>
        </Grid>
    )
}