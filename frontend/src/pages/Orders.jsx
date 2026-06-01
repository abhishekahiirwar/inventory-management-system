import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Orders() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
  });

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers/");
      setCustomers(res.data);
    } catch (error) {
      toast.error("Failed to load customers");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/");
      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to load orders");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createOrder = async (e) => {
    e.preventDefault();

    try {
      await api.post("/orders/", {
        customer_id: Number(form.customer_id),
        items: [
          {
            product_id: Number(form.product_id),
            quantity: Number(form.quantity),
          },
        ],
      });

      setForm({
        customer_id: "",
        product_id: "",
        quantity: "",
      });

      fetchOrders();
      fetchProducts();

      toast.success(
        "Order Created Successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          "Error Creating Order"
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Orders Management
      </h2>

      <div className="card shadow-sm p-4 mb-4">
        <h4 className="mb-3">
          Create Order
        </h4>

        <form onSubmit={createOrder}>
          <select
            className="form-control mb-3"
            name="customer_id"
            value={form.customer_id}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.full_name}
              </option>
            ))}
          </select>

          <select
            className="form-control mb-3"
            name="product_id"
            value={form.product_id}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Product
            </option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name} (Stock:{" "}
                {product.stock_quantity})
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            className="form-control mb-3"
            placeholder="Quantity"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-success"
          >
            Create Order
          </button>
        </form>
      </div>

      <div className="card shadow-sm p-3">
        <h4 className="mb-3">
          Order List
        </h4>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Total Amount</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center"
                  >
                    No Orders Found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {order.customer_id}
                    </td>
                    <td>
                      ₹ {order.total_amount}
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