import React, { useState } from 'react';

function Login({ handleLogin, buttonText}) {
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

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }
    handleLogin(userData.email, userData.password);
  };

  return (
    <section className="auth">
      <form className="auth-form"
      onSubmit={handleSubmit}>
        <h2 className="auth-form__title">Вход</h2>
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
          aria-label="Вход"
        >
          {buttonText}
        </button>
      </form>
    </section>
  )
}
export default Login;
