import React, { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  Spinner,
  Select,
  FileInput,
  Textarea,
} from "flowbite-react";
import toast from "react-hot-toast";
import { useAddNewProductMutation } from "../../featured/adminApi/adminApi";
function Admin() {
  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [inStock, setInStock] = useState("");

  const [imageURL, setImageURL] = useState("");

  const [description, setDescription] = useState("");

  const [addNewProduct, { isLoading, isSuccess, isError, error }] =
    useAddNewProductMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully added");
      resetHandler();
    }
    if (isError) {
      toast.error(error?.data?.message || "Opps something went wrong");
      console.log(error);
    }
  }, [isError, isSuccess, error]);

  // image input file handler

  const imageInputFileHandler = (e) => {
    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
      setImageURL(fileReader.result);
    });
    fileReader.readAsDataURL(e.target.files[0]);
  };

  // reset from handler
  const resetHandler = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setInStock("");
    setImageURL("");
  };

  //   submit handler

  const submitHandler = (e) => {
    e.preventDefault();
    if (!(name || price || description || inStock || category || imageURL)) {
      alert("All feilds are required");
    } else {
      addNewProduct({
        name,
        price,
        description,
        inStock: inStock == "Yes" ? true : false,
        category,
        imageURL,
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white border">
      <div className="w-[95%] m-auto md:w-[400px] md:m-auto lg:w-[400px] lg:m-auto">
        <form onSubmit={submitHandler}>
          <div className="mt-3 flex flex-col space-y-4">
            {/* Name */}
            <div>
              <TextInput
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Price */}
            <div>
              <TextInput
                type="number"
                required
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {/* Category */}
            <div>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option hidden>Category</option>
                <option value="Burger">Burger</option>
                <option value="Sandwich">Sandwich </option>
                <option value="Milkshake">Milkshake</option>
                <option value="Pizza">Pizza</option>
                <option value="Beverages">Beverages</option>
              </Select>
            </div>

            {/* InStock*/}
            <div>
              <Select
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
                required
              >
                <option hidden>InStock</option>
                <option value="Yes">Yes</option>
                <option value="No">No </option>
              </Select>
            </div>
            {/* Image File */}
            <div>
              <FileInput
                id="file-upload-helper-text"
                accept="image/*"
                required
                onChange={imageInputFileHandler}
              />
            </div>
            {/* description */}
            <div>
              <Textarea
                rows={10}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* Submit button */}
            <div>
              <Button className="w-full" type="submit">
                {isLoading ? (
                  <Spinner
                    color="failure"
                    aria-label="Failure spinner example"
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin;
