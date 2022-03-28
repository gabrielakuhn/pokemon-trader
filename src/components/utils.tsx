interface BoardElement {
  id: number;
  exp: number;
}

let cardsBoardOne: Array<BoardElement> = [];
let cardsBoardTwo: Array<BoardElement> = [];

export const handleCardclick = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id: number,
  base_experience: number
) => {
  const element = event.target as HTMLElement;
  if(element.classList.length === 4){
    element.classList.add("bg-slate-600");
  } else {
    element.classList.remove("bg-slate-600");
    element.classList.add("bg-slate-200");
  }
  handlingExpPoints(id, base_experience, element.id);
};

const handlingExpPoints = async (
  id: number,
  base_experience: number,
  boardId: string
) => {
  let data = {
    id: id,
    exp: base_experience,
    selected: true,
  };

  let inventory: Array<BoardElement> = [];

  switch (boardId) {
    case "boardOne":
      inventory = cardsBoardOne;
      break;

    case "boardTwo":
      inventory = cardsBoardTwo;
      break;
  }

  if (inventory.length === 0) {
    inventory.push(data);
  } else {
    let pushData = false;
    await inventory.forEach((element, i) => {
      if (element.id === id) {
        pushData = false;
        inventory.splice(i, 1);
      } else {
        pushData = true;
      }
    });
    if (pushData) inventory.push(data);
  }
};

export const checkingExchange = () => {
    let sumBoardOne = 0
    let sumBoardTwo = 0
    const tol = 30

    cardsBoardOne.forEach(element => {
      sumBoardOne = sumBoardOne + element.exp
    });

    cardsBoardTwo.forEach(element => {
      sumBoardTwo = sumBoardTwo + element.exp
    });

    const rest = Math.abs(sumBoardOne - sumBoardTwo)
    console.log(sumBoardOne, sumBoardTwo)
    console.log(rest)

    if (rest <= tol){
      alert("Essa troca é justa.")
    } else{
      alert("Essa troca NÃO é justa.")
    }

}