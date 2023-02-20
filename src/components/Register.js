import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister, buttonText}) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleUserDataChange(evt) {
    const { name, value } = evt.target;

  setUserData({
    ...userData,
    [name]: value,
  });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(userData.email, userData.password);
  };

  return (
    <section className="auth">
      <form className="auth-form"
      onSubmit={handleSubmit}>
        <h2 className="auth-form__title">Регистрация</h2>
        <input
        className="auth-form__input"
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleUserDataChange}
        value={userData.email || ''}
        />
        <input
        className="auth-form__input"
        type="password"
        name="password"
        placeholder="Пароль"
        required
        onChange={handleUserDataChange}
        value={userData.password || ''}
        />
        <button
          className="auth-form__savebtn popup__savebtn"
          type="submit"
          aria-label="Зарегистрироваться"
        >
          {buttonText}
        </button>
        <span className="auth-form__ask">
          Уже зарегистрированы?
          <Link
            to="/sign-in"
            className="auth-form__link"
          >
            Войти
          </Link>
        </span>
      </form>
    </section>
  )
}
export default Register;
