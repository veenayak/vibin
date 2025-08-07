
// import AboutCard from "./AboutCard";
// import Kartik from "../images/Kartik.jpg";
// import Harsh from "../images/Harsh.jpg";
// import Naman from "../images/Naman.jpg";

// const style = {
//     cardSection:{
//         display: "grid",
//         gridTemplateColumns: "auto auto auto",
//     },
//     aboutSection2:{
//         background: "black",
//         color: "#ffffff",
//     },
//     div:{
//         display: "grid",
//         gridTemplateRows: "auto auto auto",
//         minHeight: "100vh",
//     },
//     h1:{
//         fontSize: "48px",
//         alignSelf: "center",
//         margin: "0",
//     },
//     h5:{
//         alignSelf: "end",
//         margin: "0",
//     },
// }

// const AboutSection2 = () => {
//     const data = [{
//             name: "KARTIK CHOPRA",
//             title: "CARE TAKER",
//             instagram: "https://www.instagram.com/serial.chiller__/",
//             linkedin: "https://www.linkedin.com/in/kartik-chopra-a26ab6165/",
//             twitter: "https://twitter.com/kartikchopra8?s=09",
//             info: "The man behind the idea! Daily dose of sarcasm and music combined with the idea of Vibin keeps this guy healthy, wealthy and wise.",
//             src: Kartik,
//         },
//         {
//             name: "NAMAN MEHTA",
//             title: "TO THE RESCUE",
//             instagram: "https://www.instagram.com/naman_mehta/",
//             linkedin: "https://www.linkedin.com/in/naman-mehta7/",
//             twitter: "https://twitter.com/namanmehta_?s=09",
//             info: "That non-technical element of the team who stays away from the internal mechanism still manages to promote like a pro!",
//             src: Naman,

//         },
//         {
//             name: "HARSH KANT",
//             title: "DOES ALL THE EXPLAINING",
//             instagram: "https://www.instagram.com/harshkant88/",
//             linkedin: "https://www.linkedin.com/in/harsh-kant-2930a0187/",
//             twitter: "https://www.vibin.in/about-us-music-app/",
//             info: "The tech savvy guy who knows literally anything to everything about codes and still has a life!",
//             src: Harsh,
//         }

//     ]
//     return (
//         <section style={style.aboutSection2} className="aboutSection2">
//             <div className="wrapper" style={style.div}>
//                 <h5 style={style.h5}>Behind the Scene</h5>
//                 <h1 style={style.h1}>Team Members</h1>
//                 <div style={style.cardSection}>                        
//                     {data.map((item, i) => (
//                         <AboutCard key={i} name={item.name} title={item.title} src={item.src} instagram={item.instagram} linkedin ={item.linkedin} twitter={item.twitter} info={item.info}/>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
//   }
  
//   export default AboutSection2;
  
