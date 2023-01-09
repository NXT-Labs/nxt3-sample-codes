exports.deepEqual = (fields, requiredFields) => {
    const keys1 = Object.keys(fields);
    const keys2 = Object.keys(requiredFields);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = fields[key];
        const val2 = requiredFields[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }
    return true;
}

exports.deepEqualKey = (fields, requiredFields) => {
    const keys1 = Object.keys(fields);
    const keys2 = Object.keys(requiredFields);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys2) {
        if (!fields[key]) {
            return false
        }
    }
    return true;
}