function PopupWithImage({ card, onClose, onOverlayClick }) {
  return (
    <section className={ card
    ? `popup popup_opened popup-image`
    : `popup popup-image`
  }
    onClick={onOverlayClick}>
      <div className="popup__card">
        <button className="popup__closebtn popup__closebtn_fullscreen" 
        type="button" id="imagePopupClose" onClick={onClose}></button>
        <img className="popup__photo"
        src={card ? card.link : '#'}
        alt={card ? card.name : ''} />
        <div className="popup__subtitle">
        {card ? card.name : ''}</div>
      </div>
    </section>
  );
}

export default PopupWithImage;