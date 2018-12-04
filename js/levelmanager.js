
let currentLevel = 1;
class LevelManager {
    static reset(event) {
        if (currentLevel == 13) {
            showMenu = true;
        } else {
        setTimeout(() => {
            world = new World(level[currentLevel - 1]);
        }, 100);
            event.preventDefault();
        }
    }
  
    static next(event) {
        setTimeout(() => {
            currentLevel++;
            window.dispatchEvent(resetWorldEvent);
            present = false;
        }, 1000);
        present = true;
        event.preventDefault();
    }
}
  
window.addEventListener("resetWorld", LevelManager.reset, false);
window.addEventListener("nextLevel", LevelManager.next, false);
  