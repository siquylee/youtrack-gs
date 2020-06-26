import { YoutrackClient } from "../youtrack";
import format from "string-template";
import { generateFieldsQuery, GenericObject } from "../entities/fields/utils";

export class BaseEndpoint {
    public constructor(protected client: YoutrackClient) {
    }

    protected format(template: string, values: {}): string {
        return format(template, values);
    }

    protected toPromise<T>(response: GoogleAppsScript.URL_Fetch.HTTPResponse): Promise<T> {
        return new Promise((resolve, reject) => {
            let status = response.getResponseCode();
            let json = response.getContentText();

            try {
                let result = JSON.parse(json) as T;
                if (200 <= status && status < 300) {
                    resolve(result);
                } else {
                    reject(result);
                }
            }
            catch (e) {
                reject(e);
            }
        });
    }

    protected getResource<T>(url: string, params = {}): Promise<T> {
        return this.toPromise<T>(this.client.get(url, params));
    }

    protected postResource<T>(url: string, params = {}): Promise<T> {
        return this.toPromise<T>(this.client.post(url, params));
    }

    protected getResourceWithFields<T>(url: string, implementation: new () => object, options: { qs?: GenericObject } = {}): Promise<T> {
        return this.getResource(url, {
            qs: {
                fields: generateFieldsQuery(new implementation()),
                ...(options.qs || {})
            }
        })
    }

    protected postResourceWithFields<T>(url: string, implementation: new () => object, options: {
        qs?: GenericObject,
        body?: any,
        form?: any
    } = {}): Promise<T> {
        return this.postResource(url, {
            ...options,
            qs: {
                fields: generateFieldsQuery(new implementation()),
                ...(options.qs || {})
            }
        })
    }
}
