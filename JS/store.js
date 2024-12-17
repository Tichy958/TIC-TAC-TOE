const initialValue = {
  moves: [],
};
export default class Store {
  #state = initialValue;

  constructor(players) {
    this.players = players;
  }

  get game() {
    const state = this.#getState();
    //if you add "get" it acts as a property on class instance and you can use console.log(store.game) and not store.game()

    const currentPlayer = this.players[state.moves.length % 2];

    return {
      moves: state.moves,
      currentPlayer,
    };
  }
  playerMove(squareId) {
    const state = this.#getState();

    const stateClone = structuredClone(state); //structuredClone is a method to create a deep copy

    stateClone.moves.push({
      squareId,
      player: this.game.currentPlayer,
    });

    this.#saveSate(stateClone);
  }

  #getState() {
    return this.#state;
  }

  #saveSate(stateOrFn) {
    const prevState = this.#getState();
    let newState;

    switch (typeof stateOrFn) {
      case `function`:
        newState = stateOrFn(prevState);
        break;
      case `object`:
        newState = stateOrFn;
        break;
      default:
        throw new Error(`Invalid argument passed to saveState`);
      // Dynamic State Handling:
      //     This is commonly seen in state management (e.g., React), where the state update can either be:
      // A function that computes the new state based on the previous state (prevState).
      //         An object representing the new state directly.
    }
    this.#state = newState;
  }
}
