import { Link } from "react-router-dom";
import sushiBg from "../assets/sushi-bg.jpg";


const Home = () => {
    return (
        <div
          style={{
            backgroundImage: `url(${sushiBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#000",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
            padding: "1rem",            
          }}
        >
            <img src={sushiBg} alt="Debug sushi background" style={{ width: "100px" }} />
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            Welcome to Sushi Shop
          </h1>
          <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
            Discover the freshest sushi made just for you!
          </p>
          <Link to="/menu">
            <button
             style={{
                padding: "1rem 2rem",
                backgroundColor: "#f28c38",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              Start Your Order
            </button>
          </Link>
        </div>
    );
}

export default Home;
