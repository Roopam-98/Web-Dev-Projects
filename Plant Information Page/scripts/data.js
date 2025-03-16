const API_KEY = "vCLAp9pWaoATQPJ7PO7iHgzM80N5DHhSQIjb7Fxg";
let dailyNews = [];

// GET DAILY NEWS
async function getNews(articlePerPage) {
    const api_url = `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&language=en&limit=3&page=${articlePerPage}`;

    // let apiURL = `https://api.thenewsapi.com/v1/news/headlines?locale=us&language=en&api_token=${API_KEY}`
    // "https://newsdata.io/api/1/latest?apikey=pub_74715192fc8603cb30fe050766ed228413a24&&language=en"

    let response = await fetch(api_url);
    let newsData = await response.json();

    dailyNews.push(newsData);
    if (articlePerPage === 4) {
        renderNews(dailyNews);
    }
}

function renderNews(dailyNews) {
    console.log('printed daily news!');
}

// GET TOP NEWS

(async function getTopNews() {
    const api_url = `https://api.thenewsapi.com/v1/news/top?api_token=${API_KEY}&locale=in&categories=general&limit=3`;

    let response = await fetch(api_url);
    let topNews = await response.json();

    renderTopNews(topNews);
})();


function renderTopNews(topNews) {
    console.log('printed top news!');
}

(function articlesPerPage() {
    for (let i = 0; i < 4; i++) {
        getNews(i + 1);
    }
})();





