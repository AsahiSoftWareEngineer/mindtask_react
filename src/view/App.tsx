import { Routes, Route } from "react-router-dom";
import "./styles/App.css"
import Tabbar from "../components/Tabbar";
import TaskPage from "../page/app/Task";
import Mypage from "../page/app/Mypage";


const ApplicationTemplate = () => {
  return (
    <>
      <div className="app">
        <header className="appHeader"></header>
        <section className="appContent">
            <Routes>
                <Route path="/" element={<><TaskPage/></>} />
                <Route path="/mypage" element={<><Mypage/></>} />
            </Routes>
        </section>
        <footer className="appFooter">
            <Tabbar/>
        </footer>
      </div>
    </>
  );
};

export default ApplicationTemplate;
