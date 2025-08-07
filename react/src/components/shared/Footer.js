import axios from 'axios';
import { useState , useRef} from 'react';
import { SocialIcon } from 'react-social-icons';
import Alert from './Alert';
import InstagramEmbed from 'react-instagram-embed';

const style ={
    footerOne:{
        background: "black",
        padding: "12px 18px",
        textAlign: "center",
        color: "#ffffff",
    },
    div:{
        display: "grid",
        gridTemplateRows: "auto auto auto",
        alignItems: "center",
        margin: "auto",
    },
    footerTwo:{
        background: "black",
        color: "#ffffff",
        padding: "12px 0 18px 0",
        textAlign: "center",
    },
    socialIcons:{
        display: "inline-grid",
        gridTemplateColumns: "auto auto auto auto",
        margin: "auto",
        gridGap: "16px",
        padding: "24px",
    },
    button:{
        marginLeft: "8px",
        disabled: {
            marginLeft: "8px",
            cursor: "not-allowed"
        }
    },
    instaImages:{
        
    },
    img:{
        width: "200px",
        height: "200px"
    }
}
const Footer = () => {
    const alert = (text,display,icon) =>{
        setAlertText(text);
        setAlertDisplay(display);
        setAlertIcon(icon); 
        setTimeout(function(){
            setAlertDisplay("alert");  
            setDisabled(false);
            setSubscriberEmail('');
        },2000)
    };
    const handleInsertSubscriber = () => () =>{
        setDisabled(true);

        const data = {email: subscriberEmail};

        if(subscriberEmail === ''){
            subEmailFocus.current.focus();
            alert("Email is required!!","alert show","!success");

        } 
        else{
            axios.post('/subscribers', data)
            .then(res => {
                if(res.data.status === 200 || res.data.status === 409){
                    console.log(res.data.message);
                    alert(res.data.message,"alert show","success");
                }
                else{
                    alert(res.data.message,"alert show","!success");
                }
            })
            .catch(rejected => {
                alert("There is sonething wrong. Please try again later.","alert show","!success");
            });
        }
        
    }

    const [subscriberEmail,setSubscriberEmail] = useState('');
    const [alertText,setAlertText] = useState('');
    const [alertDisplay,setAlertDisplay] = useState('alert');
    const [alertIcon,setAlertIcon] = useState('');

    const subEmailFocus = useRef(null);

    const [disabled,setDisabled] = useState(false);



    return (
        <>
            <footer>
                <div style={style.instaImages}>
                {/* <InstagramEmbed
                    url='https://www.instagram.com/p/CGHxC9rF0wm/?utm_source=ig_embed&amp;utm_campaign=loading'
                    clientAccessToken='123|456'
                    maxWidth={320}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                /> */}
                    
                </div>
                <div style={style.footerOne}>
                    <div className="wrapper" style={style.div}>
                        <h1>Subscribe below to start VIBIN’ together!</h1>
                        <div>
                            <h3>Subscribe! for News and Updates and become a Beta Tester</h3>
                            <div>
                                <label htmlFor="email">Email Id</label>
                                <input type="text" placeholder="Enter you address" name="subscriberEmail" id="subscriberEmail" onChange={event => setSubscriberEmail(event.target.value)} ref={subEmailFocus} value={subscriberEmail}></input>
                                <button style={disabled ? style.button.disabled : style.button} onClick={handleInsertSubscriber()} disabled={disabled}>Subscribe</button>    
                                <p>We won't spam you promise</p>
                            </div>
                        </div>
                        <div style={style.socialIcons}>
                            <SocialIcon bgColor="black" url="https://www.facebook.com/vibinmusicsharing/" />
                            <SocialIcon bgColor="black" url="https://twitter.com/vibin_music" />
                            <SocialIcon bgColor="black" url="https://instagram.com/vibin_sharing?igshid=npmvbss2mj86" />
                            <SocialIcon bgColor="black" url="https://www.linkedin.com/company/35884186/admin/" />
                        </div>

                    </div>
                </div>
                <div style={style.footerTwo}>
                    <div className="wrapper">
                        <span>Vibin | Powered by Shor in City inc.</span>
                    </div>
                </div>
            </footer>
            <Alert class={alertDisplay} text={alertText} icon={alertIcon}/>
        </>
    );
  }
  
  export default Footer;
  