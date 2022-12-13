import axios from "axios";

axios.defaults.baseURL = "http://3.141.23.218:5000";

export type Product = {
  name: string;
  growth: number;
  update_dt?: string;
  search_msv: Array<{ date: string; sv: number }>;
};

export interface fetchSearchResponse {
  product_trends: Product[];
}

export const fetchSearch = (search_phrase: string) => {
  return axios.post<{ data: fetchSearchResponse }>("/interview/keyword_search", {
    login_token: "INTERVIEW_SIMPLY2021",
    search_phrase,
  });
};
