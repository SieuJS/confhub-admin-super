export type ConferenceResponse = {
  data: ConferenceResponseItem[];
  meta: ConferenceResponseMeta;
};

export type ConferenceResponseItem = {
  id: string;
  title: string;
  sources: string[];
  acronym: string;
  ranks: string[];
  researchFields: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type ConferenceResponseMeta = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
};
