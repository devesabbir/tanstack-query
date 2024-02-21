import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import ProductDetails from "../components/ProductDetails";
import ProductList from "../components/ProductList";
import { useState } from "react";
import AddEditProduct from "../components/AddEditProduct";
import { ProductsProvider } from "../provider/ProductsProvider";

const fetchProducts = async ({ queryKey }) => {
  const response = await api.get(`/${queryKey[0]}`);
  return response.data;
};

export default function HomePage() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [singleProductID, setSingleProductID] = useState(null);

  const handleProductDetails = (id) => {
    setSingleProductID(id);
  };

  return (
    <ProductsProvider>
      <div className="flex justify-center gap-4">
        <div className="basis-3/12">
          <AddEditProduct />
        </div>
        <div className={`${singleProductID ? "basis-6/12" : "basis-9/12"}`}>
          <ProductList products={products} onDetails={handleProductDetails} />
        </div>
        {singleProductID && (
          <div className="basis-3/12">
            {singleProductID && (
              <ProductDetails
                id={singleProductID}
                onClose={handleProductDetails}
              />
            )}
          </div>
        )}
      </div>
    </ProductsProvider>
  );
}
