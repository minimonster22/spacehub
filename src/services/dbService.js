import axios from "axios";

let db;

export const openDB = () => {
    const request = indexedDB.open("MyFavorite", 1);

    request.onerror = (event) => {
        console.error("Ошибка при открытии базы данных:", event.target.error);
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        console.log("База данных успешно открыта");
    };

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore("apods", { keyPath: "id" });

        objectStore.createIndex("title", "title", { unique: true });
        objectStore.createIndex("date", "date", { unique: true });
        objectStore.createIndex("explanation", "explanation", { unique: true });
        objectStore.createIndex("url", "url", { unique: true });
    };
};

export const addData = (apod) => {
    if (!db) {
        console.error("База данных не открыта");
        return;
    }

    const transaction = db.transaction(["apods"], "readwrite");
    const objectStore = transaction.objectStore("apods");

    const request = objectStore.add(apod);

    request.onsuccess = () => {
        console.log("Картинка дня успешно добавлена!");
    };

    request.onerror = (event) => {
        console.error("Ошибка при добавлении картинки дня", event.target.error);
    };
};

export const fetchFavorites = () => {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject("База данных не открыта");
            return;
        }

        const transaction = db.transaction(["apods"], "readonly");
        const objectStore = transaction.objectStore("apods");

        const request = objectStore.getAll(); // Получаем все записи

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject("Ошибка при получении данных из базы", event.target.error);
        };
    });
};

export const fetchAPOD = async () => {
    const apiKey = process.env.VUE_APP_NASA_API_KEY;
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const apodData = response.data;

        const apodToSave = {
            id: apodData.date,
            title: apodData.title,
            date: apodData.date,
            explanation: apodData.explanation,
            url: apodData.url
        };

        addData(apodToSave);
        return apodData;

    } catch (err) {
        throw new Error('Не удалось загрузить данные: ' + err.message);
    }
};