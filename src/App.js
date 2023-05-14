import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './styles/scrollbar.css';
import AllRoutes from "./components/Routes/AllRoutes";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Container from "react-bootstrap/Container";
import MyContextProvider from "./components/Context/MyContextProvider";


function App() {
    return (
        <div className="App">

            <MyContextProvider>

                <NavigationBar/>

                <Container>
                    <AllRoutes/>
                </Container>

            </MyContextProvider>

        </div>
    );
}
export default App;

