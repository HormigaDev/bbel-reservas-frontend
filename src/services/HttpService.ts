'use client';

import SessionService from './SessionService';
import { API_URL } from '@/app.data.json';

class HttpService {
    private url: string;
    private headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'BBELReserved/1.0',
    };
    private useToken: boolean = true;

    constructor(url: string = API_URL) {
        this.url = url;
    }

    private getHeaders() {
        const headers = this.headers;
        if (this.useToken) {
            const token = SessionService.getToken();
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    private PutPost(
        endpoint: string,
        method: 'PUT' | 'POST',
        body: Record<string, any>
    ) {
        return new Promise((resolve, reject) => {
            try {
                fetch(this.url + endpoint, {
                    method: method,
                    headers: this.getHeaders(),
                    body: JSON.stringify(body),
                }).then((response) => {
                    if (response.status === 401) {
                        return (window.location.href = '/auth/login');
                    } else if (response.status >= 500) {
                        //TODO: Implementar respuesta de falla del servidor
                    } else if (
                        response.status >= 200 &&
                        response.status <= 299
                    ) {
                        response.json().then((data) => {
                            if (!data) {
                                reject('');
                                //TODO: logica de error de consulta, mostrar mensaje al cliente
                            }
                            resolve(data);
                        });
                    }
                });
            } catch (err) {
                ((_) => _)(err);
            }
        });
    }

    private GetDelete(
        endpoint: string,
        method: 'DELETE' | 'GET',
        params: Record<string, any>
    ) {
        const queries: string[] = [];
        Object.entries(params).forEach(([key, value]) => {
            const param = `${key}=${encodeURIComponent(value)}`;
            queries.push(param);
        });

        return new Promise((resolve, reject) => {
            const url =
                this.url + endpoint + queries.length
                    ? `?${queries.join('&')}`
                    : '';
            fetch(url, {
                method,
                headers: this.getHeaders(),
            }).then((response) => {
                if (response.status === 401) {
                    return (window.location.href = '/auth/login');
                } else if (response.status >= 500) {
                    //TODO: implementar logica de manejo de errores del servidor
                } else if (response.status >= 200 && response.status <= 299) {
                    response.json().then((data) => {
                        if (!data) {
                            reject('');
                            //TODO: logica cuando falla la consulta
                        }
                        resolve(data);
                    });
                }
            });
        });
    }

    public addHeader(key: string, value: string) {
        this.headers[key] = value;
    }

    public setUseToken(value: boolean) {
        this.useToken = value;
    }

    public async get(
        endpoint: string,
        params: Record<string, any>
    ): Promise<any> {
        const data = await this.GetDelete(endpoint, 'GET', params);
        return data;
    }

    public async delete(
        endpoint: string,
        params: Record<string, any>
    ): Promise<void> {
        await this.GetDelete(endpoint, 'DELETE', params);
    }

    public async post(
        endpoint: string,
        body: Record<string, any>
    ): Promise<any> {
        const data = await this.PutPost(endpoint, 'POST', body);
        return data;
    }

    public async put(
        endpoint: string,
        body: Record<string, any>
    ): Promise<void> {
        await this.PutPost(endpoint, 'PUT', body);
    }
}

export default HttpService;
