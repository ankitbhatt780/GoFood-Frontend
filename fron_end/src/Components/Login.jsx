import { useState } from "react";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
export default function Login() {
  // const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/loginuser", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    console.log(result);

    if (result.success) {
      localStorage.setItem("UserEmail", email,);
      localStorage.setItem("authToken", result.authToken);
      // console.log(localStorage.getItem("authToken"));
      alert("success" + result.message);
      navigate("/");
    }
    else {
      alert("something went wrong", result.message);
    }
    setEmail("");
    setPassword("");

  };

  return (
    <>

      <div>
        <MainLayout>
          <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>

            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>

                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  {/* {!password ? setError(true) : setError(false)} */}
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={showPassword ? "text" : "password"}
                    // type="passwordType"
                    className="form-control"
                    id="exampleInputPassword1"
                    required
                  />
                  <label for="check">Show Password</label>
                  <input
                    id="check"
                    type="checkbox"
                    value={showPassword}
                    onChange={() => setShowPassword((prev) => !prev)}
                  />
                </div>

                {/* <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="exampleCheck1"
                                    /> */}
                {/* <label className="form-check-label" for="exampleCheck1">
                                    Check me out
                                </label> */}
                {/* </div> */}
                <div className="d-flex justify-content-center mt-4 ">
                  <Button
                    z
                    variant="outlined"
                    color="success"
                    className="btn btn-success mx-3 text-white bg-success"
                    type="submit"
                  >
                    login
                  </Button>

                  <Button
                    variant="contained"
                    className="btn btn-error bg-danger "
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    i'am a New User
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </MainLayout>

      </div>
    </>
  );
}
