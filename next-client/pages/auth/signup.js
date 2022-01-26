import { useState } from "react";
import axios from "axios";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);

    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      });
    } catch (err) {
      console.log("Entrou aqui poha");
      setErrors(err.response.data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Something happened</h4>
          <ul className="my-0">
            {errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="btn btn-primary">SIGN UP !</button>
    </form>
  );
};
