import { DriverResponse } from "@interfaces/driver/DriverResponse";
import { PassengerResponse } from "@interfaces/passenger/PassengerResponse";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getRoleBasedOnToken } from "src/utils/getRoleBasedOnToken";

interface ProfileProps {}

export default function Profile(props: ProfileProps) {
	const [profileInfo, setProfileInfo] = useState<
		DriverResponse | PassengerResponse
	>();

	useEffect(() => {}, []);

	async function fetchProfileInfo() {
		if (getRoleBasedOnToken() === "ROLE_DRIVER") {
		} else if (getRoleBasedOnToken() === "ROLE_PASSENGER") {
		} else {
			console.error("Error: No role found");
		}
	}

	return (
		<article>
			<h1 className="title mb-3">Pasajero</h1>
			<section className="flex">
				<div className="w-2/5">
					<FaUserCircle className="w-full text-9xl" />
				</div>
				<ul className="w-3/5 ml-6 list-disc">
					<li id="profileNames"></li>
					<li id="profileEmail"></li>
					<li id="profilePhone"></li>
					<li id="profileTrips">
						<b>N° viajes:</b>
					</li>
				</ul>
			</section>
		</article>
	);
}
