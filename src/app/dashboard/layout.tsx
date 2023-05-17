'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter();

  function logout(e: React.FormEvent) {
    e.preventDefault();

    if (sessionStorage.getItem("api_token")) {
      sessionStorage.removeItem("api_token")
    }

    if (localStorage.getItem("api_token")) {
      localStorage.removeItem("api_token")
    }

    router.push("/login");
  }

  function addNewProduct(e: React.FormEvent) {
    e.preventDefault();

    router.push("/dashboard/product");
  }

  useEffect(() => {
    let apiToken = sessionStorage.getItem("api_token")
      || localStorage.getItem("api_token");

    if (!apiToken) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="container">
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex justify-content-between">
            <Link href="/dashboard" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
              Logo
            </Link>

            <ul className="nav col-12 col-lg-auto ml-lg-auto mb-2 justify-content-end mb-md-0">
              <li><a href="#" onClick={addNewProduct} className="btn btn-success text-white btn-xs nav-link px-2 ">Add New Product</a></li>
              <li><a href="#" onClick={logout} className="nav-link px-2 link-secondary">Logout</a></li>
            </ul>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
