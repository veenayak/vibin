import { SocialIcon } from 'react-social-icons';
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from 'axios';
import { useState , useRef} from 'react';
import Alert from '../shared/Alert';

const style = {
    main:{
        backgroundColor: "#f4f2f2",
        minHeight: "calc(100vh - 91px)",
    },
    h1:{
        fontSize: "48px",
    },
    inp:{
        width: "100%",
    },
    inpDiv:{
        display: "grid",
        gridTemplateColumns: "auto auto",
        gap: "12px",
        marginBottom: "18px",
    },
    icons:{
        display: "inline-grid",
        gridTemplateColumns: "auto auto auto auto",
        gridGap: "16px",
        marginRight: "auto",        
    },
    textarea:{
        width: "100%",
        marginBottom: "12px",
        height: "192px",
        resize: "none",
    },
    label:{
        width: "100%",
        display: "block",
        marginBottom: "12px",
        paddingTop: "0",
    },
    button: {
        marginTop: "18px",
        float: "right",
        display: "grid",
        gridTemplateColumns: "auto auto",
        alignItems: "center",
        gap: "8px",
        disabled: {
            marginTop: "18px",
            float: "right",
            display: "grid",
            gridTemplateColumns: "auto auto",
            alignItems: "center",
            gap: "8px",
            cursor: "not-allowed"
        }
    }

}
const ContactSection = () => {
    const alert = (text,display,icon) =>{
        setAlertText(text);
        setAlertDisplay(display);
        setAlertIcon(icon); 
        setTimeout(function(){
            setAlertDisplay("alert");  
            setDisabled(false);
        },2000);
    };
    const handleContact = () => () =>{
        setDisabled(true);

        const data = { email: contactEmail, message: contactMessage, name: contactName };
        if(contactName === ''){
            contactNameFocus.current.focus();
            alert("Name is required!!","alert show","!success");
            
        }
        else if(contactEmail === ''){
            contactEmailFocus.current.focus();
            alert("Email is required!!","alert show","!success");

        } 
        else if(contactMessage === ''){
            contactMessageFocus.current.focus();
            alert("Message is required!!","alert show","!success");

            
        }
        else{
            axios.post('/contacts', data)
            .then(res => {
                if(res.data.status === 200){
                    console.log(res.data.message);
                    alert(res.data.message,"alert show","success");
                    setContactEmail("");
                    setContactName("");
                    setContactMessage("")
                    console.log(contactEmail);
                }
                else{
                    alert(res.data.message.email.message,"alert show","!success");

                }
            })
            .catch(rejected => {
                alert("There is sonething wrong. Please try again later.","alert show","!success");
            });
        }
        
    }

    const contactNameFocus = useRef(null);
    const contactEmailFocus = useRef(null);
    const contactMessageFocus = useRef(null);

    const [contactName,setContactName] = useState('');
    const [contactEmail,setContactEmail] = useState('');
    const [contactMessage,setContactMessage] = useState('');

    const [alertText,setAlertText] = useState('');
    const [alertDisplay,setAlertDisplay] = useState('alert');
    const [alertIcon,setAlertIcon] = useState('');
    const [disabled,setDisabled] = useState(false);

    return (
        <div style={style.main}>
            <div className="wrapper contactDiv">
                <div>
                    <h5 style={style.h5}>SOCIAL FOLLOW</h5>
                    <h1 style={style.h1}>Connect with us</h1>
                    <p style={style.p}>“We don’t want to impel our ideas on to customers, we simply want to make what they want.</p>
  
                </div>
                <div>
                    <h5 style={style.h5}>DIRECT MESSAGE</h5>
                    <h1 style={style.h1}>Send a message</h1>
                    <div style={style.inpDiv}>
                        <div>
                            <label htmlFor="name" style={style.label}>Name</label>
                            <input type="text" name="name" id="name" style={style.inp} onChange={event => setContactName(event.target.value)} ref={contactNameFocus} value={contactName}></input>
                        </div>
                        <div>
                            <label htmlFor="contactEmail" style={style.label}>Email</label>
                            <input type="text" name="contactEmail" id="contactEmail" style={style.inp} onChange={event => setContactEmail(event.target.value)} ref={contactEmailFocus} value={contactEmail}></input>
                        </div>
                    </div>
                    <label style={style.label} htmlFor="message">Message</label>
                    <textarea style={style.textarea} id="message" onChange={event => setContactMessage(event.target.value)} ref={contactMessageFocus} value={contactMessage}></textarea>
                    <button style={disabled ? style.button.disabled : style.button} onClick={handleContact()} disabled={disabled}>Send this message<FaLongArrowAltRight /></button>

                </div>
            </div>
            <Alert class={alertDisplay} text={alertText} icon={alertIcon}/>

        </div>
        
    );
  }
  
  export default ContactSection;