async function getQuotes() {

	loader(true)

	const url = `https://get-quotes-api.p.rapidapi.com/quotes`
	
	const headers = {
		headers: {
			'X-RapidAPI-Key': '8b345b9b91msh426598df4292c1ep1453adjsn01d8bdb9d78a',
			'X-RapidAPI-Host': 'get-quotes-api.p.rapidapi.com'
		}
	}

	try {

		let response = await fetch(url, headers)
		let data = await response.json()

		return data

	} catch (error) {
		console.error(error)
	} finally {
		loader(false)
	}

}

let overLay = document.createElement("div")
overLay.className = `overLay`

let theImage = document.createElement("img")
theImage.src = `pen.gif`

overLay.appendChild(theImage)

let theBox = document.createElement("div")
theBox.className = `box`

let id = document.createElement("b")
id.id = `id`

let category = document.createElement("b")
category.className = `category`

let author = document.createElement("h2")
author.className = `author`

let description = document.createElement("span")
description.className = `description`

let quote = document.createElement("q")
quote.className = `quote`

let buttonsBox = document.createElement("div")
buttonsBox.className = `buttons-box`

let nextBtn = document.createElement("input")
nextBtn.type = `button`
nextBtn.id = `next`
nextBtn.value = `Next`

let randomBtn = document.createElement("input")
randomBtn.type = `button`
randomBtn.id = `random`
randomBtn.value = `Random generate`

let stopBtn = document.createElement("input")
stopBtn.type = `button`
stopBtn.id = `stop`
stopBtn.value = `Stop`

buttonsBox.append(nextBtn, randomBtn, stopBtn)

theBox.append(id, category, author, description, quote, buttonsBox)

document.querySelector(".container").append(overLay, theBox, myInformation())

async function theLogic() {

	let allData = await getQuotes() // Without await you’ll get promise {status: "pending"}
	let quotes = allData.Quotes

	let theNumber = 0
	let stopRandom
	let stopLights

	id.innerHTML = quotes[theNumber].id
	category.innerHTML = quotes[theNumber].category
	author.innerHTML = quotes[theNumber].author
	description.innerHTML = quotes[theNumber].description
	quote.innerHTML = quotes[theNumber].quote

	nextBtn.onclick = nextQuote
	randomBtn.onclick = () => {stopRandom = setInterval(randomQuote, 6000), stopLights = setInterval(() => {randomBtn.classList.toggle("lights")}, 500)}
	stopBtn.onclick = stopFun

	function nextQuote() {

		let quotes = allData.Quotes

		theNumber++

		id.innerHTML = quotes[theNumber].id
		category.innerHTML = quotes[theNumber].category
		author.innerHTML = quotes[theNumber].author
		description.innerHTML = quotes[theNumber].description
		quote.innerHTML = quotes[theNumber].quote
	}

	function randomQuote() {
	
		let getRandomQuote = allData.Quotes[Math.floor(Math.random() * allData.Quotes.length)]

		id.innerHTML = getRandomQuote.id
		category.innerHTML = getRandomQuote.category
		author.innerHTML = getRandomQuote.author
		description.innerHTML = getRandomQuote.description
		quote.innerHTML = getRandomQuote.quote
		
	}

	function stopFun() {

		clearInterval(stopRandom)
		clearInterval(stopLights)
		randomBtn.classList.remove("lights")
	}

}
theLogic()

function loader(show = true) {

	if (show) {

		overLay.style.visibility = "visible"
		
	} else {
		overLay.style.visibility = "hidden"
	}

}

function myInformation(myInfo) {

    myInfo = document.createElement("div")
    myInfo.className = `my-info`

    let xLink = document.createElement("a")
    xLink.href = "https://twitter.com/AhmadAlhadidi95"
    xLink.target = "_blank"
    xLink.rel = "noopener noreferrer"
    xLink.title = "Visit my Twitter (X)"

    let xIcon = document.createElement("i")
    xIcon.className = `fa-brands fa-x-twitter`

    xLink.appendChild(xIcon)

    let myLogo = document.createElement("img")
    myLogo.src = `My-sign.png`
    myLogo.alt = `My-sign`
    myLogo.style.width = `50px`

    let githubLink = document.createElement("a")
    githubLink.href = "https://github.com/AhmadAlhadidi95"
    githubLink.target = "_blank"
    githubLink.rel = "noopener noreferrer"
    githubLink.title = "Visit my Github"

    let githubIcon = document.createElement("i")
    githubIcon.className = `fa-brands fa-github`

    githubLink.appendChild(githubIcon)

    myInfo.append(xLink, myLogo, githubLink)

    return myInfo

}