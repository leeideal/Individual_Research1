import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import MainPage from "./routes/MainPage";
import NavBar from "./routes/Navbar";
import EmptyEmotion from './routes/EmptyEmotion';
import Footer from "./routes/Footer";
import LogoIn from './routes/LogIn';
import SignUp from './routes/SignUp';
import ThemeCustom from './routes/ThemeCustom';

function Routers() {
    return(
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/poem" element={<EmptyEmotion />} />
                <Route path="/login" element={<LogoIn />} />
                <Route path="/signup" element={<SignUp/>} />
            </Routes>
            <ThemeCustom />
            <Footer />
        </Router>
    )
}
export default Routers;