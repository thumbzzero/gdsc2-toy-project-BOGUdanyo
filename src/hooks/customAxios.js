import axios from "axios";

export const customAxios = axios.create({
	baseURL : "https://bogudanyo.kro.kr/",
});