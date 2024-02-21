/* eslint-disable react/prop-types */

export default function ProductList({ products, onDetails }) {
  return (
    <div className="m-2  sticky top-10 left-0">
      <h2 className="text-3xl my-2 text-center text-orange-500">
        Product List
      </h2>{" "}
      <div className="h-[100vh] overflow-auto">
        <ul className="flex flex-wrap justify-around w-full">
          {products &&
            products.map((product) => (
              <li
                key={product.id}
                className="flex flex-col items-center m-2 border rounded-sm flex-grow"
              >
                <img
                  className="object-cover min-h-[160px] max-h-[160px] w-full rounded-sm"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <p className="text-xl my-3">{product.title}</p>
                <b
                  className="mb-3 cursor-pointer bg-lime-700 py-2 px-6 rounded-md text-slate-50 font-normal"
                  onClick={() => onDetails(product.id)}
                >
                  View Details
                </b>
              </li>
            ))}
        </ul>
        {/* <div className="flex">
        {products.prev && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.prev)}
          >
            {" "}
            Prev{" "}
          </button>
        )}
        {products.next && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.next)}
          >
            {" "}
            Next{" "}
          </button>
        )}
      </div> */}
      </div>
    </div>
  );
}
