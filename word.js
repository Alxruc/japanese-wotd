async function getRandomWord(){
  await fetch("./data/words.txt")
  .then(response => response.text())
  .then(text => {
    var lines = text.split("\r\n");
    var line = lines[Math.floor(Math.random()*lines.length)];
    let wordAndReading = line.split(";");
    localStorage.word = wordAndReading[0];
    localStorage.reading = wordAndReading[1];
  })
  .catch((e) => console.error(e));
}


function hasOneDayPassed(date) {
  // Check if the date we saved is the same or a new one
  if(localStorage.currDate == date) 
      return false;

  // new date => save it
  localStorage.currDate = date;
  return true;
}

// This is called everytime someone clicks on the extension
document.addEventListener('DOMContentLoaded', async function() {
  //for bug fixing
  //var date = new Date().getMinutes();
  var date = new Date().toLocaleDateString();

  document.getElementById("todaysDate").textContent = `Today's date is: ${date}`;
  
  if(hasOneDayPassed(date)) {
    await getRandomWord();
  }

  document.getElementById("dailyWord").textContent = localStorage.word;
  document.getElementById("reading").textContent = localStorage.reading;

});

