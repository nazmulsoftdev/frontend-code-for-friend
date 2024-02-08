import React, { useEffect, useState } from "react";
import { Button, Modal, Textarea } from "flowbite-react";
import { FaStar as StarIcon } from "react-icons/fa";
import { useAddOrderReviewMutation } from "../../featured/review/reviewApi";
import toast from "react-hot-toast";

function OrderItemReviewModal({
  reviewToggle,
  reviewToggleHandler,
  productId,
}) {
  const [rating, setRating] = useState(0);
  const [review, setReviewText] = useState("");

  const [addOrderReview, { isSuccess, isError }] = useAddOrderReviewMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Thank's for your review");
      reviewToggleHandler();
    }
    if (isError) {
      toast.error("Opps something went wrong");
    }
  }, [isSuccess, isError]);

  function ReviewSubmitForm(e) {
    e.preventDefault();
    if (review.length > 40) {
      alert("review text allow only 40 characters");
    } else {
      addOrderReview({ rating, review, productId });
    }
  }

  return (
    <>
      <Modal size="md" show={reviewToggle} onClose={reviewToggleHandler}>
        <Modal.Header>Review</Modal.Header>
        <Modal.Body>
          <form onSubmit={ReviewSubmitForm}>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-4">
                {[...Array(5)].map((item, index) => {
                  index += 1;
                  return (
                    <div key={index}>
                      <StarIcon
                        size={25}
                        onClick={() => setRating(index)}
                        className="cursor-pointer"
                        color={index <= rating ? "green" : "red"}
                      />
                    </div>
                  );
                })}
              </div>
              {/* Comments Box */}
              <div>
                <Textarea
                  placeholder="Comments"
                  value={review}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-2">
              <Button type="submit">Submit</Button>
              <Button color="gray" onClick={reviewToggleHandler}>
                Decline
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OrderItemReviewModal;
