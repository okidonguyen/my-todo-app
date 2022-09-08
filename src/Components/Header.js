import React from "react";
import "./App.css";

class Header extends React.Component{
    render(){
        return(
            <header className="header-container">
                <h1 className="header-tittle">Simple Todo App</h1>
            </header>
        )
    }
}

export default Header;