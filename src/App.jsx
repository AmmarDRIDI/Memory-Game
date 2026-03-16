import GameHeader from "./Component/GameHeader"
import Card from "./Component/Card";
import { useState } from "react";
import "./index.css";
import WinAlert from "./Component/WinAlert";


const cardsValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];

function initialCards() {
   
  //let shuffledValues = [...cardsValues].sort(() => Math.random() - 0.5);
  const initialCards = cardsValues.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
  return initialCards;
}


export default function App() {


 

  const [cards, setCards] = useState(initialCards());
  const [cardsFlipped, setCardsFlipped] = useState([]);
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);


   function createInitialCards() {
    const newCards = initialCards();
    setScore(0);
    setMoves(0);
    setCardsFlipped([]);
    setCards(newCards);
  }

  function handleClose() {
    createInitialCards();
    setWin(false);
  }

  function handlecardClick(card) {


    if (cardsFlipped.length > 2) {
      setCardsFlipped([]);
      return;
    }

    if (card.isFlipped || card.isMatched) {
      return;

    }
    else if (cardsFlipped.length === 0) {

      const newCards = cards.map((c) => {
        if (c.id === card.id) {
          setCardsFlipped([c]);
          return { ...c, isFlipped: true };
        } else {
          return c;
        }
      });
      setCards(newCards);
    }
    else if (cardsFlipped.length === 1) {

      if (cardsFlipped[0].value === card.value) {
        const newCards = cards.map((c) => {
          if (c.id === card.id || c.id === cardsFlipped[0].id) {
            return { ...c, isFlipped: true, isMatched: true };
          } else {
            return c;
          }
        })
        setCards(newCards);
        setMoves(moves + 1);
        setScore(score + 1);
        setCardsFlipped([]);
        setTimeout(() => {
          if (score === cardsValues.length / 2 - 1) {
            setWin(true);
            return;
          }
        }, 1000);

      }
      else if (cardsFlipped[0].value !== card.value) {
        const newCards = cards.map((c) => {
          if (c.id === card.id) {
            return { ...c, isFlipped: true };
          } else {
            return c;
          }
        });

        setMoves(moves + 1);
        setCards(newCards);

        const firstCardId = cardsFlipped[0].id;
        const secondCardId = card.id;
        setTimeout(() => {
          const currentCards = currentCards => currentCards.map((c) => {
            if (c.id === secondCardId || c.id === firstCardId) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          })
          setCards(currentCards);
          setCardsFlipped([]);
        }, 1000);

      }
    }
  }

  return (
    <div className="App">
      <GameHeader score={score} moves={moves} createInitialCards={createInitialCards} />
      <div className="card-grid">
        {cards.map((card) => (<Card card={card} onCardClick={handlecardClick} />))}
      </div>
      <WinAlert open={win} handleClose={handleClose} />
    </div>
  )
}

