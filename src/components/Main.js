import { api } from '../utils/Api.js';
import { useEffect, useState } from 'react';
import Card from './Card.js';

function Main({ onEditAvatar, onEditProfile, onAddCard, onCardClick}) {
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('#');
  const [userSubtitle, setUserSubtitle] = useState('');
  const [cards, setCards] = useState([]);


useEffect(() => {
  Promise.all([api.getUserAvatar(), api.getInitialCards()])
  .then(([userData, cards]) => {
    setUserName(userData.name);
    setUserSubtitle(userData.about);
    setUserAvatar(userData.avatar);
    setCards(cards);
  })
  .catch((error) => console.log(`Ошибка: ${error}`));
}, []);

return (
  <main className="main">
    <section className="profile">
      <div className="profile__userdata">
        <button className='profile__avatar'
        onClick={onEditAvatar}
        style={{ backgroundImage: `url(${userAvatar})` }}>
        </button>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__editbtn" 
            type="button" onClick={onEditProfile}></button>
          </div>
        <p className="profile__subtitle">{userSubtitle}</p>
         </div>
      </div>
      <button className="profile__addbtn" type="button"
      onClick={onAddCard}></button>
    </section>

    <section className="places">
    <ul className="places__list">
    {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              key={card._id}
            />
          ))}
    </ul>
    </section>
  </main>
);
}

export default Main;