import Image from "next/image";
import { Inter } from "next/font/google";
import useSWR from "swr";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const teamIds = [
		395, 350, 384, 383, 445, 248, 146, 144, 484, 6, 9, 250, 260, 251, 249, 150,
		157, 160, 257, 254,
	];
	const fetcher = (...args) => fetch(...args).then((res) => res.json());

	// fetchTeamData funciton is an async function that can perform an asynchronous operations, meaning it can wait for something to happen (like fetching data) before continuing.
	const fetchTeamData = async () => {
		const urls = teamIds.map((id) => `https://pokeapi.co/api/v2/pokemon/${id}`); //users the map function to iterate over the teamIds array to get the ids of the pokemon we want and creates a url to fetch its data

		const promises = urls.map((url) => fetch(url).then((res) => res.json()));
		//uses the fetch api to send a requerst to the Pokemon API endpoint specified by the url
		const pokemonData = await Promise.all(promises);
		//uses the promise.all method to wait for the promises array to relsove. Once all data is fetched its stored in the pokemonData variable

		return pokemonData;
	};

	const [pokemonData, setPokemonData] = useState([]);
	useEffect(() => {
		fetchTeamData().then((data) => setPokemonData(data));
	}, []);

	const { error } = useSWR(fetchTeamData, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshInterval: 30000,
	});
	console.log(pokemonData);

	if (error) return <div>Error fetching Pokemon data</div>;
	if (!pokemonData) return <div>Loading...</div>;

	//Basic code to help get started with calling the api
	// const fetcher = (...args) => fetch(...args).then((res) => res.json());
	//  const { data, error } = useSWR(
	// 		"https://pokeapi.co/api/v2/pokemon/empoleon", fetcher
	// 	);

	return (
		<main className="bg-stone-800 max-h-screen p-12">
      <div className="text-center mb-12">

			<h1 className="text-5xl text-white">My Favorite Pokemon </h1>
      </div>
			<div className="container mx-auto grid grid-cols-4 gap-4 ">
				{pokemonData.map((pokemon: any) => {
					return (
						<div key={pokemon.id} className=" text-white ">
							<div className="bg-neutral-900 border border-gray-400 w-[375px] p-6 rounded-3xl">
								<div className="bg-gradient-to-r from-neutral-800 via-gray-700 to-stone-700 border border-gray-200 rounded-3xl">
									<Image
										className=" p-8 items-center"
										src={
											pokemon.sprites.other.home.front_shiny ||
											pokemon.sprites.front_shiny
										}
										width={400}
										height={400}
										alt={`${pokemon.name} }`}
									/>
								</div>

								<h2 className="text-2xl capitalize mt-2 ">{pokemon.name}</h2>
								<p className="bg-stone-800 rounded-xl p-2 mt-2 capitalize">
									<b className="">Type:</b>{" "}
									{pokemon.types.map((slot: any) => slot.type.name).join(" / ")}
								</p>
								<p className="bg-stone-800 rounded-xl p-2 mt-2 capitalize">
									{" "}
									<b className="">Ability: </b>
									{pokemon.abilities[0].ability.name}
								</p>

								{/* ...render other desired pokemon details... */}
								<div className="bg-stone-800 rounded-xl py-2 px-2 mt-2 ">
									<div className=" text-md text-gray-500"> Base Stats</div>
									{/* Health Stat */}
									<div className="flex items-center mt-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="green"
											className="bi bi-battery-full"
											viewBox="0 0 16 16">
											<path d="M2 6h10v4H2z" />
											<path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8" />
										</svg>
										<p className=" capitalize ml-2">
											{pokemon.stats[0].stat.name}:
										</p>
										<p className=" ml-2">{pokemon.stats[0].base_stat}</p>
									</div>
									{/* Attack Stat */}
									<div className="flex items-center mt-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="24"
											height="24"
											fill="red">
											<path d="M7.04813 13.4061L10.5831 16.9421L9.1703 18.3558L10.5849 19.7711L9.17064 21.1853L6.69614 18.71L3.86734 21.5388L2.45312 20.1246L5.28192 17.2958L2.80668 14.8213L4.22089 13.4071L5.63477 14.8202L7.04813 13.4061ZM2.99907 3L6.54506 3.00335L18.3624 14.8207L19.7772 13.4071L21.1915 14.8213L18.7166 17.2962L21.545 20.1246L20.1308 21.5388L17.3024 18.7104L14.8275 21.1853L13.4133 19.7711L14.8269 18.3562L3.00181 6.53118L2.99907 3ZM17.4563 3.0001L20.9991 3.00335L21.001 6.52648L16.9481 10.5781L13.4121 7.0431L17.4563 3.0001Z"></path>
										</svg>
										<p className=" ml-2 capitalize">
											{pokemon.stats[1].stat.name}:
										</p>
										<p className=" ml-2">{pokemon.stats[1].base_stat}</p>
									</div>

									<div className="flex items-center mt-2">
										{/* Defense Stat */}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="yellow"
											class="bi bi-shield-fill"
											viewBox="0 0 16 16">
											<path d="M5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56" />
										</svg>
										<p className=" ml-2 capitalize">
											{" "}
											{pokemon.stats[2].stat.name}:
										</p>
										<p className=" ml-2">{pokemon.stats[2].base_stat}</p>
									</div>
									{/* Special Attack */}
									<div className="flex items-center mt-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="24"
											height="24"
											fill="purple"
											className="">
											<path d="M13.1997 2.00644C21.2413 2.09355 22.0006 3.25057 22.0006 12.0006L21.9948 13.1996C21.9077 21.2413 20.7506 22.0006 12.0006 22.0006L10.8016 21.9947C3.14288 21.9117 2.08947 20.8583 2.00651 13.1996L2.00098 11.6913L2.00651 10.8015C2.09154 2.95134 3.19615 2.04086 11.3885 2.00195L13.1997 2.00644ZM8.25064 7.00057H7.66731C7.33265 7.00057 7.0555 7.2473 7.00787 7.56874L7.00064 7.66724V11.3339C7.00064 11.6688 7.24737 11.9458 7.56881 11.9933L7.66731 12.0006H8.25064C10.2549 12.0006 11.8919 13.573 11.9954 15.5514L12.0006 15.7506V16.3339C12.0006 16.6688 12.2474 16.9458 12.5688 16.9933L12.6673 17.0006H16.334C16.6686 17.0006 16.9458 16.754 16.9934 16.4325L17.0006 16.3339V15.7506C17.0006 11.0044 13.2218 7.14078 8.50863 7.0043L8.25064 7.00057Z"></path>
										</svg>
										<p className="ml-2 capitalize">
											{" "}
											{pokemon.stats[3].stat.name}:
										</p>
										<p className=" ml-2">{pokemon.stats[3].base_stat}</p>
									</div>
									{/* Special Defense */}
									<div className="flex items-center mt-2 ">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="orange"
											className="bi bi-shield-lock-fill"
											viewBox="0 0 16 16">
											<path
												fill-rule="evenodd"
												d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5"
											/>
										</svg>
										<p className=" ml-2 capitalize">
											{pokemon.stats[4].stat.name}:
										</p>
										<p className=" ml-2">{pokemon.stats[4].base_stat}</p>
									</div>
									{/* Speed Stat */}
									<div className="flex items-center mt-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="24"
											height="24"
											fill="gray">
											<path d="M20 13C20 15.2091 19.1046 17.2091 17.6569 18.6569L19.0711 20.0711C20.8807 18.2614 22 15.7614 22 13 22 7.47715 17.5228 3 12 3 6.47715 3 2 7.47715 2 13 2 15.7614 3.11929 18.2614 4.92893 20.0711L6.34315 18.6569C4.89543 17.2091 4 15.2091 4 13 4 8.58172 7.58172 5 12 5 16.4183 5 20 8.58172 20 13ZM15.293 8.29297 10.5 12.5 12.5 14.5 16.7072 9.70718 15.293 8.29297Z"></path>
										</svg>
										<p className="ml-2 capitalize">
											{pokemon.stats[5].stat.name}:
										</p>
										<p className="ml-1">{pokemon.stats[5].base_stat}</p>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</main>
	);
}
