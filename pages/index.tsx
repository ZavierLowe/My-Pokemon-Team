import Image from 'next/image'
import { Inter } from 'next/font/google'
import useSWR from 'swr'
import { useState, useEffect } from 'react'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const teamIds = [395, 350, 914, 383, 445, 975];
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

// fetchTeamData funciton is an async function that can perform an asynchronous operations, meaning it can wait for something to happen (like fetching data) before continuing.
  const fetchTeamData = async () => {
	const urls = teamIds.map((id) => `https://pokeapi.co/api/v2/pokemon/${id}`); //users the map function to iterate over the teamIds array to get the ids of the pokemon we want and creates a url to fetch its data

	const promises = urls.map((url) => fetch(url).then((res) => res.json()));
    //uses the fetch api to send a requerst to the Pokemon API endpoint specified by the url
	const pokemonData = await Promise.all(promises);
  //uses the promise.all method to wait for the promises array to relsove. Once all data is fetched its stored in the pokemonData variable

  return pokemonData

 };

const [pokemonData, setPokemonData] = useState([]);
useEffect(() => {
  
    
		
    fetchTeamData().then((data) => setPokemonData(data));
	
	
} ,[] );


	const { error } = useSWR(fetchTeamData, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshInterval: 30000,
	});
    console.log(pokemonData);
    

 if (error) return <div>Error fetching Pokemon data</div>;
if (!pokemonData) return <div>Loading...</div>;

  
  
     ;
      
		//Basic code to help get started with calling the api
		// const fetcher = (...args) => fetch(...args).then((res) => res.json());
		//  const { data, error } = useSWR(
		// 		"https://pokeapi.co/api/v2/pokemon/empoleon", fetcher
		// 	);

		return (
			<main className="bg-green-900 h-full">
				<div className="flex">
					<h1 className="text-2xl">My Pokemon Team</h1>

					{pokemonData.map((pokemon) => {
						const imageKeys = Object.keys(['pokemon.sprites.other.official-artwork']); //how to turn an array that has a hyphen readable json

						return (
							<div key={pokemon.id} className="bg-black">
								{imageKeys.map((key) => (
									//Had issues showing different images becasue the array had a underscore in it so I used the two pipes to output one or the other if its not there
                  <Image
										key={key}
										src={
											pokemon.sprites.other.dream_world.front_default ||
											pokemon.sprites.front_default
										}
										width={250}
										height={200}
										alt={`${pokemon.name} - ${key}`}
									/>
								))}
								<h2 className="text-xl uppercase">{pokemon.name}</h2>
								<p>
									<b>Type:</b>{" "}
									{pokemon.types.map((type) => type.name).join(", ")}
								</p>
								{/* ...render other desired pokemon details... */}
							</div>
						);
					})}
				</div>

				<div className="grid grid-cols-4"></div>
			</main>
		);
	};
    
