import React from "react";
import { Avatar, Spinner } from "flowbite-react";
import { useUserInfoQuery } from "../featured/user/userApi";
import AvatarSkeleton from "../UI/AvatarSkeleton";
function AvatarIcon() {
  const { data, isLoading, isError, error } = useUserInfoQuery();

  const { avatar } = data?.data || {};

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <AvatarSkeleton />;
  } else if (!isLoading && isError) {
    content = "Error";
  } else if (!isLoading && !isError && data?.data) {
    content = (
      <Avatar
        alt="User settings"
        img={
          avatar
            ? avatar
            : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        }
        rounded
        className="w-[50px] h-[50px]"
      />
    );
  }

  return <div>{content}</div>;
}

export default AvatarIcon;
