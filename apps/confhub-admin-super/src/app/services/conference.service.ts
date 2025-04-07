import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ConferenceResponse } from '../models/response/conference.response';
import { ConferenceRequest } from '../models/request/conference.request';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  httpClient = inject(HttpClient) ; 
  apiUrl = environment.apiUrl ;

  getConference(params : ConferenceRequest | undefined) {
    const url = `${this.apiUrl}/admin-conference/get`;
    return this.httpClient.get<ConferenceResponse>(url, { params });
  }

}
