const fruitForm = document.querySelector('#inputSection form');
const fruitList = document.querySelector('#fruitSection ul');
const fruitNutrition = document.querySelector('#nutritionSection p');

fruitForm.addEventListener('submit', extractFruit);

function extractFruit(e){
    e.preventDefault();
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value = '';
}

// function fetchFruitData(fruit){
//     fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
//         .then((resp) => resp.json())
//         .then((data) => addFruit(data))
//         .catch((e) => console.log(e))
// }


async function fetchFruitData(fruit){
    try {
        const resp = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`);
        const imgResp = await fetch(`https://pixabay.com/api/?key=53335774-454adc53362ab1a4f7ce7a8da&q=${fruit}-fruit`);
        if (resp.ok && imgResp.ok){
            const data = await resp.json();
            const picurl = await imgResp.json();
            addFruit(data, picurl.hits[0].largeImageURL);
            
        } else {
            throw 'Error: http status code = ' + resp.status;
        }
    } catch (error) {
        console.log(error);
    }
}

let cal = 0;

function addFruit(fruit, fruitPic){
    const li = document.createElement('li');
    li.textContent = fruit.name;
    fruitList.appendChild(li);
    calorieUpdate(fruit, 1);
    console.log(fruitPic);
    const image = document.createElement('img');
    image.setAttribute('src', fruitPic);
    image.setAttribute('alt', fruit);
    document.body.appendChild(image);
    

    li.addEventListener('click', () => li.remove());
    li.addEventListener('click', () => calorieUpdate(fruit, -1));
}

function calorieUpdate(fruit, x){
    cal += x*fruit.nutritions.calories;
    fruitNutrition.textContent = cal;
}