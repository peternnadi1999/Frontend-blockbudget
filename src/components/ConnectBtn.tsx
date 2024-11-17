"use client";
// import { ConnectWallet } from "@thirdweb-dev/react";
// export const ConnectBtn = () => {
//   return (
//     <ConnectWallet />
//   {({
//     account,
//     chain,
//     openAccountModal,
//     openChainModal,
//     openConnectModal,
//     authenticationStatus,
//     mounted,
//   }:any) => {
//     // Note: If your app doesn't use authentication, you
//     // can remove all 'authenticationStatus' checks
//     const ready = mounted && authenticationStatus !== "loading";
//     const connected =
//       ready &&
//       account &&
//       chain &&
//       (!authenticationStatus || authenticationStatus === "authenticated");
//     return (
//       <div
//         {...(!ready && {
//           "aria-hidden": true,
//           style: {
//             opacity: 0,
//             pointerEvents: "none",
//             userSelect: "none",
//           },
//         })}
//       >
//         {(() => {
//           if (!connected) {
//             return (
//               <button
//                 onClick={openConnectModal}
//                 className="w-full bg-transparent border text-white  py-2 px-7 text-sm rounded-full"
//               >
//                 Connect your wallet
//               </button>
//             );
//           }
//           if (chain.unsupported) {
//             return (
//               <button onClick={openChainModal} type="button">
//                 Wrong network
//               </button>
//             );
//           }
//           return (
//             <div style={{ display: "flex", gap: 12 }}>
//               <button
//                 onClick={openChainModal}
//                 style={{ display: "flex", alignItems: "center" }}
//                 type="button"
//               >
//                 {chain.hasIcon && (
//                   <div
//                     style={{
//                       background: chain.iconBackground,
//                       width: 12,
//                       height: 12,
//                       borderRadius: 999,
//                       overflow: "hidden",
//                       marginRight: 4,
//                     }}
//                   >
//                     {chain.iconUrl && (
//                       <img
//                         alt={chain.name ?? "Chain icon"}
//                         src={chain.iconUrl}
//                         style={{ width: 12, height: 12 }}
//                       />
//                     )}
//                   </div>
//                 )}
//                 {/* {chain.name} */}
//               </button>
//               <button onClick={openAccountModal} className="w-full bg-transparent border text-white  py-2 px-7 text-sm rounded-full" type="button">
//                 {account.displayName}
//                 {/* {account.displayBalance
//                   ? ` (${account.displayBalance})`
//                   : ""} */}
//               </button>
//             </div>
//           );
//         })()}
//       </div>
//     );
//   }}
// </ConnectWallet>
//   );
// };

import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { darkTheme } from "@thirdweb-dev/react";

export const ConnectBtn = () => {
	const client = createThirdwebClient({
		clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID as any,
	});
	return (
		<ConnectButton
			client={client}
			autoConnect={false}
			connectModal={{
				size: "compact",
			}}
			chain={sepolia}
			theme={"dark"}
		/>
	);
};
