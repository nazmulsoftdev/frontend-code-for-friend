import React, { useState, useEffect } from "react";
import { Button, Modal, Select } from "flowbite-react";
import { Stepper } from "react-form-stepper";
import { useUpdateUserOrderMutation } from "../../featured/order/orderApi";
import toast from "react-hot-toast";

function AdminOrderListModal({ toggle, toggleModalHandler, itemData }) {
  const { _id, shippingInformation, dateOrdered, status } = itemData || {};

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

  const [orderStatusValue, setOrderStatusValue] = useState(status);

  const [updateUserOrder, { isSuccess, isError }] =
    useUpdateUserOrderMutation();

  // update orderStatus handler

  const updateOrderStatusHandler = () => {
    updateUserOrder({ id: _id, orderStatus: orderStatusValue });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order updated");
      toggleModalHandler();
    }
    if (isError) {
      toast.error("Opps something went wrong");
    }
  }, [isError, isSuccess]);

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
            <p>Division: {infoDivision}</p>
            <p>Post Code: {infoPostCode}</p>
            <p>Location area: {infoLocation}</p>
            <p>Order Data: {dateOrdered}</p>
            <div className="flex items-center space-x-2">
              <p>Status</p>
              <Select
                value={orderStatusValue}
                onChange={(e) => setOrderStatusValue(e.target.value)}
              >
                <option value="" hidden>
                  select
                </option>
                <option value="pending">pending</option>
                <option value="processing">processing</option>
                <option value="completed">completed</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button color="success" onClick={updateOrderStatusHandler}>
                Update
              </Button>
              <Button color="gray" onClick={toggleModalHandler}>
                Cancell
              </Button>
            </div>
            <Button color="blue">Print</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminOrderListModal;
