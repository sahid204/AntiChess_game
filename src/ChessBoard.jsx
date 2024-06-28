import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess } from "chess.js";

const ChessBoard = () => {
  const [game, setgame] = useState(new Chess());
  const [playert, setplayert] = useState("white");
  const [status, setStatus] = useState('white to move');
  const [inval, setInval] = useState('');

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
      setStatus(`${playert === 'white' ? 'Black' : 'White'} to Move`);
    }
  };

  const onDrop = (sourceSquare, targetSquare) => {
    // setError(''); // Clear any previous error
    console.log(`sourceSquare: ${sourceSquare}, targetSquare: ${targetSquare}`);

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // Automatically promote to queen for simplicity
    });

    console.log(`move: ${JSON.stringify(move)}`);

    if (move === null) {
      setInval('Illegal move. Try again.');
      console.log(inval)

      // Clear error message after 3 seconds
      setTimeout(() => {
        setInval('');
      }, 5000);

      return;
    }
    setgame(new Chess(game.fen()));
    checkStatus();
    if (!game.isGameOver()) {
      setplayert(playert === 'white' ? 'black' : 'white');
    }
  };

  const handleQuit = () => {
    alert(`${playert === 'white' ? 'Black' : 'White'} Wins As ${playert} Quit`);
    setgame(new Chess());
    setStatus('');
    setInval('');
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
        <p className="text-white"><span className="font-bold">Turn : </span>{status}</p>
        <p className="text-red-500">{inval}</p>
        <button onClick={handleQuit} className="bg-slate-400 rounded border-black w-44 h-12 font-bold mt-4">QUIT</button>
      </div>
    </div>
  );
};

export default ChessBoard;
