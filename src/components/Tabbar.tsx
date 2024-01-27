import { ReactElement, useState } from "react";
import { CheckboxOutline, PersonOutline } from "react-ionicons";
import { Link } from "react-router-dom";
import "./styles/Tabbar.css"

const Tabbar = () => {
    const [selectedIndex, setIndex] = useState(1);
  const tabMenuItem: {
    id: number;
    title: string;
    url: string;
    icon: ReactElement;
  }[] = [
    {
      id: 1,
      title: "Task",
      icon: <CheckboxOutline />,
      url: "/",
    },{
        id: 2,
        title: "Mypage",
        icon: <PersonOutline/>,
        url: "/mypage"
    }
  ];

  return (
    <>
      <ul className="tabMenu">
        {tabMenuItem.map((item) => {
          return (
            <li>
              <Link onClick={() =>{setIndex(item.id)}} className={`tabButton ${item.id == selectedIndex? "selected": ""}`} to={item.url}>
                {item.icon}
              <span className="itemTitle">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Tabbar;
