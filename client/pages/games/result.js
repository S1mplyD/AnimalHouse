import axios from "axios";

export default function result(setScore, game, score) {
  const submitScore = async () => {
    await axios.post("http://localhost:8000/api/leaderboard", {
      playerName: document.getElementById("username").value,
      score: score,
      game: game,
    });
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center bg-white rounded w-fit m-auto mt-10">
      <div className="m-10 w-fit h-80 flex flex-col items-center content-around border-gray-400 border-solid border-4 p-5 rounded-xl">
        <div className="text-center">Your score is: {score}</div>
        <div className="text-center my-5 flex flex-col items-center">
          <h1>Save your score</h1>
          <input
            type="text"
            name="username"
            placeholder="username"
            id="username"
            className="mt-5 rounded-md"
          />
          <input
            type="submit"
            className="mt-5 rounded-lg bg-cyan-400 p-2 hover:bg-blue-500"
            value="submit"
            onClick={() => {
              submitScore();
              navigate("/games");
            }}
          />
        </div>
      </div>
    </div>
  );
}
