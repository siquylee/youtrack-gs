import { YoutrackTokenOptions } from "./options/youtrack_options";
import { UserEndpoint } from "./endpoints/user";
import { TagEndpoint } from "./endpoints/tag";
import { IssueEndpoint } from "./endpoints/issue";
import { ProjectEndpoint } from "./endpoints/project";
import { AgileEndpoint } from "./endpoints/agile";
import { SprintEndpoint } from "./endpoints/sprint";
import { WorkItemEndpoint } from "./endpoints/workitem";
import { CommentEndpoint } from "./endpoints/comment";

export interface YoutrackClient {
    get(url: string, params?: {}, headers?: {}): GoogleAppsScript.URL_Fetch.HTTPResponse;

    post(url: string, params?: {}, headers?: {}): GoogleAppsScript.URL_Fetch.HTTPResponse;

    delete(url: string, params?: {}, headers?: {}): GoogleAppsScript.URL_Fetch.HTTPResponse;

    put(url: string, params?: {}, headers?: {}): GoogleAppsScript.URL_Fetch.HTTPResponse;

    readonly users: UserEndpoint;
    readonly tags: TagEndpoint;
    readonly issues: IssueEndpoint;
    readonly projects: ProjectEndpoint;
    readonly agiles: AgileEndpoint;
    readonly sprints: SprintEndpoint;
    readonly workItems: WorkItemEndpoint;
    readonly comments: CommentEndpoint;
}

interface RequestOptions {
    [key: string]: any;
}

export class Youtrack implements YoutrackClient {
    private readonly baseUrl: string;
    private defaultRequestOptions: RequestOptions = { muteHttpExceptions: false, contentType: 'application/json' };
    public readonly users: UserEndpoint;
    public readonly tags: TagEndpoint;
    public readonly issues: IssueEndpoint;
    public readonly projects: ProjectEndpoint;
    public readonly agiles: AgileEndpoint;
    public readonly sprints: SprintEndpoint;
    public readonly workItems: WorkItemEndpoint;
    public readonly comments: CommentEndpoint;

    public constructor(options: YoutrackTokenOptions) {
        this.defaultRequestOptions = {
            ...this.defaultRequestOptions,
            headers: {
                Authorization: `Bearer ${options.token}`
            }
        };
        this.baseUrl = this.formBaseUrl(options.baseUrl);
        this.users = new UserEndpoint(this);
        this.tags = new TagEndpoint(this);
        this.issues = new IssueEndpoint(this);
        this.projects = new ProjectEndpoint(this);
        this.agiles = new AgileEndpoint(this);
        this.sprints = new SprintEndpoint(this);
        this.workItems = new WorkItemEndpoint(this);
        this.comments = new CommentEndpoint(this);
    }

    public post(url: string, params = {}, headers: {} = {}): GoogleAppsScript.URL_Fetch.HTTPResponse {
        return this.fetch(this.baseUrl + url, this.prepareParams('post', params, headers));
    }

    public get(url: string, params = {}, headers = {}): GoogleAppsScript.URL_Fetch.HTTPResponse {
        return this.fetch(this.baseUrl + url, this.prepareParams('get', params, headers));
    }

    public delete(url: string, params = {}, headers = {}): GoogleAppsScript.URL_Fetch.HTTPResponse {
        return this.fetch(this.baseUrl + url, this.prepareParams('delete', params, headers));
    }

    public put(url: string, params = {}, headers = {}): GoogleAppsScript.URL_Fetch.HTTPResponse {
        return this.fetch(this.baseUrl + url, this.prepareParams('put', params, headers));
    }

    private fetch(url: string, params: any): GoogleAppsScript.URL_Fetch.HTTPResponse {
        if (params.qs) {
            url = `${url}?${this.toQueryString(params.qs)}`;
            delete params.qs;
        }
        var res = UrlFetchApp.fetch(url, params);
        return res;
    }

    private formBaseUrl(baseUrl: string): string {
        if (baseUrl.match(/\/$/)) {
            baseUrl = baseUrl.slice(0, -1);
        }
        if (!baseUrl.match(/api$/i)) {
            baseUrl += "/api";
        }
        return baseUrl;
    }

    private prepareParams(method: 'post' | 'get' | 'delete' | 'put', params: any, customHeaders: {}): {} {
        if (method !== 'get') {
            params.payload = JSON.stringify(params);
        }
        params.method = method;

        if ('headers' in this.defaultRequestOptions && Object.keys(customHeaders).length > 0) {
            // merge the header parameters
            const { headers, ...defaultOptions } = this.defaultRequestOptions;
            return { ...defaultOptions, ...params, headers: { ...headers, ...customHeaders } };
        }
        if ('headers' in this.defaultRequestOptions) {
            return { ...this.defaultRequestOptions, ...params }
        }
        return { ...this.defaultRequestOptions, ...params, headers: { ...customHeaders } }
    }

    private toQueryString(params: any): string {
        return Object.keys(params).reduce((result, key) => {
            const value = params[key];
            if (!value) {
                return result;
            }
            if (Array.isArray(value)) {
                (<any[]>value).forEach(v => result.push(`${key}[]=${encodeURIComponent(v)}`));
            } else {
                result.push(`${key}=${encodeURIComponent(value)}`);
            }
            return result;
        }, []).join('&');
    }
}
