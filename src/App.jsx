import GameHeader from "./Component/GameHeader";
import Card from "./Component/Card";
import { useEffect, useRef, useState } from "react";
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
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timerId) => clearTimeout(timerId));
      timersRef.current = [];
    };
  }, []);

  function createInitialCards() {
    timersRef.current.forEach((timerId) => clearTimeout(timerId));
    timersRef.current = [];
    const newCards = initialCards();
    setScore(0);
    setMoves(0);
    setIsBoardLocked(false);
    setCardsFlipped([]);
    setCards(newCards);
  }

  function handleClose() {
    createInitialCards();
    setWin(false);
  }

  function handleCardClick(card) {
    if (isBoardLocked) {
      return;
    }

    const clickedCard = cards.find((c) => c.id === card.id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) {
      return;
    }

    if (cardsFlipped.length === 0) {
      setCards((currentCards) =>
        currentCards.map((c) =>
          c.id === clickedCard.id ? { ...c, isFlipped: true } : c,
        ),
      );
      setCardsFlipped([clickedCard.id]);
      return;
    }

    if (cardsFlipped.length !== 1) {
      return;
    }

    const firstCardId = cardsFlipped[0];
    const firstCard = cards.find((c) => c.id === firstCardId);
    if (!firstCard) {
      setCardsFlipped([]);
      return;
    }

    setMoves((prevMoves) => prevMoves + 1);

    setCards((currentCards) =>
      currentCards.map((c) =>
        c.id === clickedCard.id ? { ...c, isFlipped: true } : c,
      ),
    );

    if (firstCard.value === clickedCard.value) {
      setIsBoardLocked(true);
      setCardsFlipped([firstCardId, clickedCard.id]);

      const matchTimerId = setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((c) =>
            c.id === firstCardId || c.id === clickedCard.id
              ? { ...c, isFlipped: true, isMatched: true }
              : c,
          ),
        );

        setScore((prevScore) => {
          const nextScore = prevScore + 1;
          if (nextScore === cardsValues.length / 2) {
            setWin(true);
          }
          return nextScore;
        });

        setCardsFlipped([]);
        setIsBoardLocked(false);
      }, 350);

      timersRef.current.push(matchTimerId);
      return;
    }

    setIsBoardLocked(true);
    setCardsFlipped([firstCardId, clickedCard.id]);

    const timerId = setTimeout(() => {
      setCards((currentCards) =>
        currentCards.map((c) =>
          c.id === firstCardId || c.id === clickedCard.id
            ? { ...c, isFlipped: false }
            : c,
        ),
      );
      setCardsFlipped([]);
      setIsBoardLocked(false);
    }, 900);

    timersRef.current.push(timerId);
  }

  return (
    <div className="App">
      <GameHeader
        score={score}
        moves={moves}
        createInitialCards={createInitialCards}
      />
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onCardClick={handleCardClick} />
        ))}
      </div>
      <WinAlert open={win} handleClose={handleClose} />
    </div>
  );
}
