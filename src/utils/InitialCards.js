const dombay1 = new URL("../images/dombay-1.jpg", import.meta.url);
const dombay2 = new URL("../images/dombay-2.jpg", import.meta.url);
const elbrus1 = new URL("../images/elbrus-1.jpg", import.meta.url);
const elbrus2 = new URL("../images/elbrus-2.jpg", import.meta.url);
const karachaevsk = new URL("../images/karachaevsk.jpg", import.meta.url);
const cherkessiya = new URL("../images/karechaevo-cherkessiya.jpg", import.meta.url);

export const initialCards = [
  {
    name: 'Домбай',
    link: dombay1,
  },
  {
    name: 'Эверест',
    link: dombay2,
  },
  {
    name: 'Эльбрус',
    link: elbrus1,
  },
  {
    name: 'Фудзи',
    link: elbrus2,
  },
  {
    name: 'Карачаевск',
    link: karachaevsk,
  },
  {
    name: 'Карачаево-Черкессия',
    link: cherkessiya,
  }
];