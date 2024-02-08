const db = require('./db/connection');
const axios = require('axios');

const createClient = () => {
    axios.get('https://randomuser.me/api/')
        .then((response) => {
            const { name } = response.data.results[0];
            const sql = `INSERT INTO clients (name,last_name, created_at) VALUES ('${name.first}','${name.last}', '2024-02-01 19:07:41')`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                console.log('Cliente creado!');
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

const createPet = () => {
    const pet_name = [
        "Luna", "Max", "Bella", "Charlie", "Lucy",
        "Rocky", "Daisy", "Buddy", "Molly", "Bailey",
        "Sadie", "Toby", "Sophie", "Maggie", "Duke",
        "Chloe", "Bear", "Lola", "Jack", "Zoe",
        "Coco", "Harley", "Ruby", "Roxy", "Ginger",
        "Shadow", "Oliver", "Leo", "Oreo", "Milo"
    ];

    const pet_type = {
        "Perro": ["Labrador Retriever", "Bulldog Francés", "Pastor Alemán"],
        "Gato": ["Siamés", "Maine Coon", "Persa"],
        "Conejo": ["Holandés Enano", "Cabeza de León", "Rex"],
        "Pájaro": ["Canario", "Periquito", "Loro"],
        "Hámster": ["Ruso", "Sirio", "Roborowski"],
        "Tortuga": ["Tortuga de orejas rojas", "Tortuga rusa", "Tortuga de caja"],
        "Serpiente": ["Boa constrictor", "Pitón real", "Cobra"],
        "Pez": ["Goldfish", "Betta", "Guppy"],
        "Cobaya": ["Abyssinian", "Peruviana", "Himalaya"],
        "Hurón": ["Furet", "Marshall", "Angora"]
    };

    const owner_id = `SELECT COUNT(id) FROM clients;`;

    db.query(owner_id, (err, result) => {
        if (err) throw err;

        const ownerCount = result[0]['COUNT(id)'];
        const nameIndex = Math.floor(Math.random() * pet_name.length);
        const typeIndex = Object.keys(pet_type);
        const typePet = typeIndex[Math.floor(Math.random() * typeIndex.length)];
        const breedIndex = Math.floor(Math.random() * pet_type[typePet].length);
        const ownerIndex = Math.floor(Math.random() * ownerCount);

        const petName = pet_name[nameIndex];
        const breed = pet_type[typePet][breedIndex];

        const sql = `INSERT INTO pets (name, type, breed, owner_id, created_at) VALUES('${petName}', '${typePet}', '${breed}', ${ownerIndex}, '2024-02-01 19:07:41')`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log('Mascota creada!');
        });
    });
};

setInterval(createClient, 5000);
setInterval(createPet, 2000);
