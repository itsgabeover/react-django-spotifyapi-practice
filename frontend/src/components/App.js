import React, { useState } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Outlet,
    redirect,
  } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import HomePage from "./HomePage";
import { checkUserInRoomLoader } from "./HomePage";
import Room, { getRoomLoader } from "./Room";
import RoomError from "./RoomError";
import RoomJoinPage from "./RoomJoinPage";

//// const [roomCode, setRoomCode] = useState("")

const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route 
        index 
        element={<HomePage />}
        loader={checkUserInRoomLoader}
      />
      <Route path="join" element={<RoomJoinPage />} />
      <Route path="create" element={<CreateRoomPage />} />
      <Route 
        path="room/:roomCode" 
        element={<Room />}
        loader={getRoomLoader}
        //errorElement={<RoomError />}
       />
    </Route>
    
  ));

export default function App() {
    return (
      <div className="center">
        <RouterProvider router={router}/>
      </div> 
    );
  }


/*
export default class App extends Component {
    constructor(props) {
        super(props);
    }  

    render() {
        return (
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<HomePage/>}></Route>
              <Route path="/join" element={<RoomJoinPage />} />
              <Route path="/create" element={<CreateRoomPage />} />
            </Routes>
          </BrowserRouter>
        );
      }
}



const appDiv = document.getElementById("app");
render(<App />, appDiv);

*/