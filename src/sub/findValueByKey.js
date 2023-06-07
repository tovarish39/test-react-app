export default function findValueByKey(obj, key) {
    if (typeof obj !== 'object') return null;

    if (obj.hasOwnProperty(key)) {
        return obj[key];
    }

    for (const prop in obj) {
        const result = findValueByKey(obj[prop], key);
        if (result !== null) return result;
    }
    return null;
}

