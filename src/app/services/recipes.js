import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

  
  export const recipeApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/'}),
    endpoints: (build) => ({
      getRecipes: build.query({
        query: () =>  '/recipes',
      }),
      getRecipe: build.query({
        query: (id) => `/recipes/${id}`,
      }),
      getSpecials: build.query({
        query: () => '/specials'
      })
    }),
  });
  
  export const {
    useGetRecipeQuery,
    useGetRecipesQuery,
    useGetSpecialsQuery
  } = recipeApi;
  
  