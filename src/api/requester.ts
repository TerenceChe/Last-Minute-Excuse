
const requester = {
    get: async (url: URL, headers: Record<string, string> = {}) => {
        const response = await fetch(url.toString(), { headers: {'Content-Type': 'application/json', ...headers} });

        return response.json();
    }
}


export {
    requester
}