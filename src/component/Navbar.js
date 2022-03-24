import React, { useEffect, useState } from "react";
import { Route, Router, NavLink, Switch } from "react-router-dom";

const adminNav = [
  { name: "Home", path: "/home" },
  { name: "samples", path: "/details" },
  { name: "Creat_sample", path: "/sample" },
  { name: "registration", path: "/register" },
  { name: "logout", path: "/logout" },
];

const userNav = [
  { name: "Home", path: "/home" },
  { name: "user", path: "/details" },
  { name: "logout", path: "/logout" },
];

const Nav = [
  {name:"login",path: "/login"}
]
function Navbar() {
  const [navbar, setNavbar] = useState([]);

  useEffect(async () => {
    const role = await localStorage.getItem("role");
    if (role === "user") {setNavbar(userNav)}
    else if(role==="admin"){
      setNavbar(adminNav);
    } else{
      setNavbar(Nav);

    }
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Laboratory
          </a>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {navbar?.map((val,ind) => (
                  <li key={ind} className="nav-item">
                    <NavLink   className="nav-link" to={val.path}>
                      {val.name}
                    </NavLink>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
