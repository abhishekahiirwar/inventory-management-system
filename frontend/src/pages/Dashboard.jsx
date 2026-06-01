import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    low_stock_products: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard/");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2 className="fw-bold"><i className="bi bi-columns-gap"></i> Dashboard</h2>

        <p className="text-muted">Inventory & Order Management Overview</p>
      </div>

      <div className="row g-4">
        {/* Products */}
        <div className="col-md-3">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderLeft: "5px solid #0d6efd",
            }}
          >
            <div className="card-body">
              <h6 className="text-muted">Total Products</h6>

              <h2 className="fw-bold text-primary">{stats.total_products}</h2>

              <p className="mb-0">
                <i className="bi bi-box-seam"></i> Products Available
              </p>
            </div>
          </div>
        </div>

        {/* Customers */}
        <div className="col-md-3">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderLeft: "5px solid #198754",
            }}
          >
            <div className="card-body">
              <h6 className="text-muted">Total Customers</h6>

              <h2 className="fw-bold text-success">{stats.total_customers}</h2>

              <p className="mb-0">
                <i className="bi bi-people"></i> Registered Customers
              </p>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="col-md-3">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderLeft: "5px solid #fd7e14",
            }}
          >
            <div className="card-body">
              <h6 className="text-muted">Total Orders</h6>

              <h2 className="fw-bold text-warning">{stats.total_orders}</h2>

              <p className="mb-0">
                <i className="bi bi-cart-check"></i>
                Orders Processed
              </p>
            </div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="col-md-3">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderLeft: "5px solid #dc3545",
            }}
          >
            <div className="card-body">
              <h6 className="text-muted">Low Stock</h6>

              <h2 className="fw-bold text-danger">
                {stats.low_stock_products}
              </h2>

              <p className="mb-0"><i className="bi bi-exclamation-triangle"></i> Need Restocking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 mt-5">
        <div className="card-body">
          <h4 className="mb-3"><i class="bi bi-graph-up"></i> System Summary</h4>

          <p className="text-muted mb-0">
            This dashboard provides a real-time overview of products, customers,
            orders, and inventory status within the system.
          </p>
        </div>
      </div>
    </div>
  );
}
