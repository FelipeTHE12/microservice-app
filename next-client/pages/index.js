import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Home page</h1>;
};

LandingPage.getInitialProps = async () => {
  const response = await axios.get("/api/users/currentuser").catch(err);
  return response.data;
};

export default LandingPage;
