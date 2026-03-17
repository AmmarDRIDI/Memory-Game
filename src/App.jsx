import GameHeader from "./Component/GameHeader";
import Card from "./Component/Card";
import "./index.css";
import WinAlert from "./Component/WinAlert";
import {useGameLogic} from "./Hooks/useGameLogic";

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


export default function App() {
  const { 
    cards,
    score,
    moves,
    win,
    handleCardClick,
    handleClose,
    createInitialCards } = useGameLogic(cardsValues);

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
      <WinAlert open={win} handleClose={handleClose} moves={moves} />
    </div>
  );
}
