
import { WagmiProvider, createConfig, http } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const WALLETCONNECT_PROJECT_ID = "99296b5d7acb2ca478909bd3e7b4f780";
const ALCHEMY_ID = "vpEAMGP_rB7ZhU43ybQC6agpdVToaV5S";

const config = createConfig(
    getDefaultConfig({
        alchemyId: ALCHEMY_ID,
        walletConnectProjectId: WALLETCONNECT_PROJECT_ID,
        appName: "Horsly",
        chains: [sepolia],
    })
);const queryClient = new QueryClient();



const MyProvider = ({ children }) => {
    return (
        <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
};

export default MyProvider;