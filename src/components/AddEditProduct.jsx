import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { ProductsContext } from "../context";

const addProduct = async (data) => {
  const response = await api.post(`/products/`, data);
  return response.data;
};

const updateProduct = async (data) => {
  const response = await api.patch(`/products/${data.id}`, data);
  return response.data;
};

export default function AddEditProduct() {
  const { editProducts } = useContext(ProductsContext);
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editProducts.id ? updateProduct : addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "number"
        ? event.target.valueAsNumber
        : event.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submitData = (event) => {
    event.preventDefault();
    if (editProducts.id) {
      const newData = { ...state };
      mutation.mutate(newData);
      resetForm();
    } else {
      const newData = { ...state, id: crypto.randomUUID().toString() };
      mutation.mutate(newData);
      resetForm();
    }
  };

  const resetForm = () => {
    setState({
      title: "",
      description: "",
      price: 0,
      rating: 5,
      thumbnail: "",
    });
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (editProducts.id) {
        setState({ ...editProducts });
      } else {
        resetForm();
      }
    }

    return () => {
      ignore = true;
    };
  }, [editProducts]);

  return (
    <div className="m-2 sticky top-0 left-0">
      <h2 className="text-3xl my-2 text-center text-orange-500">
        Add a Product
      </h2>
      {mutation.isSuccess && <p>Product Added!</p>}
      <form className="flex flex-col" onSubmit={submitData}>
        <input
          type="text"
          value={state?.title}
          name="title"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product title"
        />
        <textarea
          value={state?.description}
          name="description"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product description"
        />

        <input
          type="number"
          value={state?.price}
          name="price"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product price"
        />
        <input
          type="text"
          value={state?.thumbnail}
          name="thumbnail"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product thumbnail URL"
        />

        <button
          type="submit"
          className="bg-black m-auto text-white text-xl p-1 rounded-md w-full"
        >
          {editProducts.id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
