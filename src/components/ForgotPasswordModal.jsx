import React, { useState, useEffect } from "react";
import { Button, Modal, TextInput, Spinner } from "flowbite-react";
import { MdOutlinePassword as OTPIcon } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useUserChangePasswordMutation,
  useVerifyCodeMutation,
} from "../featured/forgotpasswordApi/forgotpasswordApi";

function ForgotPasswordModal({ toggle, otpModal, email }) {
  // OTP STATE
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");

  const [valid, setValid] = useState(false);

  const [verifyCode, { isLoading, isError, isSuccess, error }] =
    useVerifyCodeMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("OTP Verifyed");
      setValid(true);
    }
    if (isError) {
      toast.error(error?.data?.message || "Opps something went wrong");
    }
  }, [isSuccess, isError, error]);

  //   otp submit handler

  const otpSubmitHandler = (e) => {
    e.preventDefault();
    if (!(one || two || three || four)) {
      alert("Please provide valid OTP");
    }
    if (one && two && three && four) {
      const otpDigit = one + "" + two + "" + three + "" + four;
      verifyCode({ otpDigit, email });
    }
  };

  //   NEW PASSWORD STATE

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [
    userChangePassword,
    {
      isLoading: isLoading2,
      isSuccess: isSuccess2,
      isError: isError2,
      error: error2,
    },
  ] = useUserChangePasswordMutation();

  //   navigate
  const navigate = useNavigate("");

  useEffect(() => {
    if (isSuccess2) {
      toast.success("OTP Verifyed");
      otpModal();
      navigate("/login");
    }
    if (isError2) {
      toast.error(error2?.data?.message || "Opps something went wrong");
    }
  }, [isSuccess2, isError2, error2]);

  //   new password handler

  const newPasswordHandler = (e) => {
    e.preventDefault();
    if (!(newPassword || confirmPassword)) {
      alert("Password required");
    }
    if (newPassword !== confirmPassword) {
      alert("Password not match");
    } else {
      userChangePassword({ newPassword, email });
      console.log(email);
    }
  };

  return (
    <div>
      <Modal show={toggle} onClose={otpModal}>
        {/* Otp form */}
        <div>
          {!valid ? (
            <form onSubmit={otpSubmitHandler}>
              <Modal.Header>OTP Validation/Check Your Email</Modal.Header>
              <Modal.Body>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col justify-center items-center space-y-3">
                    <OTPIcon size={30} color="#2ed573" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <TextInput
                      maxLength="1"
                      required
                      value={one}
                      onChange={(e) => setOne(e.target.value)}
                    />
                    <TextInput
                      maxLength="1"
                      required
                      value={two}
                      onChange={(e) => setTwo(e.target.value)}
                    />
                    <TextInput
                      maxLength="1"
                      required
                      value={three}
                      onChange={(e) => setThree(e.target.value)}
                    />
                    <TextInput
                      maxLength="1"
                      required
                      value={four}
                      onChange={(e) => setFour(e.target.value)}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">
                  {" "}
                  {isLoading ? (
                    <Spinner
                      color="failure"
                      aria-label="Failure spinner example"
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Modal.Footer>
            </form>
          ) : (
            <form onSubmit={newPasswordHandler}>
              <Modal.Header>New Password</Modal.Header>
              <Modal.Body>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col justify-center items-center space-y-3">
                    <OTPIcon size={30} color="#2ed573" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <TextInput
                      type="password"
                      placeholder="Password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextInput
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">
                  {" "}
                  {isLoading2 ? (
                    <Spinner
                      color="failure"
                      aria-label="Failure spinner example"
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Modal.Footer>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ForgotPasswordModal;
