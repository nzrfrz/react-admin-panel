export const stripCountryCode = (value: string, countryCode: string) => {
    if (value?.startsWith('0')) return value.slice(1);
    else if (value?.startsWith(countryCode)) return value.slice(2);
    return value;
};