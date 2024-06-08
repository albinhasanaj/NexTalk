import NoChatSelected from './NoChatSelected';
import Settings from './Settings';
import ChatSelected from './ChatSelected';
import Logout from './Logout';
import ChatHeader from './ChatHeader';

const MainComponent = ({
    view,
    socket,
    isConnected,
    isOpen,
}: MainComponentProps) => {

    const classNames = isOpen ? "hidden" : "flex"


    const toggleView = (view: string) => {
        switch (view) {
            case 'NoChatSelected':
                return <NoChatSelected socket={socket} />;
            case 'ChatSelected':
                return <ChatSelected socket={socket} isConnected={isConnected} />;
            case 'Settings':
                return <Settings />;
            case 'Logout':
                return <Logout />;
            default:
                return <NoChatSelected socket={socket} />;
        }
    };
    return (
        <div className={`${classNames} w-[300px] sm:w-[350px] h-[500px] sm:h-[600px] md:w-[400px] md:flex rounded-3xl md:rounded-r-3xl md:rounded-tl-none md:rounded-bl-none md:rounded-tr-3xl md:w[500px] lg:w-[600px md:h-[600px] lg:h-[750px] lg:w-[600px] flex-shrink-0 rounded-r-3xl rounded-tr-3xl border border-white/54 bg-white/7 backdrop-blur-[30px] items-center bg-[rgba(255,255,255,0.1)] flex-col text-white`}>
            {/* RIGHT SIDE */}
            {view !== "NoChatSelected" && view !== "Settings" ? <ChatHeader /> : null}

            {/* TYPES OF VIEWS */}
            {toggleView(view)}
        </div>
    );
};

export default MainComponent;
