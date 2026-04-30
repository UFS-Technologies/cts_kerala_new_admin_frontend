/***
 * Base API service for application
 * All http request will be handled from here
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscribable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
}
)
export class BaseApi {
    constructor(
        private http: HttpClient,
    ) {

    }
    getSub(meth: Subscribable<any>): Promise<any> {
        return new Promise((res, rej) => {
            meth.subscribe(s => {
                res(s);
            }, e => {
                rej(e);
            });
        });
    }

    get(api: string, params?: any): Promise<any> {
        return this.getSub(this.http.get(environment.BasePath + api, { params: params }));
    }
    delete(api: string): Promise<any> {
        return this.getSub(this.http.delete(environment.BasePath + api));
    }
    createFormData(object: Object, form?: FormData, namespace?: string): FormData {
        const formData = form || new FormData();
        for (const property in object) {
            if (!object.hasOwnProperty(property)) {
                continue;
            }
            const formKey = namespace ? `${namespace}[${property}]` : property;
            if (object[property] instanceof Date) {
                formData.append(formKey, object[property].toISOString());
            } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
                this.createFormData(object[property], formData, formKey);
            } else {
                formData.append(formKey, object[property]);
            }
        }
        return formData;
    }
    converToFormData(data: any) {
        const formData = new FormData();
        if (typeof data === 'object') {
            for (const d in data) {
                if (!d) {
                    continue;
                }
                let dataD = data[d];
                if (typeof dataD === 'object') {
                    if (d === 'photos') {
                        let inc = 0;
                        for (const it of dataD) {
                            formData.append(d, it);
                            inc++;
                        }
                    } else {
                        dataD = JSON.stringify(dataD);
                        formData.append(d, dataD);
                    }
                } else {
                    formData.append(d, dataD);
                }
            }
        }
        return formData;
    }

    putFormData(api: string, data: any) {
        return this.put(api, this.converToFormData(data));
    }

    postFormData(api: string, data: any) {
        return this.post(api, this.converToFormData(data));
    }

    post(api: string, data: any): Promise<any> {
        return this.getSub(this.http.post(environment.BasePath + api, data));
    }

    download(api: string, data: any): Promise<any> {
        return this.http.post(environment.BasePath + api, data, { responseType: 'blob' }).toPromise();
    }

    put(api: string, data: any): Promise<any> {
        return this.http.put(environment.BasePath + api, data).toPromise();
    }

}
