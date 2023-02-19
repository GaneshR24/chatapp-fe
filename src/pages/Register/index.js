import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoader, ShowLoader } from "../../redux/loaderSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      dispatch(ShowLoader());
      const response = await RegisterUser(user);
      dispatch(HideLoader());
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="h-screen bg-primary flex items-center justify-center">
        <div className="bg-white shadow-md p-5 flex flex-col gap-3 w-96">
          <div className="flex gap-2">
            <i className="ri-message-3-line text-2xl text-primary"></i>
            <h1 className="text-2xl uppercase font-semibold text-primary">
              WeCallText Register
            </h1>
          </div>
          <hr />
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Enter your name"
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />
          <button
            className={
              user.name && user.email && user.password
                ? "contained-btn"
                : "disabled-btn"
            }
            onClick={register}
          >
            Register
          </button>
          <span>
            Already have an account ?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
