This is a simple [Next.js](https://nextjs.org/) project learning to use [SWR](https://swr.vercel.app/) which is a react hook for data fetching in Nextjs applications.

I used the data fetching function to fetch my favorite pokemon from the [PokiApi](https://pokeapi.co/) and render them on screen showing thier image and stats from the API.

## Sample Image of Project
![alt text](https://github.com/ZavierLowe/My-Pokemon-Team/blob/main/public/images/My-fav-pokemon.png)


Instead of using the normal fetch function we intsted use a small line of example code provided by the library.

```
import useSWR from 'swr'


function Profile () {
 const fetcher = (...args) => fetch(...args).then(res => res.json())
 const { data, error, isLoading } = useSWR('/api/user/123', fetcher)
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
 
  // render data
  return <div>hello {data.name}!</div>
}
```






