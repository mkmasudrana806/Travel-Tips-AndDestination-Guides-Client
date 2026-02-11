import { TApiResponse } from "@/types/TApiResponse";
import baseApi from "../../api/baseApi";

type TUploadResponse = {
  url: string;
  _id: string;
};

const uploadImageApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // ----------- login an user
    uploadImage: builder.mutation<TApiResponse<TUploadResponse>, FormData>({
      query: (file) => ({
        url: "/uploads/upload-image",
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadImageApi;
