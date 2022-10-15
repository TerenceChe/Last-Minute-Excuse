import { getImageFromUrl } from './get-image';
import { requester } from './requester';

// it's here to stop bots
// i'll delete it later
const key = 'e95d925:94g75d19bg617:dfbg444c2c'.split('').map(c => String.fromCharCode(c.charCodeAt(0) - 1)).join('');

async function getImages(text: string): Promise<string[]> {
    const url = new URL("https://api.bing.microsoft.com/v7.0/images/search");
    url.searchParams.append('q', text);
    url.searchParams.append('cc', 'CA');
    url.searchParams.append('safeSearch', 'strict');

    const data = await requester.get(url, {
        'Ocp-Apim-Subscription-Key': key,
    });

    const images: { thumbnailUrl: string }[] = data.value;

    return Promise.all(images.map(async ({thumbnailUrl}) => {
        const blob = await getImageFromUrl(thumbnailUrl);
        const reader = new FileReader();

        reader.readAsDataURL(blob);
        return new Promise((resolve, reject) => {
            reader.onload = (e) => {
                if (typeof e.target?.result !== 'string') reject(new Error("invalid result for " + thumbnailUrl));
                else resolve(e.target.result);
            };
            reader.onerror = reject;
            reader.onabort = reject
        });
    }));
}

export {
    getImages
}
