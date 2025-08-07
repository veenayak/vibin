import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Record from './components/blog/Record';

import React, { useEffect, useState } from 'react';
import { Route, Switch ,useLocation } from 'react-router-dom';

import  "./index.css";
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Blog from './components/shared/Blog';
import NotFound from './components/shared/NotFound';

const App = () =>{
  const location = useLocation();
  const [nav,setNav] = useState("");
  const handleOnScroll = () =>{
    const scrollTop = document.getElementById("main").scrollTop;
    if(scrollTop === 0 && location.pathname === "/" && nav !== "purple"){
      setNav("purple");
    }
    else{
      setNav("white");
    }
  }
  useEffect(() =>{
    if(location.pathname === "/"){
      setNav("purple");
    }
    else{
      setNav("white");
    }
  },[]);
  return(
    <div  id={location.pathname.includes("/blogs") ? "main2" :  "main"} onScroll={location.pathname === "/" ? handleOnScroll : null}>
      <Navbar type={nav} set={setNav}/>
      <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} exact/>
          <Route path="/contact" component={Contact} exact/>
          <Route path="/blogs" component={Record} exact/>
          <Route path="/blogs/musicology" component={Record} exact/>
          <Route path="/blogs/people-and-culture" component={Record} exact/>
          <Route path="/blogs/musicology/:title" component={Blog} exact/>
          <Route path="/blogs/people-and-culture/:title" component={Blog} exact/>

          <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );  
}

export default App;
