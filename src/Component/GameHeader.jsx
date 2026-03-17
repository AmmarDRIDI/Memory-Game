import CachedIcon from '@mui/icons-material/Cached';

export default function GameHeader({score, moves, createInitialCards}) {
    return (
        <div className="game-header">
            <h1>🎮 Memory Card Game</h1>

            <div className="stats">
                <div className="stat-item">
                    <span className="stat-label">Score : </span>
                    <span className="stat-value">{score}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Moves : </span>
                    <span className="stat-value">{moves}</span>
                </div>
            </div>

            <button  className="reset-btn" onClick={createInitialCards}>
                <div style={{display: 'flex',justifyContent:"center", alignItems: 'center', gap: '6px'}}>
                    <CachedIcon />
                    
                    <h4>New Game</h4>
                </div>
               
                
                
                </button>

        </div>
    )
}