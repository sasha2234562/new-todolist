import React, {useEffect} from "react";
import "./App.css";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {Menu} from "@mui/icons-material";
import {LinearColor} from "../components/Error-Snackbar-Origin";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {ErrorSnackbar} from "../components/Error-Snackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/login/login";
import {isInitializedTC} from "./app-reduser";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {logoutTC} from "../features/login/login-reducer";


function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppRootStateType>(state => state.app.status)
    useEffect(() => {
        dispatch(isInitializedTC())
    }, []);
    if (!isInitialized) {
        return <div>
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button
                        onClick={() => dispatch(logoutTC())}
                        color="inherit">{!isLoggedIn ? "Login" : "Logout"}</Button>
                </Toolbar>
                {status === 'loading' && <LinearColor/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404/'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
