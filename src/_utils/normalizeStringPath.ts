
export const normalizeStringPath = (path: string): string => {
    // Remove leading and trailing slashes
    let formattedPath = path.replace(/^\/|\/$/g, '');

    // Replace slashes with spaces
    formattedPath = formattedPath.replace(/\//g, ' ');

    // Replace hyphens with spaces
    formattedPath = formattedPath.replace(/-/g, ' ');

    // Return the formatted path
    return formattedPath.replace(/:[^/]+/, "");
};