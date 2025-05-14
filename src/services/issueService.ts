import axios from "axios";
import { Issue } from "models/Issue";

import env from "env/env";
import api from "interceptor/axiosInterceptor";

const API_URL = env.VITE_API_URL + "/issues";