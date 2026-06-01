import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers/");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load customers");
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
      if (editingId) {
        await api.put(
          `/customers/${editingId}`,
          form
        );

        toast.success(
          "Customer Updated Successfully"
        );

        setEditingId(null);
      } else {
        await api.post(
          "/customers/",
          form
        );

        toast.success(
          "Customer Added Successfully"
        );
      }

      setForm({
        full_name: "",
        email: "",
        phone: "",
      });

      fetchCustomers();
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
        "Something went wrong"
      );
    }
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete Customer?"))
      return;

    try {
      await api.delete(
        `/customers/${id}`
      );

      fetchCustomers();

      toast.success(
        "Customer Deleted Successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
        "Error deleting customer"
      );
    }
  };

  const editCustomer = (customer) => {
    setEditingId(customer.id);

    setForm({
      full_name: customer.full_name,
      email: customer.email,
      phone: customer.phone,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);

    setForm({
      full_name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Customer Management
      </h2>

      <div className="card shadow-sm p-4 mb-4">

        <h4 className="mb-3">
          {editingId
            ? "Update Customer"
            : "Add Customer"}
        </h4>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            placeholder="Full Name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
          >
            {editingId
              ? "Update Customer"
              : "Add Customer"}
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
          Customer List
        </h4>

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {customers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No Customers Found
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id}>

                    <td>{customer.id}</td>

                    <td>{customer.full_name}</td>

                    <td>{customer.email}</td>

                    <td>{customer.phone}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          editCustomer(customer)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteCustomer(customer.id)
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