import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner, Avatar } from "flowbite-react";
import { FaFileUpload as UploadIcon } from "react-icons/fa";
import {
  useUploadUserAvatarMutation,
  useUserInfoQuery,
} from "../../featured/user/userApi";
import toast from "react-hot-toast";

function UpdateAvatarModal({ openAvatar, avatarModalHanlder }) {
  const [avatarFile, setAvatarFile] = useState("");

  const [uploadUserAvatar, { isLoading, isError, isSuccess, error }] =
    useUploadUserAvatarMutation();
  const { data } = useUserInfoQuery();

  const { avatar: currentAvatar } = data?.data || {};

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Opps something went wrong");
    }
    if (isSuccess) {
      toast.success("Avatar uploaded");
      avatarModalHanlder();
    }
  }, [isError, isSuccess, error]);

  const avatarFileHandler = (e) => {
    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
      setAvatarFile(fileReader.result);
    });
    fileReader.readAsDataURL(e.target.files[0]);
  };

  // form submit handler

  const avatarSubmitHandler = (e) => {
    e.preventDefault();
    if (!avatarFile) {
      toast.error("Avatar is required");
    } else {
      uploadUserAvatar({ avatar: avatarFile, currentAvatar });
    }
  };

  return (
    <div>
      <Modal show={openAvatar} onClose={avatarModalHanlder}>
        <Modal.Header>Update Avatar</Modal.Header>
        <Modal.Body>
          <form onSubmit={avatarSubmitHandler}>
            <div className="flex flex-col justify-center items-center space-y-3">
              <img
                alt="User settings"
                src={avatarFile ? avatarFile : currentAvatar}
                className="w-[100px] h-[100px] rounded-full"
              />

              <div className="w-full flex justify-center items-center">
                <Button
                  disabled={!avatarFile}
                  className="cursor-pointer w-full"
                  type="submit"
                >
                  {isLoading ? (
                    <Spinner
                      color="failure"
                      aria-label="Failure spinner example"
                    />
                  ) : (
                    "Upload"
                  )}
                </Button>
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={avatarFileHandler}
                  />
                  <UploadIcon
                    color="green"
                    size={30}
                    className="cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateAvatarModal;
