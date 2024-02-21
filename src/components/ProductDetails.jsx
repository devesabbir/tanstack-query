/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { useContext } from "react";
import { ProductsContext } from "../context";

const fetchSingleProduct = async ({ queryKey }) => {
  const response = await api.get(`/products/${queryKey[1]}`);

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export default function ProductDetails({ id, onClose }) {
  const queryClient = useQueryClient();
  const { data: product } = useQuery({
    queryKey: ["products", id],
    queryFn: fetchSingleProduct,
  });

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      onClose(null);
      queryClient.invalidateQueries(["products"]);
    },
  });

  const { setEditProducts } = useContext(ProductsContext);

  const handleDelete = async (id) => {
    await mutation.mutateAsync(id);
  };

  return (
    <div className="m-2 sticky top-0 left-0">
      <h1 className="text-3xl my-2 text-center text-orange-500">
        Product Details
      </h1>

      <div className="border bg-gray-100  text-md rounded flex flex-col p-4">
        <div className="text-right">
          {" "}
          <span
            onClick={() => {
              onClose(null);
              setEditProducts({});
            }}
            className="font-bold text-red-400 cursor-pointer"
          >
            {" "}
            &#x2715;
          </span>
        </div>

        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="object-cover h-24 w-24 border rounded-full m-auto"
        />
        <p>{product?.title}</p>
        <p>{product?.description}</p>
        <p>USD {product?.price}</p>
        <p>{product?.rating}/5</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditProducts(product)}
            className="bg-green-400  text-slate-50 py-1 px-3 rounded-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(product.id)}
            className="bg-red-400 text-slate-50 py-1 px-3 rounded-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
