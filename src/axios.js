import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5001/project-b9e3c/us-central1/api",
});

export default instance;
