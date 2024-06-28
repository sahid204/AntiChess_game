import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess } from "chess.js";

const ChessBoard = () => {
  const [game, setgame] = useState(new Chess());
  const [playert, setplayert] = useState("white");
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const checkStatus = () => {
    if (game.isCheckmate()) {
      setStatus(`Game Over. ${playert === 'white' ? 'Black' : 'White'} Wins`);
    } else if (game.isDraw()) {
      setStatus('Game Draw');
    } else if (game.isStalemate()) {
      setStatus('Stalemate. Game Draw');
    } else if (game.isThreefoldRepetition()) {
      setStatus('Threefold Repetition. Game Draw');
    } else {
      setStatus(`${playert === 'white' ? 'Black' : 'White'} to move`);
    }
  };

  const onDrop = (sourceSquare, targetSquare) => {
    setError(''); // Clear any previous error
    console.log(`sourceSquare: ${sourceSquare}, targetSquare: ${targetSquare}`);

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // Automatically promote to queen for simplicity
    });

    console.log(`move: ${JSON.stringify(move)}`);

    if (move === null) {
      setError('Illegal move. Try again.');
      return; // Illegal move, do not update the board
    }
    setgame(new Chess(game.fen()));
    setplayert(playert === 'white' ? 'black' : 'white');
    checkStatus();
  };

  const handleQuit = () => {
    alert(`${playert === 'white' ? 'Black' : 'White'} Wins As ${playert} Quit`);
    setgame(new Chess());
    setStatus('');
    setError('');
    setplayert('white');
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center items-center min-h-screen bg-stone-700">
      <div className="w-full md:w-1/2 lg:w-5/12 py-5 flex justify-center">
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-white">{status}</p>
        <p className="text-white">{error}</p>
        <button onClick={handleQuit} className="bg-slate-400 rounded border-black w-44 h-12 font-bold mt-4">QUIT</button>
      </div>
    </div>
  );
};

export default ChessBoard;
