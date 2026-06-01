import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    stock_quantity: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock_quantity: Number(form.stock_quantity),
      };

      if (editingId) {
        await api.put(
          `/products/${editingId}`,
          payload
        );

        toast.success(
          "Product Updated Successfully"
        );

        setEditingId(null);
      } else {
        await api.post(
          "/products/",
          payload
        );

        toast.success(
          "Product Added Successfully"
        );
      }

      setForm({
        name: "",
        sku: "",
        price: "",
        stock_quantity: "",
      });

      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          "Something went wrong"
      );
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete Product?"))
      return;

    try {
      await api.delete(`/products/${id}`);

      fetchProducts();

      toast.success(
        "Product Deleted Successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          "Something went wrong"
      );
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock_quantity: product.stock_quantity,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);

    setForm({
      name: "",
      sku: "",
      price: "",
      stock_quantity: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Product Management
      </h2>

      <div className="card shadow-sm p-4 mb-4">
        <h4 className="mb-3">
          {editingId
            ? "Update Product"
            : "Add Product"}
        </h4>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="SKU"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Stock Quantity"
            name="stock_quantity"
            type="number"
            min="0"
            value={form.stock_quantity}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
          >
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="card shadow-sm p-3">
        <h4 className="mb-3">
          Product List
        </h4>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    No Products Found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>

                    <td>{product.name}</td>

                    <td>{product.sku}</td>

                    <td>
                      ₹ {product.price}
                    </td>

                    <td>
                      {product.stock_quantity}
                    </td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          editProduct(product)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}