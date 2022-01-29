import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Home page</h1>;
};

LandingPage.getInitialProps = async () => {
  if (typeof window === "undefined") {
    const { data } = await axios
      .get(
        "http://ingress-nginx.ingress-nginx.svc.cluster.local/api/users/currentuser"
      )
      .catch(err);
    return data;
  } else {
    const { data } = await axios.get("/api/users/currentuser").catch(err);
    return data;
  }

  return {};
};

export default LandingPage;
