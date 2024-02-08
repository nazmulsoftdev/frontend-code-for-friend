import { Avatar } from "flowbite-react";
import React from "react";
import { FaStar as StarIcon } from "react-icons/fa";
Avatar;
function ReviewCard({ authorId, rating, review }) {
  // ratting

  let content = rating;

  if (content > 0) {
    content = [...Array(content)].map((item, index) => {
      return (
        <div key={index}>
          <StarIcon size={20} color={"gold"} />
        </div>
      );
    });
  }

  return (
    <div className="mt-7 flex items-center gap-3">
      <Avatar
        img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvHlQmlatM6RQINXLB5lPaVB7JpaF3rWduZQ&usqp=CAU"
        alt="avatar of Jese"
        rounded
      />
      <div>
        <div className="flex flex-row items-center gap-2">{content}</div>
        <p>{review}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
