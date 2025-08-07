import img from "../../images/vibin2.png";

const style={
  
  
}
const HomeSection1 = () => {
    return (
      <div className="homeSection1">
        <div className="wrapper">
          <div style={{alignSelf: "end"}}>
            <h1>Explore the world of Music together!</h1>
            <p>Experience the new vibe of music with your loved ones through real-time sharing, collaborative playlists, and much more.</p>
          </div>
          <div className="homeImgSection">
            <img src={img} className="homeImg"></img>
          </div>
        </div>
      </div>
    );
  }
  
  export default HomeSection1;
  