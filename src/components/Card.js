
function Card({card, onCardClick}) {
  function handleCardClick() {
    onCardClick(card);
  }
  return (
    <li className="place">
      <button className="place__deletebtn" type="button"></button>
      <img src={card.link} alt={card.name} className="place__image" onClick={handleCardClick} />
        <div className="place__bar">
          <h3 className="place__title">{card.name}</h3>
          <div className="place__likecounter">
          <button className="place__likebtn" type="button"></button>
          <span className="place__likenbr"></span>
        </div>
      </div>
    </li>
  );
}

export default Card;