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
  
  // handling styles
  if (element.classList.length === 4) {
    element.classList.add("bg-slate-600");
  } else {
    element.classList.remove("bg-slate-600");
    element.classList.add("bg-slate-200");
  }

  handlingBoards(id, base_experience, element.id);
};

// creating one array for each board with selected elements
const handlingBoards = async (
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
    inventory.push(data); // allways pushing first element clicked
    let pushData = false;

    await inventory.forEach((element, i) => {
      if (element.id === id) { // checking if element is already in the board, if so, the click means "remove it from the board"
        pushData = false;
        inventory.splice(i, 1); // removing element from the board array
      } else {
        pushData = true; // pushing element for the board array
      }
    });

    if (pushData) inventory.push(data);
  }
};


export const checkingExchange = () => {
  let sumBoardOne = 0;
  let sumBoardTwo = 0;
  const tol = 30;

  // getting the sum of base_experience in each board array to compare
  cardsBoardOne.forEach((element) => {
    sumBoardOne = sumBoardOne + element.exp; 
  });
  cardsBoardTwo.forEach((element) => {
    sumBoardTwo = sumBoardTwo + element.exp;
  });

  const rest = Math.abs(sumBoardOne - sumBoardTwo); 
  let msg;

  if (rest <= tol) {
    msg = `
      Essa troca é justa!\n
      A diferença de baseExp é de ${rest}
      A tolerância para a troca é de ${tol}`
  } else {
    msg = `
      Essa troca NÃO é justa!\n
      A diferença de baseExp é de ${rest}
      A tolerância para a troca é de ${tol}`
  }
  alert(msg);

};
