import { useEffect, useState } from 'react';
import axios from 'axios';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import MetaTags from 'react-meta-tags';

// import {MdSearch} from "react-icons/md"
import { Link, Route, Switch ,useLocation } from 'react-router-dom';
import All from "./All";
import Musicology from "./Musicology";
import PeopleAndCulture from "./PeopleAndCulture";
const style= {
    mainImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover" 
    },
    img: {
        width: "360px",
        height: "240px",
        objectFit: "cover" 
    },
    blogSection1: {
        minHeight: "calc(100vh - 91px)",
        background: "rgb(244, 242, 242)"
    },
    caroDiv: {
        height: "360px",
    },
    span: {
        padding: "12px 18px",
        display: "inline-block",
        color: "#797979",
        active:{
            color: "rgb(66, 61, 161)",
            textDecoration: "none",
            padding: "12px 18px",
            borderRadius: "2px",
            borderBottom: "4px solid rgb(66, 61, 161)",
        }
    },
    
    searchDiv:{
        display: "inline-grid",
        gridTemplateColumns: "auto auto",
        marginTop: "18px",
    },
    button:{
        marginLeft: "4px",
        padding: "4px 12px",
        display: "flex",
        alignItems: "center",
    },
    blogs: {
        padding: "12px 18px",
    },
    title:{

    },

}

const Record = () => {
    const [data,setData] = useState([]);
    const location = useLocation();

    const [active,setActive] = useState(location.pathname);
    
    const fetchBlogs = () =>{
        axios.post('/blogs/fetch',{views : true})
        .then(res => {
            if(res.data.status === 200){
                let arr = res.data.data;
                console.log(arr);
                setData(arr);
            }
            else{
                console.log(res);
            }
        })
        .catch(rejected => {
            alert("There is sonething wrong. Please try again later.","alert show","!success");
        });
    }

    useEffect(async (data) => {
        await fetchBlogs();
    },[]);



    const handleOnCLick = (link) => () =>{

        setActive(link);
    }
    return (
        <div style={style.blogSection1}>
            <MetaTags>
                <title>Blogs: Listen to music share &amp; collaborate with friends on app for free</title>
                <meta name="description" content="" />
            </MetaTags>
            <div>
                {console.log(data.length)}
                <Carousel autoPlay={data.length <= 1 ? false : true} infiniteLoop={data.length <= 1 ? false : true} stopOnHover={true} autoFocus={true}>
                    {
                        data.length === 0 ? 
                            <div style={style.caroDiv}>
                                <p className="legend">
                                    No Blogs to display
                                </p>
                            </div>
                        :data.map((item,index) => 
                            <div style={style.caroDiv} key={index}>
                                <img src={item.mainImage} style={style.mainImage}/>
                                <p className="legend">
                                    {item.title}
                                </p>
                            </div>
                        ) 
                    }
                </Carousel>
                <div className="wrapper" style={{textAlign: "center",}}>
                    {/* <div style={style.searchDiv}>
                        <input type="text" placeholder="search blogs"></input>               
                        <button style={style.button}><MdSearch size={16}/></button>
                    </div> */}
                    
                    <div className="blogType">
                        <Link to="/blogs" onClick={handleOnCLick("/blogs")} style={active === "/blogs" ? style.span.active : style.span} >All</Link>
                        <Link to="/blogs/musicology" onClick={handleOnCLick("/blogs/musicology")} style={active === "/blogs/musicology" ? style.span.active : style.span} >Musicology</Link>
                        <Link to="/blogs/people-and-culture" onClick={handleOnCLick("/blogs/people-and-culture")} style={active === "/blogs/people-and-culture" ? style.span.active : style.span} >People&amp;Culture</Link>

                        
                    </div>
                    <div className="blogsDiv">
                        <Switch>
                            <Route path="/blogs" component={All} exact />
                            <Route path="/blogs/musicology" component={Musicology} />
                            <Route path="/blogs/people-and-culture" component={PeopleAndCulture} />
                            <Route component={Error} />
                        </Switch>
                    </div>
                </div>
            </div>                      
        </div> 
    );
  }
  
  export default Record;
  