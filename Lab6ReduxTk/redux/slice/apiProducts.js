import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://172.16.49.81:3000/api/", // Đổi đúng IP backend của bạn
  }),
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    // Lấy danh sách sản phẩm
    getProducts: builder.query({
      query: () => "products",
      providesTags: ["Product"],
    }),

    // Thêm sản phẩm mới
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),

    // Sửa sản phẩm
    updateProduct: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Product"],
    }),

    // Xoá sản phẩm
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

// Export hook tương ứng
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = api;
