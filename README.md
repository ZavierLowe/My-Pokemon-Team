This is a simple [Next.js](https://nextjs.org/) project learning to use [SWR](https://swr.vercel.app/) which is a react hook for data fetching in Nextjs applications.

I used the data fetching function to fetch my favorite pokemon from the PokiApi and render them on screen.

## Sample Image of Project



Instead of using the normal fetch function 


we intsted use a small line of example code provided by the library.

```
import useSWR from 'swr'
 
function Profile () {
  const { data, error, isLoading } = useSWR('/api/user/123', fetcher)
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
 
  // render data
  return <div>hello {data.name}!</div>
}
```






