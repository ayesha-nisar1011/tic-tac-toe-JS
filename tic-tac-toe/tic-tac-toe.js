let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");

// Popup container
let messageContainer = document.createElement("div");
document.body.appendChild(messageContainer);

let turnO = true; // true = O's turn, false = X's turn

const winPatterns = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // cols
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
];

// 🎨 Popup styles
messageContainer.id = "popup";
Object.assign(messageContainer.style, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%) scale(0)",
  padding: "30px 50px",
  borderRadius: "15px",
  background: "linear-gradient(135deg, #ff00cc, #ffcc00, #00ffff)",
  color: "#fff",
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  boxShadow: "0 0 30px rgba(255,255,255,0.7)",
  transition: "transform 0.3s ease",
  zIndex: "1000",
  display: "none",
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#00ffff"; // neon cyan
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#ff00cc"; // neon pink
      turnO = true;
    }

    box.disabled = true;
    checkWinner();
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showPopup(`${pos1Val} Wins 🎉`);
      highlightWinner(pattern);
      return;
    }
  }

  // check for draw
  let allFilled = [...boxes].every((box) => box.innerText !== "");
  if (allFilled) {
    showPopup("It's a Draw 🤝");
  }
};

// ✨ Highlight winning boxes
const highlightWinner = (pattern) => {
  pattern.forEach((index) => {
    boxes[index].classList.add("win");
  });
};

// 🎉 Show popup
const showPopup = (message) => {
  messageContainer.innerText = message;
  messageContainer.style.display = "block";
  setTimeout(() => {
    messageContainer.style.transform = "translate(-50%, -50%) scale(1)";
  }, 50);

  // disable further clicks
  boxes.forEach((box) => (box.disabled = true));

  // auto-hide popup after 2.5s
  setTimeout(() => {
    messageContainer.style.transform = "translate(-50%, -50%) scale(0)";
    setTimeout(() => {
      messageContainer.style.display = "none";
    }, 300);
  }, 2500);
};

// 🔄 Reset game
reset.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("win");
  });
  turnO = true;
  messageContainer.style.display = "none";
});
