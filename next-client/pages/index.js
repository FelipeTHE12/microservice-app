import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>Hello {currentUser.email}</h1>
  ) : (
    <h1>U NEED TO SIGN IN</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/users/currentuser");
  return data;
};

export default LandingPage;
