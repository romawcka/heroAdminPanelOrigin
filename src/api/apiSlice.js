import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
  tagTypes: ['Heroes'],
  endpoints: builder => ({
    getHeroes: builder.query({    // просто получить данные 
      query: () => '/heroes', //слеш нужен для адреса, чтобы получилось http://localhost:3001/heroes
      providesTags: ['Heroes'] // 
    }),
    createHero: builder.mutation({ // создание персонажа //18
      query: hero => ({
        url: '/heroes', // где будет проводитсья мутация
        method: 'POST', // какой метод будет использован
        body: hero // что вообще уйдет на сервер
      }),
      invalidatesTags: ['Heroes']
    }),
    deleteHero: builder.mutation({
      query: id => ({
        url: `/heroes/${id}`, // по которому будет отправлен запрос
        method: 'DELETE' //  какой метод будет использован
      }),
      invalidatesTags: ['Heroes']
    })
  })
});

export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice;