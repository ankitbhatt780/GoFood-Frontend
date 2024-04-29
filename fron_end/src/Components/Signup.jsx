import React from "react";
import MainLayout from "../Layout/MainLayout";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// import { IoEye, IoEyeOff } from "react-icons/io";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function Signup() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        location: location,
      }),
    });

    const result = await response.json();
    // console.log(result);

    if (result.success) {
      alert("success" + result.message);
      navigate("/login");
    } else {
      alert(result.message);
    }
    setEmail("");
    setPassword("");
    setLocation("");
    setName("");
  };

  return (
    <>
      <div>
        <MainLayout>
          <div
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
              height: "100vh",
              backgroundSize: "cover",
            }}
          >
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label bold"
                  >
                    Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    autoFocus
                    autoComplete="name"
                    required
                  />
                </div>
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
                    autoFocus
                    autoComplete="email"
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
                  <input
                    onChange={handlePasswordChange}
                    value={password}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    autoFocus
                    autoComplete="password"
                    required
                  />

                  <button
                    type="button"
                    className="input-group-text  "
                    style={{ "margin-top": "-39px", "margin-left": "96%" }}
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    location
                  </label>
                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    autoFocus
                    autoComplete="location"
                    required
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
                    variant="outlined"
                    color="success"
                    className="btn btn-success mx-3 text-white bg-primary"
                    type="submit"
                  >
                    signup
                  </Button>

                  <Button
                    variant="contained"
                    className="btn btn-danger bg-danger "
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Already A User
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

export default Signup;
