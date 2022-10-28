//https://dev.to/tipsy_dev/advanced-typescript-reinventing-lodash-get-4fhe
//docs: Advanced TypeScript reinventing lodash get.pdf 
//reinventing lodash.get 
export default function getValue(data, path, defaultValue) {
    const value = path
        .split(/[.[\]]/)
        .filter(Boolean)
        .reduce((value, key) => value === null || value === void 0 ? void 0 : value[key], data);
    return value !== undefined ? value : defaultValue;
}
//# sourceMappingURL=getValue.js.map