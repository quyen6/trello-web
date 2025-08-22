import axios from "axios";
import { toast } from "react-toastify";
import { interceptorLoadingElements } from "./formatter";

// Khởi tạo một đối tượng Axios (authorizedAxiosInstance) mục đích để custom và cầu hình chung cho dự án.
let authorizedAxiosInstance = axios.create();

// Thời gian chờ tôi đa của 1 reqquest: để 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

// withCredentials: Sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ việc chúng ta sẽ luu JWT tokens (refresh & access) vao trong httpOnly Cookie của trình duyệt)
authorizedAxiosInstance.defaults.withCredentials = true;

export default authorizedAxiosInstance;

// Cấu hình Interceptors (Bộ đánh chặn vào giữa mọi Request và Response)

// Interceptors Request: can thệp vào giữa những cái request API
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // Kĩ thuật chặn spam click
    interceptorLoadingElements(true);
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Interceptors Response: can thệp vào giữa những cái response nhận về
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Kĩ thuật chặn spam click
    interceptorLoadingElements(false);
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Mọi mã http status code nằm ngoài khoảng 200 - 299 sẽ là error và rơi vào đây

    // Kĩ thuật chặn spam click
    interceptorLoadingElements(true);

    // Xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API ở đây (viết code 1 lần: Clean Code)
    let errorMessage = error?.message;
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message;
    }
    // Dùng toastify để hiển thị bất kể mọi mã lỗi lên màn hình - Ngoại trừ mã 410 - GONE phục vụ việc tự động refresh lại token
    if (error.response?.status !== 410) {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);
