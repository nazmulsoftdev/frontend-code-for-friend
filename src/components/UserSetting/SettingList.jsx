import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import UpdateAvatarModal from "./UpdateAvatarModal";
import UpdatePasswordModal from "./UpdatePasswordModal";
function SettingList() {
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);

  //   open Avatar update modal

  const avatarModalHanlder = () => {
    setOpenAvatar(!openAvatar);
  };

  // open password update modal

  const passwordUpdateModalHandler = () => {
    setOpenPassword(!openPassword);
  };

  return (
    <>
      <div className="w-[95%] m-auto md:w-[40%] md:m-auto lg:w-[45%] lg:m-auto">
        <div className="w-full border p-5 flex flex-col space-y-2">
          {/* Update avatar  */}
          <Card className="w-full h-[50px]  cursor-auto ">
            <div className="flex flex-row justify-between items-center">
              <h2>Update Avatar</h2>
              <Button onClick={avatarModalHanlder} className="rounded-full">
                Edit
              </Button>
            </div>
          </Card>
          {/* Change password  */}
          <Card className="w-full  h-[50px] cursor-auto ">
            <div className="flex flex-row justify-between items-center">
              <h2>Change Password</h2>
              <Button
                onClick={passwordUpdateModalHandler}
                className="rounded-full"
              >
                Edit
              </Button>
            </div>
          </Card>
          {/* update Profile  */}
          <Card className="w-full  h-[50px] cursor-auto ">
            <div className="flex flex-row justify-between items-center">
              <h2>Update Profile</h2>
              <Button className="rounded-full">Edit</Button>
            </div>
          </Card>
          {/* update Location  */}
          <Card className="w-full  h-[50px] cursor-auto ">
            <div className="flex flex-row justify-between items-center">
              <h2>Update Address</h2>
              <Button className="rounded-full">Edit</Button>
            </div>
          </Card>
        </div>
      </div>
      {/* Avatar Modal */}
      {openAvatar && (
        <UpdateAvatarModal
          openAvatar={openAvatar}
          avatarModalHanlder={avatarModalHanlder}
        />
      )}
      {/* Password Modal */}
      {openPassword && (
        <UpdatePasswordModal
          openPassword={openPassword}
          passwordUpdateModalHandler={passwordUpdateModalHandler}
        />
      )}
    </>
  );
}

export default SettingList;
