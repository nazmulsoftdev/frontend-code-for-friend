import React, { useState, useEffect } from "react";
import { Label, Select, TextInput, Textarea } from "flowbite-react";
import { useDispatch } from "react-redux";
import {
  addShippingDivisionInfo,
  addShippingLocationInfo,
  addShippingNameInfo,
  addShippingPhoneInfo,
  addShippingPostCodeInfo,
} from "../../featured/shipping/shippingSlice";

function ShippingAddress() {
  const [infoName, setName] = useState("");
  const [infoPhone, setPhone] = useState("");
  const [infoPostCode, setPostCode] = useState("");
  const [infoDivision, setDivision] = useState("");
  const [infoLocation, setLocation] = useState("");

  const dispatch = useDispatch("");

  // infoName  handler
  const infoNameHandler = (e) => {
    setName(e.target.value);
    dispatch(addShippingNameInfo(e.target.value));
  };

  // infoPhone handler

  const infoPhoneHandler = (e) => {
    setPhone(e.target.value);
    dispatch(addShippingPhoneInfo(e.target.value));
  };

  // infoPostCode handler

  const infoPostCodeHandler = (e) => {
    setPostCode(e.target.value);
    dispatch(addShippingPostCodeInfo(e.target.value));
  };

  // infoDivision handler

  const infoDivisionHandler = (e) => {
    setDivision(e.target.value);
    dispatch(addShippingDivisionInfo(e.target.value));
  };

  // infoLocation handler

  const infoLocationHandler = (e) => {
    setLocation(e.target.value);
    dispatch(addShippingLocationInfo(e.target.value));
  };

  return (
    <>
      <div className="w-full p-3">
        <div className="mb-5 flex justify-start items-center">
          <h3 className="text-3xl font-bold">Shipping Information</h3>
        </div>
        <div className="flex flex-col space-y-5">
          {/* Name */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Shipping Name" />
            </div>
            <TextInput
              type="text"
              required
              value={infoName}
              onChange={infoNameHandler}
            />
          </div>
          {/* Phone */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Shipping Phone" />
            </div>
            <TextInput
              type="number"
              required
              value={infoPhone}
              onChange={infoPhoneHandler}
            />
          </div>
          {/* Post code */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Post Code" />
            </div>
            <TextInput
              type="number"
              required
              maxLength={4}
              value={infoPostCode}
              onChange={infoPostCodeHandler}
            />
          </div>
          {/* Division */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Division" />
            </div>
            <Select
              value={infoDivision}
              onChange={infoDivisionHandler}
              required
            >
              <option hidden>select</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Barisal">Barisal</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Khulna">Khulna</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Sylhet">Sylhet</option>
            </Select>
          </div>
          {/* Location */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Shipping Point" />
            </div>
            <Textarea
              required
              rows={3}
              value={infoLocation}
              onChange={infoLocationHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippingAddress;
