export default function Navbar() {
	function logout() {
		
	}

	if (localStorage.getItem("token")) {
		return (
			<div className="">
				<div className="text-2xl">Uber</div>
				<button id="logout" onClick={logout}>
					Logout
				</button>
			</div>
		);
	} else {
		return <div className="">Uber</div>;
	}
}
