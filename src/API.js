const endpoint = 'http://localhost:3000/api/v1/'
const cardsUrl = `${endpoint}/cards`


const jsonify = res => {
    if (res.ok) {
        return res.json()
    } else {
        throw new Error(res.json())
    }
}

const handleServerError = resp => console.error(resp)

const cards = () => {fetch(cardsUrl)
    .then(jsonify)
    .catch(handleServerError)
}

// return the fetch


export default {
    cards
}