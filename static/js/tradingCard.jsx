// const { response } = require("express");

function AddTradingCard(props) {
	const [name, setName] = React.useState("");
	const [skill, setSkill] = React.useState("");
	function addNewCard() {
		// TO BE IMPLEMENTED
		fetch("/add-card", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			// this could also be written as body: JSON.stringify({ name, skill }) with
			// JS object property value shorthand
			body: JSON.stringify({ "name": name, "skill": skill })
		})
			.then((response) => response.json())
			.then((jsonResponse) => {
				// alert(`Card added! Response: ${jsonResponse.name}`)
				const cardAdded = jsonResponse.cardAdded;
				props.addCard(cardAdded);
			});
	}
	return (
		<React.Fragment>
			<h2>Add New Trading Card</h2>
			<label htmlFor="nameInput">Name</label>
			<input
				value={name}
				onChange={(event) => setName(event.target.value)}
				id="nameInput"
				style={{ marginLeft: "5px" }}
			></input>
			<label
				htmlFor="skillInput"
				style={{ marginLeft: "10px", marginRight: "5px" }}
			>
				Skill
			</label>
			<input
				value={skill}
				onChange={(event) => setSkill(event.target.value)}
				id="skillInput"
			></input>
			<button style={{ marginLeft: "10px" }} onClick={addNewCard}>
				Add
			</button>
		</React.Fragment>
	);
}


function TradingCard(props) {
	return (
		<div className="card">
			<p>Name: {props.name}</p>
			<img src={props.imgUrl} alt="profile" />
			<p>Skill: {props.skill} </p>
		</div>
	);
}

function TradingCardContainer() {
	const floatCard = {
		name: 'Float',
		skill: 'baking pretzels',
		imgUrl: '/static/img/float.jpg'
	};
	const [cards, setCards] = React.useState([floatCard]);

	function addCard(newCard) {
		// [...cards] makes a copy of cards. Similar to currentCards = cards[:] in Python
		const currentCards = [...cards];
		// [...currentCards, newCard] is an array containing all elements in currentCards followed by newCard
		setCards([...currentCards, newCard]);
	}


	const tradingCards = []

	React.useEffect(() => {
		fetch('/cards.json')
			.then((response) => response.json())
			.then((responseJSON) =>
				setCards(responseJSON.cards))
	}, []);

	// React.useEffect((fetchcards, []))

	for (const currentCard of cards) {
		tradingCards.push(
			<TradingCard
				key={currentCard.name}
				name={currentCard.name}
				skill={currentCard.skill}
				imgUrl={currentCard.imgUrl}
			/>,
		);
	}

	return (
		<React.Fragment>
			<AddTradingCard addCard={addCard} />
			<div className="grid">
				{tradingCards}
			</div>;
		</React.Fragment>)
}

ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));
