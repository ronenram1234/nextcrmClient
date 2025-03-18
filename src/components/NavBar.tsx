import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";

import { GlobalProps } from "../App";


interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  const {
    currentUser,
    isDarkMode,
    setIsDarkMode,
    setIsUsserLogedin,
    setSearchString,
    searchString,
    setSort
  } = useContext(GlobalProps);

  const navigate: NavigateFunction = useNavigate();
  const [txt, setTxt] = useState("");

  function handleDark() {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    setTxt(searchString);
  }, [searchString]);

 

  function init(): void {
     
   setSearchString(""); // Reset the searchString state
   setSort(""); // Reset the sort state
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-primary text-light"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink
            className="navbar-brand text-info text-light-emphasis"
            to="/"
            onClick={() => init()}
          >
            <div title="View all cards">NEXCRM</div>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/about"  onClick={() => init()}>
                    ABOUT
                  </NavLink>
                </li>
             
                <li>
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/favcards"
                    onClick={() => init()}
                  >
                    FAV CARDS
                  </NavLink>
                </li>
                {currentUser?.isBusiness && (
                  <li>
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/mycards"
                      onClick={() => init()}
                    >
                      MY CARDS
                      
                    </NavLink>
                  </li>
                )}
                {currentUser?.isAdmin && (
                 <li className="nav-item dropdown">
                 <a
                   className="nav-link dropdown-toggle"
                   href="#"
                   id="sandboxDropdown"
                   role="button"
                   data-bs-toggle="dropdown"
                   aria-expanded="false"
                   onClick={(e) => e.preventDefault()} // Prevent default navigation on dropdown toggle
                 >
                   SANDBOX
                 </a>
                 <ul className="dropdown-menu" aria-labelledby="sandboxDropdown">
                   <li>
                     <NavLink
                       className="dropdown-item"
                       to="/sandbox/adminusers"
                       onClick={() => init()}
                     >
                       All Users
                     </NavLink>
                   </li>
                   <li>
                     <NavLink
                       className="dropdown-item"
                       to="/sandbox/admincards"
                       onClick={() => init()}
                     >
                       All Cards
                     </NavLink>
                   </li>
                   <li>
                     <NavLink
                       className="dropdown-item"
                       to="/sandbox/adminstats"
                       onClick={() => init()}
                     >
                       Admin Dashboard
                     </NavLink>
                   </li>
                 </ul>
               </li>
                )}
              </ul>
    
              

              <form
                className="d-flex mx-auto"
                role="search"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="form-control me-2 text-light"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={txt}
                  onChange={(e) => {
                    setTxt(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    setSearchString(txt);
                    // console.log(txt);
                  }}
                >
                  Search
                </button>
              </form>
              {isDarkMode ? (
                <i
                  className="fa-solid fa-moon"
                  onClick={() => handleDark()}
                  style={{ width: "10px", margin: "10px", color: "black" }}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-sun"
                  onClick={() => handleDark()}
                  style={{ width: "10px", margin: "10px", color: "white" }}
                ></i>
              )}
              <img
                src={currentUser?.image.url}
                className="img-fluid mx-3"
                alt={currentUser?.image.alt}
                style={{ width: "20px", height: "20px", borderRadius: "50%" }}
              />

              <form className="d-flex" role="search">
                <button
                  className="btn btn-outline-info"
                  type="submit"
                  onClick={() => {
                    localStorage.removeItem("crmUserId");
                    setIsUsserLogedin(false);
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </form>
            </>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
