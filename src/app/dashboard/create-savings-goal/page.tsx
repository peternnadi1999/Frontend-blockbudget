"use client";
import { IndentDecrease } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { abi } from "@/context/abi";
import { contractAddress2 } from "@/context/contractAddress";
import {
	useWriteContract,
	useWaitForTransactionReceipt,
	useAccount,
} from "wagmi";
import { parseEther } from "viem";
import { useRouter } from "next/navigation";

function CreateSavingsGoal() {
	const [accountType, setAccountType] = useState("");
	const [interestType, setInterestType] = useState("");
	const [lockDuration, setLockDuration] = useState("");
	const [initialDeposit, setInitialDeposit] = useState("");
	const [txHash, setTxHash] = useState(""); // Transaction hash

	const router = useRouter();
	const { writeContractAsync, isPending } = useWriteContract();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		// Add your blockchain submission logic here

		const dueDateTimestamp = Math.floor(
			new Date(lockDuration).getTime() / 1000,
		);

		try {
			// Convert amount to wei (1 ether = 10^18 wei)
			const amountInWei = parseEther(initialDeposit);

			// Convert date to Unix timestamp
			// const dueDateTimestamp = Math.floor(new Date(date).getTime() / 1000);

			const tx = await writeContractAsync({
				address: contractAddress2,
				abi: abi,
				functionName: "createTimeLockedAccount",
				args: [accountType, interestType, dueDateTimestamp, amountInWei],
			});

			console.log("creating savings....");
			setTxHash(tx);

			// console.log("tx::",tx);
			// toast.info("Transaction submitted. Waiting for confirmation...")
		} catch (err) {
			console.error("Error creating locked account:", err);
			// toast.error("Error creating invoice: " + err.message);
		}
	};

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash: txHash as `0x${string}`,
		});

	useEffect(() => {
		if (isConfirmed) {
			// toast.success("Transaction confirmed successfully");
			router.push("/locked-list-savings");
		}
	}, [isConfirmed]);

	return (
		<>
			<div className="w-full m-auto">
				<Link href="/dashboard" className="flex space-x-2">
					<IndentDecrease className="text-white " size={20} />{" "}
					<span className="text-white font-montserrat font-semibold text-sm">
						Back
					</span>
				</Link>
			</div>
			<div className="min-h-screen flex items-center -mt-12 justify-center p-6">
				<div className="w-full relative max-w-lg bg-[#00000052] border-2 border-gray-700 rounded-[48px] p-8 shadow-lg overflow-hidden text-gray-300">
					<h2 className="text-2xl font-montserrat font-semibold text-center text-white mb-8">
						Create a new savings goal
					</h2>

					<form className="space-y-5 relative z-50" onSubmit={handleSubmit}>
						<div>
							<label className="block mb-1 text-sm font-medium text-[#FFFFFF]">
								Account Type
							</label>
							<select
								value={accountType}
								onChange={(e) => setAccountType(e.target.value)}
								className="w-full px-4 py-1 bg-[#131418] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Select Account Type</option>
								<option value="0">Savings</option>
								<option value="1">Checking</option>
								<option value="2">Investment</option>
							</select>
						</div>

						<div>
							<label className="block mb-1 text-sm font-medium text-[#FFFFFF]">
								Interest Type
							</label>
							<select
								value={interestType}
								onChange={(e) => setInterestType(e.target.value)}
								className="w-full px-4 py-1 bg-[#131418] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Select Interest Type</option>
								<option value="0">Fixed</option>
								<option value="1">Variable</option>
								<option value="2">Compound</option>
							</select>
						</div>

						<div>
							<label className="block mb-1 text-sm font-medium text-[#FFFFFF]">
								Lock Duration
							</label>
							<select
								value={lockDuration}
								onChange={(e) => setLockDuration(e.target.value)}
								className="w-full px-4 py-1 bg-[#131418] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Select Lock Duration</option>
								<option value="1">1 Month</option>
								<option value="6">6 Months</option>
								<option value="12">1 Year</option>
							</select>
						</div>
						<div>
							<label className="block mb-1 text-sm font-medium text-[#FFFFFF]">
								Initial Deposit
							</label>
							<input
								type="number"
								placeholder="Enter initial deposit"
								value={initialDeposit}
								onChange={(e) => setInitialDeposit(e.target.value)}
								className="w-full px-4 py-1 placeholder:text-sm bg-[#131418] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<button
							type="submit"
							className="w-full py-2 mt-4 bg-[#131418] border-gray-700 border text-white font-semibold rounded-full hover:bg-[#131418] transition duration-200"
						>
							{isPending ? "Confirming..." : "Create Savings"}
						</button>
					</form>

				</div>
			</div>
		</>
	);
}

export default CreateSavingsGoal;
