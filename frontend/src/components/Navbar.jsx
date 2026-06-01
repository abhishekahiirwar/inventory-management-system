import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
        <i className="bi bi-box-seam"></i>Inventory Management System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/"
                    ? "active fw-bold"
                    : ""
                }`}
                to="/"
              >
               <i class="bi bi-speedometer2"></i>  Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/products"
                    ? "active fw-bold"
                    : ""
                }`}
                to="/products"
              >
                <i className="bi bi-box-seam"></i> Products
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/customers"
                    ? "active fw-bold"
                    : ""
                }`}
                to="/customers"
              >
               <i className="bi bi-people"></i>  Customers
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/orders"
                    ? "active fw-bold"
                    : ""
                }`}
                to="/orders"
              >
               <i className="bi bi-cart-check"></i> Orders
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}