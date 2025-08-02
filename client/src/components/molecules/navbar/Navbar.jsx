import React, { useEffect, useState, useRef } from "react";
import logo from "../../../assets/logo.png";
import { Icon } from "@iconify/react";
import style from "./Navbar.module.scss";
import Button from "../../atoms/buttons/Button";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginPopup } from "../../../store/slices/popUpSlice";
import { logoutUser } from "../../../api/user";
import fetchUser from "../../../store/actions/user.actions";
import { toast } from "react-toastify";
import { userLogout } from "../../../store/slices/userSlice";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSearch = () => {
    const value = searchRef.current?.value.trim();
    if (!searchOpen) {
      setSearchOpen((prev) => !prev);
      return;
    }
    if (value) {
      navigate(`/search?query=${value}`);
      searchRef.current.value = "";
    } else {
      setSearchOpen(false);
    }
  };

  const handleAuthButton = async () => {
    try {
      if (user?.email) {
        const res = await logoutUser();
        // console.log({ res });
        if (res.status === 200) {
          toast.success("Logout Successfully");
          dispatch(userLogout());
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        dispatch(toggleLoginPopup());
      }
    } catch (error) {
      console.log("Logout Error: ", error);
      dispatch(userLogout());
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const hasAuthCookie = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("auth-token="));
    if (hasAuthCookie) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  useEffect(() => {
    const closeDropdown = (e) => {
      // Check if the click is outside the user menu
      if (showDropdown && !e.target.closest('[data-user-menu]')) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("click", closeDropdown);
    }
    return () => document.removeEventListener("click", closeDropdown);
  }, [showDropdown]);

  return (
    <article className={style.navbar}>
      {/* left side */}
      <img src={logo} alt="logo" />

      {/* Middle */}
      <nav className={style.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? style.active : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? style.active : "")}
        >
          Movies
        </NavLink>
        <NavLink>Theaters</NavLink>
        <NavLink>Releases</NavLink>
      </nav>

      {/* right side */}
      <div className={style.right}>
        <div className={style.search}>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search Movies"
            className={searchOpen ? style.searchbar : style.hideSearchbar}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <Icon
            icon="ic:outline-search"
            onClick={handleSearch}
            className={searchOpen ? style.active : ""}
          />
        </div>

        {user?.email ? (
          <div className={style.userMenu} data-user-menu>
            <Icon
              icon="teenyicons:user-circle-solid"
              className={style.userIcon}
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown((prev) => !prev);
              }}
            />
            {showDropdown && (
              <div className={`${style.dropdown} ${style.show}`}>
                <p onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(false);
                  navigate("/my-booking");
                }}>
                  <Icon 
                  icon="lets-icons:ticket-alt"
                  style={{ marginRight: "8px" , color: "black"}} 
                  />
                  My Bookings</p>
                <p onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(false);
                  navigate("/wishlist");
                }}>
                  <Icon 
                  icon="mdi:heart-outline"
                  style={{ marginRight: "8px" , color: "black"}} 
                  />
                  Wishlist</p>

                <p onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(false);
                  handleAuthButton();
                }}>
                   <Icon 
                   icon="mdi-light:logout"
                    style={{ marginRight: "8px" , color: "black"}} 
                  />
                  Logout</p>
              </div>
            )}
          </div>
        ) : (
          <Button text="Log In" clickHandler={handleAuthButton} />
        )}
      </div>
    </article>
  );
};

export default Navbar;
