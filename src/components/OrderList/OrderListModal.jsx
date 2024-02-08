import React from "react";
import { Button, Modal } from "flowbite-react";
import { Stepper } from "react-form-stepper";

function OrderListModal({ toggle, toggleModalHandler, itemData }) {
  const { shippingInformation, dateOrdered, status } = itemData || {};

  const { infoDivision, infoLocation, infoName, infoPhone, infoPostCode } =
    shippingInformation || {};

  // order status controll

  let orderStatus = 0;
  if (status === "pending") {
    orderStatus = 0;
  } else if (status === "processing") {
    orderStatus = 1;
  } else if (status === "completed") {
    orderStatus = 2;
  }

  return (
    <>
      <Modal show={toggle} onClose={toggleModalHandler}>
        <Modal.Header>Order Status</Modal.Header>
        <Modal.Body>
          <div>
            <Stepper
              steps={[
                { label: "pending" },
                { label: "processing" },
                { label: "completed" },
              ]}
              activeStep={orderStatus}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <p>Shipping Name: {infoName}</p>
            <p>Phone: {infoPhone}</p>
            <p>Post Code: {infoPostCode}</p>
            <p>Location area: {infoLocation}</p>
            <p>Order Data: {dateOrdered}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={toggleModalHandler}>
            Cancell
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderListModal;
