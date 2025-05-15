import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.token;
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),

  reducerPath: "api",
  tagTypes: ["Users", "Products", "Cart"],
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "/api/users",
      providesTags: ["Users"],
    }),
    fetchProducts: builder.query({
      query: () => "/api/products",
      providesTags: ["Products"],
    }),
    fetchUserCart: builder.query({
      query: () => ({
        url: `/api/user_cart`,
      }),
      providesTags: ["Cart"],
    }),
    fetchSingleUser: builder.query({
      query: (user_id) => `/api/users/${user_id}`,
      providesTags: ["Users"],
    }),
    fetchSingleProduct: builder.query({
      query: (product_id) => `/api/products/${product_id}`,
      providesTags: ["Products"],
    }),
    addToCart: builder.mutation({
      query: ({ product_id, quantity = 1 }) => ({
        url: `/api/user_cart`,
        method: "POST",
        body: { product_id, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/api/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),
    changeQuantity: builder.mutation({
      query: ({ product_id, quantity }) => ({
        url: `/api/user_cart/${product_id}`,
        method: "PUT",
        body: { quantity },
      }),
    }),
    editProduct: builder.mutation({
      query: ({ product_id, productData }) => ({
        url: `/api/products/${product_id}`,
        method: "PUT",
        body: productData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (product_id) => ({
        url: `/api/products/${product_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    removeFromCart: builder.mutation({
      query: ({ product_id }) => ({
        url: `/api/user_cart/${product_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: `/api/user_cart`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    //Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/login",
        method: "POST",
        body: {
          username: credentials.username,
          password: credentials.password,
          name: credentials.name,
          mailing_address: credentials.mailing_address,
          is_admin: credentials.is_admin,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/api/register",
        method: "POST",
        body: {
          username: userData.username,
          password: userData.password,
          name: userData.name,
          mailing_address: userData.mailing_address,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
export const {
  useFetchUsersQuery,
  useFetchProductsQuery,
  useFetchUserCartQuery,
  useFetchSingleUserQuery,
  useFetchSingleProductQuery,
  useAddToCartMutation,
  useCreateProductMutation,
  useChangeQuantityMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useLoginMutation,
  useCreateUserMutation,
} = api;
