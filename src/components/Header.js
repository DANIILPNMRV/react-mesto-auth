import logo from "../images/Mesto-Logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место Россия" className="header__logo" />
      <div className="header__menu">
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link className="header__authbtn" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            path="sign-up"
            element={
              <Link className="header__authbtn" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <p className="header__email">{email}</p>
                <button
                  type="button"
                  className="header__navigatebtn"
                  onClick={onSignOut}
                >
                  Выйти
                </button>
              </>
            }
          />
        </Routes>
      </div>
    </header>
  );
}
export default Header;
