import axios from "axios";

let db;
//создание БД
export const openDB = async () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("MyFavorite", 1);

        request.onerror = (event) => {
            console.error("Ошибка при открытии базы данных:", event.target.error);
            reject("Ошибка при открытии базы данных");
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            console.log("База данных успешно открыта");
            resolve();
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore("apods", { keyPath: "id" });

            objectStore.createIndex("title", "title", { unique: true });
            objectStore.createIndex("date", "date", { unique: true });
            objectStore.createIndex("explanation", "explanation", { unique: true });
            objectStore.createIndex("url", "url", { unique: true });
        };
    });
};
//Добавление элементов в ДБ
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
//Получение данных из БД
export const fetchFavorites = () => {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject("База данных не открыта");
            return;
        }

        const transaction = db.transaction(["apods"], "readonly");
        const objectStore = transaction.objectStore("apods");

        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            const results = event.target.result;

            const processedResults = results.map((item) => {
                if (item.media_type === "video") {
                    if (item.url.includes("youtube.com")) {
                        item.url = item.url.replace("watch?v=", "embed/");
                    }
                }
                return item;
            });

            resolve(processedResults);
        };

        request.onerror = (event) => {
            reject("Ошибка при получении данных из базы: " + event.target.error.message);
        };
    });
};
//Получение данных с API
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
            url: apodData.url,
            media_type: apodData.media_type,
        };

        addData(apodToSave);

        return apodData;

    } catch (err) {
        throw new Error('Не удалось загрузить данные: ' + err.message);
    }
};