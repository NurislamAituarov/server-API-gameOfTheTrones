
export default class CetService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        return await res.json();
    };
    getAllCharacters = () => {
        return this.getResource('/characters?page=10&')
    }
    getCharacter = (id) => {
        return this.getResource(`/characters/${id}`)
    }
    getBooks = () => {
        return this.getResource('/books')
    }
    getBook = (id) => {
        return this.getResource(`/books/${id}`)
    }
    getHouses = () => {
        return this.getResource('/houses')
    }
    getHouse = (id) => {
        return this.getResource(`/houses/${id}`)
    }
}

const service = new CetService();

service.getBook(12)
.then(arr=>{
    console.log(arr)
})

