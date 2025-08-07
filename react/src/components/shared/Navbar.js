import img from "../../images/vibinWhite.png";
import { Link, useLocation } from 'react-router-dom';
import { useState } from "react";
import Hamburger from 'hamburger-react';

const style = {
    
    main:{
        backgroundColor: "#5D14F8",
    },
    //except home
    main2:{
        backgroundColor: "#f4f2f2",
    },
    wrapper:{
        display: "grid",
        gridTemplateColumns: "auto  auto",
        justifyContent: "space-between",
    },
         
    logo:{
        display: "inline-grid",
        gridTemplateAreas: "'left topRight' 'left topBttom'" ,
        gridGap: "4px",
        alignItems: "center",
    },
    img:{
        width: "auto",
        height: "48px",
        gridArea: "left",
    },
    img2:{
        width: "auto",
        height: "48px",
        gridArea: "left",
        filter: "invert(2)",
    },
    h1:{
        color: "#ffffff",
        gridArea: "topRight",
        margin: "0",
        padding: "5px 2px 0 2px",
    },
    h:{
        color: "black",
        gridArea: "topRight",
        margin: "0",
        padding: "5px 2px 0 2px",
    },
    p:{
        color: "#ffffff",
        gridArea: "topBttom",
        margin: "0",
        padding: "0px 2px 5px 2px",
    },
    p2:{
        color: "black",
        gridArea: "topBttom",
        margin: "0",
        padding: "0px 2px 5px 2px",
    }
};
const Navbar = (props) =>{
    const location = useLocation();

    const handleOnCLick = (link) => () =>{
        if(link === "/")
            props.set("purple");
        else
            props.set("white");
            setActive(link);
    }

    const [isOpen, setOpen] = useState(false)
    const [active,setActive] = useState(location.pathname);

    
    return (
        <nav style={ props.type === "purple" ? style.main : style.main2 }>
            <div style={style.wrapper} className="wrapper">
                <div style={style.logo}>
                    <img src={img} alt="Vibin logo" style={  props.type === "purple" ? style.img : style.img2 }></img>
                    <h1 style={ props.type === "purple" ? style.h1 : style.h}>Vibin</h1>
                    <p style={ props.type === "purple" ? style.p : style.p2}>Be the vibe</p>
                </div>
                <div className={ isOpen === false ? "links" : "links open" }>
                    <Link to="/" onClick={handleOnCLick("/")} className={ active === "/" ? props.type === "purple" ? "activeStyle2" : "activeStyle" : "inactiveStyle2"} >Home</Link>
                    <Link to="/about" onClick={handleOnCLick("/about")}  className={ active === "/about" ? "activeStyle" : props.type === "purple" ? "inactiveStyle" : "inactiveStyle2" } >About</Link>

                    <Link to="/blogs" onClick={handleOnCLick("/blogs")}  className={ active.includes("/blogs") ? "activeStyle" : props.type === "purple" ? "inactiveStyle" : "inactiveStyle2" }>Blogs</Link>
                    <Link to="/contact" onClick={handleOnCLick("/contact")}  className={ active === "/contact" ? "activeStyle" : props.type === "purple" ? "inactiveStyle" : "inactiveStyle2" }>Contact</Link>

                </div>
                <div className="ham">
                    <Hamburger color={ props.type === "purple" ? "#ffffff" : "black"} onToggle={toggled => {
                            if (toggled) {
                                setOpen(true);
                            } else {
                                setOpen(false);
                            }
                        }} />
                </div>
            </div>
        </nav>
    );
  }
  
  export default Navbar;
  