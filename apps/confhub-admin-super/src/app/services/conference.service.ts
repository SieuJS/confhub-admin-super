import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ConferenceResponse } from '../models/response/conference.response';
import { ConferenceRequest } from '../models/request/conference.request';
import { ConferenceImportResponse } from '../models/response/conferenceImportResponse';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  httpClient = inject(HttpClient);
  apiUrl = environment.apiUrl;

  getConference(params: ConferenceRequest | undefined) {
    const url = `${this.apiUrl}/admin-conference/get`;
    return this.httpClient.get<ConferenceResponse>(url, { params });
  }

  uploadFileCsv(file: File) {
    const url = `${this.apiUrl}/admin-conference/upload-file-csv`;
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<ConferenceImportResponse>(url, formData);
  }

  uploadEvaluatedFileCsv(file: File) {
    const url = `${this.apiUrl}/admin-conference/import-evaluate`;
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<ConferenceImportResponse>(url, formData);
  }
}
