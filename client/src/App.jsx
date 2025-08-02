import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Pages from "./pages/Index.jsx";
import Layout from "./layout/Layout.jsx";
import LoginPopup from "./popups/Login.jsx";
import RegisterPopup from "./popups/Register.jsx";
import Modal from "./components/molecules/Modal/Modal.jsx";
import {
  closeLoginPopup,
  closeRegisterPopup,
} from "./store/slices/popUpSlice.js";
import fetchUser from "./store/actions/user.actions.js";
import AuthRoute from "./routes/AuthRoute.jsx";
import NonAuthRoute from "./routes/NonAuthRoute.jsx";

function App() {
  const dispatch = useDispatch();

  const { loginPopup, registerPopup } = useSelector((state) => state.popup);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>
      {/* Login Modal */}
      <Modal isOpen={loginPopup} onClose={() => dispatch(closeLoginPopup())}>
        <LoginPopup />
      </Modal>

      {/* Register Modal */}
      <Modal
        isOpen={registerPopup}
        onClose={() => dispatch(closeRegisterPopup())}
      >
        <RegisterPopup />
      </Modal>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pages.Home />} />
          <Route path="movies" element={<Pages.MoviesPage />} />
          <Route path="movies/:id" element={<Pages.MovieDetails />} />
          <Route path="/search" element={<Pages.Search />} />
          <Route
            path="/movies/:id/:selectedDate"
            element={<Pages.SeatSelection />}
          />
          <Route
            path="/wishlist"
            element={
              <AuthRoute>
                <Pages.WishList />
              </AuthRoute>
            }
          />
          <Route
            path="/my-booking"
            element={
              <AuthRoute>
                <Pages.MyBooking />
              </AuthRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
