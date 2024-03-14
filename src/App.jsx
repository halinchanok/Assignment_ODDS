import React from "react";
import "./App.css";
import { useState } from "react";

const Kings = [
  { name: "กนกอาชีวศึกษา", key: "KING1" },
  { name: "อินทรอาชีวศึกษา", key: "KING2" },
  { name: "เทคโนโลยีประชาชื่น", key: "KING3" },
  { name: "เทคนิคบุรณพนธ์", key: "KING4" },
];

function App() {
  const [players, setPlayers] = useState([]);
  const [king, setKing] = useState([]);
  const [changepage, setChangepage] = useState(false);
  const [showplayer, setShowplayer] = useState(false);

  const handleNextpage = () => {
    setChangepage(true);
  };

  const handleBackhome = () => {
    setChangepage(false);
  };

  const handleBackpage = () => {
    setShowplayer(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const playerNamesInput = event.target.playerName.value;
    const playerNames = playerNamesInput
      .split(/[\s,]+/)
      .filter((name) => name.trim() !== "");
    if (playerNames.length >= 1) {
      setPlayers((prePlayers) => [...prePlayers, ...playerNames]);
      event.target.playerName.value = "";
    } else {
      alert("กรุณาใส่ชื่อให้เรียบร้อย");

    }
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const assignPlayers = () => {
    const shuffledKings = shuffleArray([...Kings]);
    const assignedPlayers = players.map((player, index) => ({
      player,
      king: shuffledKings[index % shuffledKings.length],
    }));
    if (players.length >= 1) {
      alert(
        `Assigned players:\n\n${assignedPlayers
          .map(({ player, king }) => `${player} is in ${king.name}'s house`)
          .join("\n")}`
      );
      setShowplayer(true);
      setKing(assignedPlayers);
    } else {
      alert("กรุณากดเพิ่มชื่อก่อนอย่างน้อย 1 ชื่อ");
    }
  };

  const renderKingsTable = (kings) => {
    return (
      <div className="flex-container">
        {kings.map(({ name, key }) => (
          <div key={key} className="flex-box">
            <h6 className="title">{name}</h6>
            <table className="content">
              <thead>
                <tr>
                  <th scope="col">ลำดับ</th>
                  <th scope="col">รายชื่อ</th>
                </tr>
              </thead>
              <tbody>
                {king
                  .filter((player) => player.king.key === key)
                  .map(({ player }, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{player}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };

  const handlereset = () => {
    setPlayers([]);
    alert(`ตอนนี้ได้ลบออกจากสถาบันหมดแล้ว`);
    setShowplayer(false);
  };

  return (
    // firstpage
    <div>
      <link
        rel="stylesheet"
        href="node_modules/bootstrap/dist/css/bootstrap.min.css"
      ></link>
      {!changepage ? (
        <>
          <div className="background-image"></div>
          <button className="btn1" onClick={handleNextpage}>
            <span className="text1">GET SORTED NOW</span>
          </button>
        </>
      ) : (
        // หน้าสุ่ม page2
        <>
          <div className="background-image1"></div>
          {!showplayer ? (
            <>
              <div className="form">
                <form className="name-form" onSubmit={handleSubmit}>
                  <label className="text2" htmlFor="playerName">
                    {" "}
                    Name :{" "}
                  </label>
                  <input
                    type="text"
                    id="playerName"
                    name="playerName"
                    placeholder="Your name"
                  />
                  <br/>
                  <button className="btn2" type="submit" value="Add Player">
                    Add Name
                  </button>
                </form>
                <button className="btn2" onClick={assignPlayers}>
                    Assign Name
                </button>
              </div>
              <button className="btn4 btn-home">
                <span className="text-container">
                  <span className="text" onClick={handleBackhome}>
                    HOME
                  </span>
                </span>
              </button>
            </>
          ) : (
            // page 3
            <>
              <div className="background-image2"></div>
              <section class="wrapper">
                <div class="top">4KINGS</div>
                <div class="bottom" aria-hidden="true">
                  4KINGS
                </div>
              </section>
              {showplayer && renderKingsTable(Kings)}
              <button className="btn4 btn-back">
                <span className="text-container">
                  <span className="text" onClick={handleBackpage}>
                    BACK
                  </span>
                </span>
              </button>
              <button className="btn4 btn-reset">
                <span className="text-container">
                  <span className="text" onClick={handlereset}>
                    RESET
                  </span>
                </span>
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
