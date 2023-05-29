import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './styles/scrollbar.css';
import './styles/bootstrapOverride.css';
import AllRoutes from "./components/routes/AllRoutes";
import NavigationBar from "./components/navigationBar/NavigationBar";
import Container from "react-bootstrap/Container";
import MyContextProvider from "./components/context/MyContextProvider";


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

