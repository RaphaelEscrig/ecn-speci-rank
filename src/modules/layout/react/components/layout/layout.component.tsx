/** COMPONENTS */
import Header from "@/modules/layout/react/components/header/header.component";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default Layout;
