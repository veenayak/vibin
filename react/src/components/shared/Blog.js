import { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import {AiFillLike} from "react-icons/ai"

import {AiTwotoneEye} from "react-icons/ai"
import Alert from './Alert';
import { HashLink as Link } from 'react-router-hash-link';
import MetaTags from 'react-meta-tags';

const style= {
    mainImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover" 
    },
    img: {
        width: "100%",
        height: "auto",
        objectFit: "contain",
        maxWidth: "480px",
        margin: "18px 0",
    },
    blogSection1: {
        minHeight: "calc(100vh - 91px)"
    },
    caroDiv: {
        height: "360px",
    },

    title:{
        fontSize: "36px"
    },
    updated: {
        color: "#7b7b7b",
        fontSize: "14px"
    },
    header:{
        margin: "36px 0"
    },
    subheader:{
        margin: "24px 0"
    },
    titleDiv:{ 
        display: "grid",
        gridTemplateColumns: "max-content max-content max-content",
        alignItems: "center",
    },
    span:{
        display: "flex",
        alignItems: "center",
        fontSize:"24px",
        marginLeft: "18px",
        cursor:"pointer"
    },
    contentLink:{
        color: "rgb(66, 61, 161)",
        textDecoration: "none",
        
    }

}

const Blog = (props) => {
    const [data,setData] = useState({});
    const { match: { params } } = props;
    const [content,setContent] = useState([]);
    const [alertText,setAlertText] = useState('');
    const [alertDisplay,setAlertDisplay] = useState('alert');
    const [alertIcon,setAlertIcon] = useState('');
    const alert = (text,display,icon) =>{
        setAlertText(text);
        setAlertDisplay(display);
        setAlertIcon(icon); 
        setTimeout(function(){
            setAlertDisplay("alert");  
        },2000)
    };
    const fetchBlogs = () =>{
        console.log(params.title);
        axios.post('/blogs/fetch' ,{title:params.title})
        .then(res => {
            if(res.data.status === 200){
                let arr = res.data.data;
                console.log(arr);
                setData(arr);
                setContent(arr.content);
            }
            else{
                console.log(res);
            }
        })
        .catch(rejected => {
            alert("There is sonething wrong. Please try again later.","alert show","!success");
        });
    }

    useEffect(() => {
        fetchBlogs();
    },[]);

    const handleOnClick = () =>{
        axios.post('/blogs/likes' ,{title:params.title})
        .then(res => {
            if(res.data.status === 200){
                alert("You liked this post.","alert show","success");
                data.likes = data.likes+1;
                setData(data);
            }

        })
        .catch(rejected => {
            alert("There is sonething wrong. Please try again later.","alert show","!success");
        });
    }
    return (
        
        <div style={style.blogSection1}>
            <MetaTags>
                <title>{data.title + "-" + data.description}</title>
                <meta name="description" content={data.description} />
            </MetaTags>
            <div style={{background: "rgb(244, 242, 242)"}}>
                <div style={style.caroDiv}>
                    <img src={data.mainImage} style={style.mainImage}/>

                </div>
                <div className="wrapper">

                    <div style={style.titleDiv}>
                        <h1 style={style.title}>{data.title}</h1>
                        <span style={style.span}>{data.views}&nbsp;<AiTwotoneEye/></span>

                        <span style={style.span} onClick={handleOnClick}>{data.likes}&nbsp;<AiFillLike/></span>
                    </div>
                    <span style={style.updated}>
                        Updated On &nbsp;-&nbsp;
                        <Moment format="hh:mm:ss DD/MM/YY">
                            {data.updatedOn}
                        </Moment>
                    </span>
                    <div style={style.contentIndex}>
                        <ol style={{paddingLeft: "18px"}}>
                            {content.filter(item => item.name === "header").map((list,index) =>                                
                                <li style={style.para} style={style.header} key={index}>
                                    <Link to={'#'+list.value} style={style.contentLink}>{list.value}</Link>
                                </li>

                            )} 
                        </ol>
                    </div>
                    <div>
                    {content.map((list,index) =>
                        <div key={index} style={{display: "inline-block" ,width: "100%"}}>
                            {   
                                list.name === "image" ? 
                                    <img src={list.value} style={style.img}></img> 
                                : 
                                list.name === "paragraph" ? 
                                    <p style={style.para}>{list.value}</p>
                                : 
                                list.name === "header" ? 
                                    <h1 style={style.para} style={style.header} id={list.value}>{list.value}</h1>
                                : 
                                list.name === "subheader" ? 
                                    <h2 style={style.para} style={style.subheader}>{list.value}</h2>
                                : "" 
                            }
                        </div>
                    )} 
                    </div>
                </div>
            </div>                      
            <Alert class={alertDisplay} text={alertText} icon={alertIcon}/>

        </div> 
    );
  }
  
  export default Blog;
  