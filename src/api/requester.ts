
const requester = {
    get: async (url: URL, headers: Record<string, string> = {}) => {
        const response = await fetch(url.toString(), { headers: {'Content-Type': 'application/json', ...headers} });

        return response.json();
    },
    post: async (url: URL, body: any) => {
        const response = await fetch(url.toString(), { headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify(body)});

        return response.json();
    }
}


export {
    requester
}