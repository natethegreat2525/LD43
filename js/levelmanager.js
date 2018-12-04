
let currentLevel = 1;
class LevelManager {
    static reset(event) {
        world = new World(level[currentLevel - 1]);
        event.preventDefault();
    }
  
    static next(event) {
        setTimeout(() => {
            currentLevel++;
            window.dispatchEvent(resetWorldEvent);
            present = false;
        }, 1500);
        present = true;
        event.preventDefault();
    }
}
  
window.addEventListener("resetWorld", LevelManager.reset, false);
window.addEventListener("nextLevel", LevelManager.next, false);
  