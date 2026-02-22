import data from '../data/data.json';

// Helper to determine the key in the data.json based on the endpoint path
const getCollectionName = (path) => {
    // Expected path format: '/content/modelName'
    const parts = path.split('/');
    if (parts.length < 3) return null;

    // model name will be the 3rd element (index 2)
    const modelName = parts[2];

    const map = {
        'profile': 'profile',
        'skill': 'skill',
        'experience': 'experience',
        'project': 'project',
        'admin': 'admin',
    };
    return map[modelName.toLowerCase()];
};

// Mock api object replacing axios.create()
const api = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            try {
                // If fetching a specific item by ID: e.g. /content/experience/1
                const parts = url.split('/');
                const isSingleItem = parts.length > 3 && parts[3];

                const collectionName = getCollectionName(url);
                if (!collectionName) {
                    return reject(new Error(`Invalid collection for URL: ${url}`));
                }

                const collectionData = data[collectionName] || [];

                if (isSingleItem) {
                    const id = parts[3];
                    const item = collectionData.find(i => String(i.id) === String(id));

                    if (!item) {
                        return reject(new Error('Item not found'));
                    }

                    // Specific logic for experience details is already embedded in data.json.

                    resolve({ data: item });
                } else {
                    // Fetching all items in a collection
                    let resultData = [...collectionData];

                    // Specific logic for experience items
                    if (collectionName === 'experience') {
                        resultData = resultData.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)); // Sorting based on previous logic
                    }

                    resolve({ data: resultData });
                }

            } catch (error) {
                console.error("Mock API Error:", error);
                reject(error);
            }
        });
    },

    // We can comment these out or keep them as stubs if they're used 
    // elsewhere (like admin panel), but throwing an error since we are static now.
    post: () => Promise.reject(new Error("POST operations not supported in static mode")),
    put: () => Promise.reject(new Error("PUT operations not supported in static mode")),
    delete: () => Promise.reject(new Error("DELETE operations not supported in static mode")),
};

export default api;
