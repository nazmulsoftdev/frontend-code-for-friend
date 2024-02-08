import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput, Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import PasswordValidation from "../../utils/PasswordValidation";
import { useLoggedInUserPasswordChangeMutation } from "../../featured/auth/authApi";
function UpdatePasswordModal({ openPassword, passwordUpdateModalHandler }) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loggedInUserPasswordChange, { isLoading, isError, isSuccess, error }] =
    useLoggedInUserPasswordChangeMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Opps something went wrong");
    }
    if (isSuccess) {
      toast.success("Password update successfully");
      passwordUpdateModalHandler();
    }
  }, [isError, isSuccess, error]);

  // password change form handler

  const changePasswordSubmitHandler = (e) => {
    e.preventDefault();

    if (!(password || newPassword || confirmPassword)) {
      toast.error("All feilds are required");
    } else if (newPassword !== confirmPassword) {
      toast.error("password not match");
    } else if (!PasswordValidation(newPassword)) {
      toast.error("Password should minimum 6 digit", { duration: 1500 });
    } else {
      loggedInUserPasswordChange({ password, newPassword });
    }
  };

  return (
    <>
      <Modal show={openPassword} onClose={passwordUpdateModalHandler}>
        <Modal.Header>Update Password</Modal.Header>
        <Modal.Body>
          <form onSubmit={changePasswordSubmitHandler}>
            <div className="flex flex-col space-y-3">
              <div>
                <TextInput
                  type="password"
                  placeholder="current password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <TextInput
                  type="password"
                  placeholder="new password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <TextInput
                  type="password"
                  placeholder="confirim password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-5 flex items-center space-x-2">
              <Button type="submit">
                {isLoading ? (
                  <Spinner
                    color="failure"
                    aria-label="Failure spinner example"
                  />
                ) : (
                  "Update"
                )}
              </Button>
              <Button color="gray" onClick={passwordUpdateModalHandler}>
                Decline
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdatePasswordModal;
