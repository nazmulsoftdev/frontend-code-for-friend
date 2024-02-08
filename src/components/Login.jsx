import React, { useState, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { useLoginUserMutation } from "../featured/auth/authApi";
import toast from "react-hot-toast";
import { FaGooglePlusG as GoogleloginIcon } from "react-icons/fa6";

function Login() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading, isError, isSuccess, error }] =
    useLoginUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Welcome back");
    }
    if (isError) {
      console.log(error);
      toast.error(error?.data?.message || "Opps something went wrong");
    }
  }, [isSuccess, isError, error]);

  // if user type his email in username input
  useEffect(() => {
    if (username.includes("@gmail.com")) {
      setEmail(username);
    }
  }, [username]);

  //   username handler

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  //   Login form submit handler

  const loginSubmitHandler = (e) => {
    if (!(username || password)) {
      toast.error("username and password required");
    } else {
      loginUser({ username, email, password });
      setUserName("");
      setEmail("");
      setPassword("");
    }

    e.preventDefault();
  };

  return (
    <div className="w-full md:w-[400px] lg:w-[400px] ">
      <form
        onSubmit={loginSubmitHandler}
        className="flex max-w-md flex-col gap-4"
      >
        <div className="w-full flex flex-col space-y-4">
          {/* username  */}
          <div>
            <TextInput
              type="text"
              placeholder="username"
              required
              value={username}
              onChange={userNameHandler}
            />
          </div>
          {/* password */}
          <div>
            <TextInput
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Remember */}
          <div className="flex justify-between items-center">
            <Link to="/register" className="text-[#ecf0f1] text-sm">
              don't have an account ?
            </Link>
            <Link to="/forgotpassword" className="text-[#ecf0f1] text-sm">
              forgot password ?
            </Link>
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <Spinner color="failure" aria-label="Failure spinner example" />
            ) : (
              "Login"
            )}
          </Button>
          <Button color="dark" className="cursor-pointer">
            <GoogleloginIcon size={25} color="white" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
