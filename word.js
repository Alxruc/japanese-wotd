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

function addToHistory(history, currentDate, currentWord, currentReading) {
  history.unshift({ date: currentDate, word: currentWord, reading: currentReading });
  localStorage.setItem('wordHistory', JSON.stringify(history));
}

function updateHistoryList(history) {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = '';
  history.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.date}: ${entry.word} - ${entry.reading}`;
      historyList.appendChild(li);
  });
}



// This is called everytime someone clicks on the extension
document.addEventListener('DOMContentLoaded', async function() {
  //for bug fixing
  //var date = new Date().getMinutes();
  var date = new Date().toLocaleDateString();

  document.getElementById("todaysDate").textContent = `Today's date is: ${date}`;
  let history = JSON.parse(localStorage.getItem('wordHistory')) || [];
  
  if(hasOneDayPassed(date)) {
    await getRandomWord();
    addToHistory(history, date, localStorage.word, localStorage.reading)
  }


  document.getElementById("dailyWord").textContent = localStorage.word;
  document.getElementById("reading").textContent = localStorage.reading;
  
  const button = document.getElementById("lookup-btn");
  button.addEventListener('click', () => {
    console.log("clicked");
    var link = "https://jisho.org/search/";
    link = link + localStorage.word;
    window.open(link);
  })

  const historyBtn = document.getElementById("history-btn");

  const mainCard = document.getElementById("main-view");
  const historyCard = document.getElementById("history-view");
  
  // Show history
  historyBtn.addEventListener('click', function() {
    updateHistoryList(history);
    mainCard.style.display = 'none';
    historyCard.style.display = 'block';
  });

  const backBtn = document.getElementById("back-btn");

  // Back to main card
  backBtn.addEventListener('click', function() {
      historyCard.style.display = 'none';
      mainCard.style.display = 'block';
  });

});




