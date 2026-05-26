import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DebounceSearch from "../pages/debounceSearch";

const AppRoutes = () => {
    
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/debounce" element={<DebounceSearch />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;

