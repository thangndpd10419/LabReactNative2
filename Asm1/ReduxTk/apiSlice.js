import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://172.16.52.241:3000/api/",
  }),
  tagTypes: ["Tree", "Pot"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      providesTags: ["Tree"],
    }),

    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Tree"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Tree"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tree"],
    }),
    // searchsearch
    searchProducts: builder.query({
      query: (searchTerm) =>
        `/products/search?q=${encodeURIComponent(searchTerm)}`,
    }),

    // Lấy danh sách sản phẩm ========POT
    getPot: builder.query({
      query: () => "plantpots",
      providesTags: ["Pot"],
    }),

    // Thêm sản phẩm mới
    addPlantpot: builder.mutation({
      query: (newPlantpot) => ({
        url: "plantpots",
        method: "POST",
        body: newPlantpot,
      }),
      invalidatesTags: ["Pot"],
    }),

    // Sửa sản phẩm
    updatePlantpot: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `plantpots/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Pot"],
    }),

    // Xoá sản phẩm
    deletePlantpot: builder.mutation({
      query: (id) => ({
        url: `plantpots/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pot"],
    }),
  }),
});

// export hook
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSearchProductsQuery,
  useGetPotQuery,
  useAddPlantpotMutation,
  useUpdatePlantpotMutation,
  useDeletePlantpotMutation,
} = api;
