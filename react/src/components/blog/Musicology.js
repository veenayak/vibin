import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const style= {  
    blogs: {
        padding: "12px 18px",
        maxWidth: "100%",
        display: "grid",
        gridTemplateRows: "max-content auto",
    },

}

const Musicology = () => {
    const [data,setData] = useState([]);

    const fetchBlogs = () =>{
        axios.post('/blogs/fetch' ,{category: "musicology"})
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

    return (
        <>
            {
                data.map((item,index) => 
                    <div key={index} style={style.blogs}>
                        <img src={item.mainImage} className="blogImg"/>
                        <span className="blogCat">{item.category === "musicology" ? "musicology" : "people&culture"}</span>

                        <p className="blogTitle">
                            <Link to={`/blogs/${item.category}/${item.title}`} >{item.title}</Link>
                        </p>
                    </div>
                ) 
            }
                  
        </>
    );
  }
  
  export default Musicology;
  