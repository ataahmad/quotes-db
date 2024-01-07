(async function randomQuote() {
    const response = await fetch('https://api.quotable.io/quotes/random?limit=5')
    const quote: any = await response.json()

    console.log(quote)

})()