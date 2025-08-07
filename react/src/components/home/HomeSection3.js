
import video from "../../images/vibin2.mp4";

const HomeSection3 = () => {
  return (
    <section className="homeSection3">
      <div className="wrapper">
        <video loop autoPlay muted className="homeVideo">
          <source src={video}></source>
        </video>     
        <div> 
          <h1>Share What You Find With Your Crew Right Away</h1>
          <p>Listen and explore music from all your favorite genres through various streaming platforms!</p>          
        </div>
      </div>
    </section>    
  );
  }
  
  export default HomeSection3;
  