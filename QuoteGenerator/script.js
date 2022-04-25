const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');
let apiQuotes = [];
// Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}
// Show New Quotes
function newQuotes(){
loading();
 // Pick a random Quote from API
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// Check IF Author Field is null REplace it with nulll
if(!quote.author){
    authorText.textContent = "Unknown"; 
}else{
    authorText.textContent = quote.author; 
}
// Check Quote length determine styling
if(quote.text.length > 100){
    quoteText.classList.add('long-quote')
}else{
    quoteText.classList.remove('long-quote')
}
// set quote and hide loader
quoteText.textContent = quote.text;
complete();
}
// Get Quotes From API
loading();
async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuotes();
} catch (error) {
}
}
// Tweet
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
} 
// Event Listner
newQuoteBtn.addEventListener('click',newQuotes);
twitterBtn.addEventListener('click',tweetQuote);

getQuotes();
