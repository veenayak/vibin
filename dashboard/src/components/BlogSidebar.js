import { useState , useRef ,useEffect } from 'react';
import {MdClose} from "react-icons/md";
import axios from 'axios';
import Alert from './shared/Alert';

const style={
    main:{
        position: "fixed",
        right: "0",
        top: "0",
        height: "100vh",
        boxShadow: "0px 0px 8px 4px #cccccc",
        width: "480px", 
        maxWidth: "100%", 
        background: "#f4f2f2",
        padding: "12px 18px",
        overflowY: "scroll",
        paddingBottom: "0",
        close:{
            right: "100%",
            display: "none"
        }
    },
    inpDiv:{
        marginBottom: "18px",
        display: "grid",
    },
    buttonDiv: {
        position: "sticky",
        right: "0",
        bottom: "0",
        width: "100%",
        padding: "12px 0",
        background: "#f4f2f2"
    },
    buttonHalf:{
        display:  "grid",
        gridTemplateColumns: "auto auto",
        gap: "12px",
        marginBottom: "12px"

    },
    button: {
        width: "100%",
        maxWidth: "unset",
        disabled: {
            width: "100%",
            maxWidth: "unset",
            cursor: "not-allowed",
        }
    },
    contentDiv: {
        display: "grid",
        gridTemplateColumns: "auto max-content",
        alignItems: "center"
    },
    label: {
        width: "max-content"
    },
    textarea:{
        resize: "none",
        height: "240px",
    },
    inp: {
        width: "100%"
    },
    img: {
        height: "120px",
        objectFit: "contain",
        width: "auto",
        maWidth: "100%",     
        marginTop: "18px",
    },
    
}
const BlogSidebar = (props) => {
    const alert = (text,display,icon) =>{
        setAlertText(text);
        setAlertDisplay(display);
        setAlertIcon(icon); 
        setTimeout(function(){
            if(icon === "success"){
                props.fetch();
                props.setActive(false);
            }
            setAlertDisplay("alert");  
            setDisabled(false);            
        },2000);
    };

    const titleFocus = useRef(null);
    const mainImgFocus = useRef(null);
    const descriptionFocus = useRef(null);


    const [alertText,setAlertText] = useState('');
    const [alertDisplay,setAlertDisplay] = useState('alert');
    const [alertIcon,setAlertIcon] = useState('');

    const [disabled,setDisabled] = useState(false);


    const addPara = () =>{
        props.setInputList([...props.inputList, { name: "paragraph", type: "textarea" ,value: "" }]);
    } 
    const addImage = () =>{
        props.setInputList([...props.inputList, { name: "image", type: "file" ,value: ""  }]);

    } 
    const addHeader = () =>{
        props.setInputList([...props.inputList, { name: "header", type: "text" ,value: ""  }]);

    } 
    const addSubHeader = () =>{
        props.setInputList([...props.inputList, { name: "subheader", type: "text" ,value: ""  }]);

    } 
    const handleRemoveClick = index => () =>{
        const list = [...props.inputList];
        list.splice(index, 1);
        props.setInputList(list);
    }
    const changeContent = (value,key) =>{

        const list = [...props.inputList];
        list[key].value = value;
        props.setInputList(list);

    } 
    const saveBlog = () =>{
        setDisabled(true);
        const token = JSON.parse(localStorage.getItem('token'));

        if(props.title === ''){
            titleFocus.current.focus();
            alert("Title is required!!","alert show","!success");
            
        }
        else if(props.mainImg === ''){
            mainImgFocus.current.focus();
            alert("Main Image is required!!","alert show","!success");

        } 
        else if(props.description === ''){
            descriptionFocus.current.focus();
            alert("Description is required!!","alert show","!success");

        }
        else if(props.inputList.length === 0){
            alert("Content is required!!","alert show","!success");

        }  
        else{
            const data = {mainImage: props.mainImg,token: token,title: props.title,content: props.inputList ,description: props.description, category: props.category};
            console.log(data);
            axios.post('/blogs',data)
            .then(res => {
                if(res.data.status === 200){
                    alert(res.data.message,"alert show","success");                   
                }
                else{
                    alert(res.data.message,"alert show","!success");
                    console.log(res);
                }
            })
            .catch(rejected => {
                alert("There is sonething wrong. Please try again later.","alert show","!success");
            });
        }

    } 

    const updateBlog = () =>{
        setDisabled(true);

        const token = JSON.parse(localStorage.getItem('token'));

        if(props.title === ''){
            titleFocus.current.focus();
            alert("Title is required!!","alert show","!success");
            
        }
        else if(props.mainImg === ''){
            mainImgFocus.current.focus();
            alert("Main Image is required!!","alert show","!success");

        } 
        else if(props.description === ''){
            descriptionFocus.current.focus();
            alert("Description is required!!","alert show","!success");

        } 
        else if(props.inputList.length === 0){
            alert("Content is required!!","alert show","!success");

        }  
        else{
            const data = {id: props.id, mainImage: props.mainImg,token: token,title: props.title,content: props.inputList ,description: props.description, category: props.category};
            axios.post('/blogs/update',data)
            .then(res => {
                if(res.data.status === 200){
                    alert(res.data.message,"alert show","success");
                }
                else{
                    alert(res.data.message,"alert show","!success");
                    console.log(res);

                }
            })
            .catch(rejected => {
                alert("There is sonething wrong. Please try again later.","alert show","!success");
            });
        }

    } 

    const hideSidebar = () =>{
        props.setActive(false);
    }
    const onChangeMainImage = (event) =>{
        let data = new FileReader();
        data.readAsDataURL(event.target.files[0]);
        
        
        data.onload = () =>{
            console.log(event.target.value);

            if(event.target.files[0].size > 1000000){
                alert("Image size can not be greater than 1MB" ,"alert show","!success");
                event.target.value = "";
            }
            else{
                props.setMainImg(data.result);
            }
        }
        data.onerror = (error) =>{
            console.log(error);
        }
    }
    const onChangeContentImage = (event,index) =>{
        let data = new FileReader();
        data.readAsDataURL(event.target.files[0]);
        const list = [...props.inputList];
       
        data.onload = () =>{
            if(event.target.files[0].size > 1000000 ){
                alert("Image size can not be greater than 1MB" ,"alert show","!success");
                event.target.value = "";
            }
            else{
                list[index].value = data.result;
                props.setInputList(list);
                
            }
        

        }
        data.onerror = (error) =>{
            console.log(error);
        }
    }
    return (
        <div style={props.active ? style.main : style.main.close}>
            <MdClose size={28} onClick={hideSidebar} style={{marginBottom: "18px"}}/>
            <h1>{props.type === "insert" ? "Create Blog" : "Update Blog"}</h1>
            <div style={style.inpDiv}>
                <label htmlFor="title" style={style.label}>Title</label>
                <input type="text" name="title" id="title" onChange={event => props.setTitle(event.target.value)} ref={titleFocus} value={props.title || ""}></input>
            </div>
            <div style={style.inpDiv}>
                <label htmlFor="description" style={style.label}>Meta Description</label>
                <input type="text" name="description" id="description"  onChange={event => props.setDescription(event.target.value)} ref={descriptionFocus} value={props.description || ""}></input>
            </div>
            <div style={style.inpDiv}>
                <label htmlFor="mainImg" style={style.label}>Image</label>
                <input type="file" name="mainImg" id="mainImg"  onChange={event => onChangeMainImage(event)} ref={mainImgFocus}></input>
                <img src={props.mainImg || ""} style={style.img}></img>
            </div>

            <div style={style.inpDiv}>
                <label htmlFor="category" style={style.label}>Category</label>
                <select name="category" id="category"  onChange={event => props.setCategory(event.target.value)} value={props.category} >
                    <option value="musicology">Musicology</option>
                    <option value="people-and-culture">People and Culture</option>
                </select>
            </div>
            <div style={style.content}>
                <h2 style={{marginTop : "48px"}}>Content</h2>
                {                 
                    props.inputList.map((item,index) => 
                        <div style={style.inpDiv} key={index}>
                            <div style={style.contentDiv}>
                            <label htmlFor={item.name+eval(index+1)} style={style.label}>{eval(index+1)+"."+item.name}</label>
                            <MdClose size={20} onClick={handleRemoveClick(index)}/>
                            </div>
                            {
                                item.type === "textarea" ?
                                    <textarea name={item+eval(index+1)} id={item.name+eval(index+1)} style={style.textarea}  onChange={event => changeContent(event.target.value,index)} value={props.inputList[index].value || ""}></textarea>
                                : ""
                            }
                            {
                                item.type === "file" ?
                                <div>
                                    <input style={style.inp} type={item.type} name={item.name+eval(index+1)} id={item.name+eval(index+1)} onChange={event => onChangeContentImage(event,index)}  ></input>
                                    <img style={style.img} src={props.inputList[index].value || ""} alt="Uploaded image will be displayed here"></img>
                                </div>
                                : ""
                            }
                            {
                                item.type === "text" ?
                                    <input name={item+eval(index+1)} id={item.name+eval(index+1)} style={style.inp}  onChange={event => changeContent(event.target.value,index)} value={props.inputList[index].value || ""}></input>
                                 : ""
                            }
                            
                        </div>
                    )

                }
            </div>
            <div style={style.buttonDiv}>
                <div style={style.buttonHalf}>
                    <button style={style.button} onClick={addImage}>image</button>
                    <button style={style.button} onClick={addPara}>paragraph</button>
                    <button style={style.button} onClick={addHeader}>header</button>
                    <button style={style.button} onClick={addSubHeader}>sub-header</button>
                </div>
                <button style={disabled ? style.button.disabled : style.button }  onClick={props.type === "insert" ? saveBlog : updateBlog} disabled={disabled}>Save</button>


            </div>
            <Alert class={alertDisplay} text={alertText} icon={alertIcon}/>
        </div>
    );
}
export default BlogSidebar;