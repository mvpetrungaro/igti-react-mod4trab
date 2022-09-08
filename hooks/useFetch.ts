import useSWR from 'swr'

const baseURL = 'https://fakestoreapi.com'

export function useFetch<Data>(url: string) {
  return useSWR<Data>(url, async (path) => {
    return await fetch(`${baseURL}/${path}`).then((res) => res.json())
  })
}
