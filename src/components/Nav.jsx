import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { FaBowlFood as Logo } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import NavCart from "./NavCart";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useLogoutUserMutation } from "../featured/auth/authApi";
import cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { UserLoggedOut } from "../featured/auth/authSlice";
import AvatarIcon from "./AvatarIcon";

function Nav() {
  const isLoggedIn = useAuth();
  const dispatch = useDispatch();
  const [logoutUser, { isSuccess, isError, error }] = useLogoutUserMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Opps something went wrong");
    }
    if (isSuccess) {
      toast.success("Logout user");
      localStorage.clear();
      cookie.remove("token1");
      cookie.remove("token2");
    }
  }, [isSuccess, isError, error]);

  //  user logout handler
  const logoutHandler = () => {
    logoutUser();
    dispatch(UserLoggedOut());
  };

  return (
    <Navbar fluid={false} rounded className="shadow-2xl">
      <NavLink to="/">
        <Logo size={30} className="cursor-pointer" color="red" />
      </NavLink>

      <div className="flex items-center space-x-5 md:order-2">
        {isLoggedIn ? (
          <>
            <NavCart />
            <Dropdown arrowIcon={false} inline label={<AvatarIcon />}>
              <Dropdown.Item>
                <Link to="/dashboard">Dashboard</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/setting">Settings</Link>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item onClick={logoutHandler}>Sign out</Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <Link to="/login">
            <Button className="px-3" color="dark">
              Join
            </Button>
          </Link>
        )}
      </div>
    </Navbar>
  );
}

export default Nav;
