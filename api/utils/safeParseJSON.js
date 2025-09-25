const safeParseJSON = (str) => {
    try {
        return JSON.parse(str);
    } catch {
        return {};
    }
};

export default safeParseJSON;
