import React, { useState, useEffect } from "react";
import { Button, TextInput } from "flowbite-react";
import { Spinner } from "flowbite-react";
import ForgotPasswordModal from "./ForgotPasswordModal";
import toast from "react-hot-toast";
import { useSendResetPasswordEmailMutation } from "../featured/forgotpasswordApi/forgotpasswordApi";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState(false);

  const [sendResetPasswordEmail, { isLoading, isError, error, isSuccess }] =
    useSendResetPasswordEmailMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("OTP Sent successfully");
      setToggle(true);
    }
    if (isError) {
      toast.error(error?.data?.message || "Opps something went wrong");
    }
  }, [isSuccess, isError, error]);

  //   open otp modal handler

  const otpModal = () => {
    setToggle(!toggle);
  };

  //   Login form submit handler

  const forgotSubmitHandler = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
    } else {
      sendResetPasswordEmail({ email });
    }
  };

  return (
    <>
      <div className="w-full md:w-[400px] lg:w-[400px] ">
        <form
          onSubmit={forgotSubmitHandler}
          className="flex max-w-md flex-col gap-4"
        >
          <div className="w-full flex flex-col space-y-4">
            {/* email  */}
            <div>
              <TextInput
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Remember */}

            <Button type="submit">
              {isLoading ? (
                <Spinner color="failure" aria-label="Failure spinner example" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
      {toggle && (
        <ForgotPasswordModal
          toggle={toggle}
          otpModal={otpModal}
          email={email}
        />
      )}
    </>
  );
}

export default Forgotpassword;
