import React, { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../featured/auth/authApi";
import toast from "react-hot-toast";
import EmailValidation from "../utils/EmailValidation";
import PasswordValidation from "../utils/PasswordValidation";
import { Spinner } from "flowbite-react";
import { checkUserFieldValidation } from "../utils/checkUserFieldValidation";
import { FaGooglePlusG as GoogleloginIcon } from "react-icons/fa6";
function Regsiter() {
  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   register mutation
  const [registerUser, { isLoading, isError, isSuccess, error }] =
    useRegisterUserMutation();

  // route navigation

  const navigation = useNavigate("");

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully register complete");
    }
    if (isError) {
      console.log(error);
      toast.error(error?.data?.message || "Opps something went wrong");
    }
  }, [isSuccess, isError, error]);

  //   Login form submit handler

  const registerSubmitHandler = (e) => {
    e.preventDefault();

    if (!checkUserFieldValidation([fullName, username, email, password])) {
      toast.error("All fields are required");
    } else if (!EmailValidation(email)) {
      toast.error("Please Provide a valid email", { duration: 1500 });
    } else if (!PasswordValidation(password)) {
      toast.error("Password should minimum 6 digit", { duration: 1500 });
    } else if (password !== confirmPassword) {
      toast.error("Password not match", { duration: 1500 });
    } else {
      registerUser({ fullName, username, email, password });
    }
  };

  return (
    <div className="w-full md:w-[400px] lg:w-[400px] ">
      <form
        onSubmit={registerSubmitHandler}
        className="flex max-w-md flex-col gap-4"
      >
        <div className="w-full flex flex-col space-y-4">
          {/* fullName  */}
          <div>
            <TextInput
              type="text"
              placeholder="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          {/* username  */}
          <div>
            <TextInput
              type="text"
              placeholder="username"
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          {/* Email  */}
          <div>
            <TextInput
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          {/* confirm password */}
          <div>
            <TextInput
              type="password"
              placeholder="confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {/* Remember */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-white">
                Remember me
              </Label>
            </div>
            <Link to="/login" className="text-[#ecf0f1] text-sm">
              have an account ?
            </Link>
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <Spinner color="failure" aria-label="Failure spinner example" />
            ) : (
              "Submit"
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

export default Regsiter;
