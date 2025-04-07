import { ConferenceResponseItem } from "./conference.response";

export type ConferenceImportResponse = {
    message : string;
    data : ConferenceResponseItem[] | undefined;
}