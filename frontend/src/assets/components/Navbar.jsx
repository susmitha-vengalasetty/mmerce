import React,{ useState, useContext} from "react";
import Logo from "../../assets/logo.jpg"; 
import Search from "../../assets/search.jpg";
import shop_cart from "../../assets/shop_cart.jpg";
import Person from "../../assets/person.jpg";
import { Link, NavLink, useLocation} from "react-router-dom";
import menu_icon from "../../assets/menu_icon.jpg";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    logout
  } = useContext(ShopContext);
  const location = useLocation();
  const isAuthPage = location.pathname === "/login";

  return (
    <>
      <div className="flex items-center justify-between py-4 font-medium px-4 relative">
        <Link to="/">
          <img src={Logo} alt="logo" className="h-12 w-24 object-contain" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 text-center">
          <NavLink to="/" className="flex flex-col items-center gap-2">
            <p>HOME</p>
          </NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-2">
            <p>COLLECTION</p>
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-2">
            <p>ABOUT</p>
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-2">
            <p>CONTACT</p>
          </NavLink>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center px-3 gap-3">
          <img
            onClick={() => setShowSearch(true)}
            src={Search}
            className="h-10 w-10 cursor-pointer"
            alt="search_icon"
          />

          {/* Profile + Dropdown */}
          <div className="relative">
            <img
              src={Person}
              className="h-10 w-14 cursor-pointer"
              alt="profile_icon"
              onClick={() => {
                if (!token) {
                  navigate("/login");
                } else {
                  setProfileOpen(prev => !prev);
                }
              }}
            />

            {token && profileOpen && (
              <div className="absolute right-0 mt-2 z-50">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => {
                      navigate("/profile");
                      setProfileOpen(false);
                    }}
                  >
                    My Profile
                  </p>

                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => {
                      navigate("/orders");
                      setProfileOpen(false);
                    }}
                  >
                    Orders
                  </p>

                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={shop_cart} className="h-10 w-10" alt="cart" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu */}
          {!isAuthPage && (
          <img
            src={menu_icon}
            className="w-8 cursor-pointer md:hidden ml-3"
            alt="menu_bar"
            onClick={() => setMenuOpen(!menuOpen)}
          />
         )}
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-8 text-lg text-gray-700 z-40 md:hidden">
            <button
              className="absolute top-4 right-6 text-3xl font-bold"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>

            <NavLink to="/" onClick={() => setMenuOpen(false)}>HOME</NavLink>
            <NavLink to="/collection" onClick={() => setMenuOpen(false)}>COLLECTION</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>ABOUT</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>CONTACT</NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
