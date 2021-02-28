import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createProduct } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const AddProduct = () => {
  const { user, token } = isAutheticated();
  var formData = new FormData();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
    file: null,
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    file,
  } = values;

  const preload = () => {
    getCategories().then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(name, description, file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", file);
    formData.append("category", category);
    console.log(formData.getAll("file"));
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      console.log("data", data);
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
          file: null,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "file" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group d-grid gap-2 p-2">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("file")}
            type="file"
            name="file"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group p-2">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group p-2">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group p-2">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group p-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="d-grid gap-2 p-2">
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-3"
        >
          Create Product
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
