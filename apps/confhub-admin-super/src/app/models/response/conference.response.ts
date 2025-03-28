export type ConferenceResponse = {
  payload: ConferenceResponseItem[];
  meta: ConferenceResponseMeta;
};

export type ConferenceResponseItem = {
  id: string;
  title: string;
  acronym: string;
  location: {
    cityStateProvince: string;
    country: string;
    address: string;
    continent: string;
  };
  rank: string;
  source: string;
  year: number;
  researchFields: string[];
  topics: string[];
  dates: {
    fromDate: string;
    toDate: string;
    name: string;
    type: string;
  };
  link: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  accessType: string;
  status: string;
};

export type ConferenceResponseMeta = {
  curPage: number;
  perPage: number;
  totalPage: number;
  prevPage: number | null;
  nextPage: number | null;
  totalItems: number;
};
