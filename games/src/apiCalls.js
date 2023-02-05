import axios from "axios";

export async function getAds(specie, name, gender, age, medicalCondition) {
    let data = await axios.get("/api/ads", {
        params: {
            specie: specie, name: name, gender: gender, age: age, medicalCondition: medicalCondition
        }
    })
    if (data != null) {
        for (let i = data.data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data.data[i], data.data[j]] = [data.data[j], data.data[i]];
        }
        return data
    }
};

export async function getServices() {
    let data = await axios.get("/api/services")
    for (let i = data.data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data.data[i], data.data[j]] = [data.data[j], data.data[i]];
    }
    return data
}

export async function getWords() {
    let data = await axios.get("/api/animals/hangman")
    return data.data.replace(" ", "")
};

export async function getImages() {
    const data = await axios.get("/api/animals/memory");
    let memoryImages = [];
    data.data.map((i, index) => {
        memoryImages.push({
            id: index, image: i.image, state: "", name: i.name,
        });
        memoryImages.push({
            id: index, image: i.image, state: "", name: i.name,
        });
    });
    memoryImages.sort(() => Math.random() - 0.5);
    return memoryImages
};

export async function getQuestions(){
    const rawData = await axios.get("/api/getTrivia");
    return rawData
};