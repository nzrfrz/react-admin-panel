export const toTitleCase = (string: string) => {
    const temp = string?.split(" ");
    const titleCaseConverted = temp.map((data) => {
        if (/[a-z]/.test(data.charAt(0)) === true) return data.charAt(0).toUpperCase() + data.substring(1);
        return data;
    });
    const finalResult = titleCaseConverted.map((data) => {
        if (/(?:^|[^\w])(pt|Pt|pT|cv|Cv|cV)(?:[^\w]|$)/i.test(data) === true) return data.toUpperCase();
        return data;
    });
    
    return finalResult.join(" ");
};