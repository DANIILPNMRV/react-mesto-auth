import logo from "../images/Mesto-Logo.svg";
import { Routes, Route, Link } from 'react-router-dom';

function Header({ email, onSignOut}) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место Россия" className="header__logo" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link
              className="header__authbtn"
              to="/sign-up"
            >
              Регистрация
            </Link>
          }
        />
        <Route
          path="sign-up"
          element={
            <Link
              className="header__authbtn"
              to="/sign-in"
            >
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div className="header__menu">
                <p className="header__email">{email}</p>
                <button
                  type="button"
                  className="header__navigatebtn"
                  onClick={onSignOut}
                >
                  Выйти
                </button>
              </div>
            </>
          }
        />
      </Routes>
    </header>
  );
}
export default Header;