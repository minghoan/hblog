import Footer from "../../pages/Components/Footer";
import Header from "../../pages/Components/Header";

function DefaultLayout({ children }) {
    return (
        <div className="flex flex-col">
            <div className="z-10">
                <Header />
            </div>
            <div className="mt-4 z-0">
                {children}
            </div>
            <div className="items-end">
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;