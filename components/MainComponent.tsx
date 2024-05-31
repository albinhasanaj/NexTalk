import Navbar from './Navbar';
import NoChatSelected from './NoChatSelected';
import Settings from './Settings';
import ChatSelected from './ChatSelected';
import Logout from './Logout';

const MainComponent = ({
    view,
}: MainComponentProps) => {
    const toggleView = (view: string) => {
        switch (view) {
            case 'NoChatSelected':
                return <NoChatSelected />;
            case 'ChatSelected':
                return <ChatSelected />; 
            case 'Settings':
                return <Settings />;
            case 'Logout':
                return <Logout />;
            default:
                return <NoChatSelected />;
        }
    };
    return (
        <>
            <div className=
                "rounded-3xl md:rounded-r-3xl md:rounded-tl-none md:rounded-bl-none md:rounded-tr-3xl w-[400px] md:w[500px] lg:w-[600px] h-[750px] md:h-[600px] lg:h-[750px] flex-shrink-0 rounded-r-3xl rounded-tr-3xl border border-white/54 bg-white/7 backdrop-blur-[30px] flex items-center bg-[rgba(255,255,255,0.1)] flex-col text-white">
                {/* RIGHT SIDE */}
                {view !== "NoChatSelected" && view !== "Settings" ? <Navbar /> : null}

                {/* TYPES OF VIEWS */}
                {toggleView(view)}
            </div>
        </>
    );
};

export default MainComponent;
