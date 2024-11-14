import React from "react";
import { ConnectBtn } from "./ConnectBtn";
import Link from "next/link";

const Navbar = () => {
	return (
		<>
			<div className="flex justify-between m-auto text-white w-11/12 h-28 py-6">
				<div className="text-lg  font-semibold">
					<Link href="/">
					
					<h2>Logo here</h2>
					</Link>
				</div>
				<ConnectBtn />
			</div>
		</>
	);
};

export default Navbar;
