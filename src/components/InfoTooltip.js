import React from 'react';
import checkIcon from '../images/check.png';
import failIcon from '../images/fail.png';

function InfoTooltip({ isOpen, onClose, isSuccessful, onOverlayClick }) {
  const resultText = `${ isSuccessful ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так! Попробуйте ещё раз.`}`;
  const resultIcon = `${ isSuccessful ? checkIcon : failIcon }`;

  return (
    <section
    className={`popup ${isOpen ? 'popup_opened' : ''}`}
    onClick={onOverlayClick}>
    <div className="popup__area">
      <button 
      type="button"
      className="popup__closebtn"
      onClick={onClose}/>
      <img
      className="popup__icon"
      src={resultIcon}
      alt={resultText} />
      <p className="popup__infotooltip">{resultText}</p>
    </div>
    </section>
  );
}
export default InfoTooltip;
