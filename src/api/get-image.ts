async function getImageFromUrl(url: string) {
    const response = await fetch(url);

    return response.blob();
}

export {
    getImageFromUrl
}