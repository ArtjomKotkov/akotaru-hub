import {Injectable} from "@angular/core";
import {head} from "@ngneat/elf";


@Injectable({
    providedIn: 'root'
})
export class Request {
    private concatHeaders(headers?: Record<string, string>): Record<string, string> {
        let resultHeaders = {'Content-Type': 'application/json'};
        if (headers) {
            resultHeaders = {...headers, ...resultHeaders};
        }
        return resultHeaders;
    }

    private makeQueryParams(query?: Record<string, any>): string | undefined {
        if (!query) {
            return undefined;
        }

        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(query)) {
            queryParams.append(key, value);
        }
        return queryParams.toString();
    }

    async get(
        url: string,
        headers?: Record<string, string>,
        query?: Record<string, any>,
    ): Promise<any> {
        let requestUrl = url;

        const queryParams = this.makeQueryParams(query);
        if (queryParams) {
            requestUrl = requestUrl + '?' + queryParams;
        }

        return await fetch(
            requestUrl,
            {
                method: 'GET',
                headers: headers,
            }
        )
    }

    async post(
        url: string,
        data: Record<string, any>,
        headers?: Record<string, string>,
    ): Promise<any> {
        return await fetch(
            url,
            {
                method: 'POST',
                headers: this.concatHeaders(headers),
                body: JSON.stringify(data),
            },
        )
    }

    async delete(
        url: string,
        headers? : Record<string, string>,
    ): Promise<any> {
        return await fetch(
            url,
            {
                method: 'DELETE',
                headers: headers,
            },
        )
    }
}
