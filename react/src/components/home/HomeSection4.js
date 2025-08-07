import video from "../../images/vibin1.mp4";

const HomeSection4 = () => {
   return (
      <section className="homeSection4">
         <div className="wrapper">
            <video loop autoPlay muted className="homeVideo">
            <source src={video}></source>
            </video>  
            <div>
               <h1>Collaborate And Build A Musical Fortress</h1>
               <p>Collaborate on playlists and create a community of active listeners. Become a part of the musical revolution with your buddies!</p>          
            </div>
         </div>
      </section>    
   );
}
  
  export default HomeSection4;
  