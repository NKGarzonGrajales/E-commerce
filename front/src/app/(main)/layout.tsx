import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

const SecondLayout: React.FC<{
    children: React.ReactNode;
}> = ({children}) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default SecondLayout;
