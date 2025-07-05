import { apiSlice } from "../../app/api/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";


const productsAdapter = createEntityAdapter({})

const initialState = productsAdapter.getInitialState()


export const productsApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/products',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedProducts = responseData.map(product => {
                    product.id = product._id
                    return product
                });
                return productsAdapter.setAll(initialState, loadedProducts)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: 'Product', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Product', id}))
                    ]
                }else{
                    return [{type: 'Product', id: 'LIST'}]
                }
            }
        }),

        addNewProduct: builder.mutation({
            query: initialProductData => ({
                url: '/products',
                method: "POST",
                body:{
                    ...initialProductData,
                }
            }),
            invalidatesTags:[
                {type: "Product", id: 'LIST'}
            ]
        }),
        apdateProduct: builder.mutation({
            query: initialProductData => ({
                url: '/products',
                method: "PATCH",
                body: {
                    ...initialProductData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url:'/products',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetProductsQuery,
    useAddNewProducsMutation,
    useUpdateProducsMutation,
    useDeleteProducsMutation,
} = productsApiSlice


export const selectProductsResult = productsApiSlice.endpoints.getProducts.select()


const selectProductData = createSelector(
    selectProductsResult,
    productResult => productResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds
    // Pass in a selector that returns the users slice of state
} = productsAdapter.getSelectors(state => selectProductData(state) ?? initialState)