function Utils() {
    this.pickRandom = function(myArray) {
        return myArray[Math.floor(Math.random() * myArray.length)];
    }
}