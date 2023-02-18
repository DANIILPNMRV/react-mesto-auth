function PopupWithForm({
  isOpen,
  title,
  name,
  buttonText,
  onClose,
  onOverlayClick,
  children,
  onSubmit,
}) {
  return (
    <section
      className={
        isOpen ? `popup popup_opened popup-${name}` : `popup popup-${name}`
      }
      onClick={onOverlayClick}
    >
      <div className="popup__area">
        <button
          className="popup__closebtn"
          type="button"
          id="picturePopupClose"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form ${name}-form`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__savebtn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;