import Link from 'next/link';
import style from "./TopMenu.module.scss";
import { useRouter } from "next/router";

const links = [
    {
        url:"/react-filtering",
        text:"React filters"
    },
    {
        url:"/be-filtering",
        text:"nodejs rest filtering"
    },
    {
        url:"/be-filtering-graphql",
        text:"nodejs graphql filtering"
    }
]

export const TopMenu = () => {
    const router = useRouter();
    return (
        <div className={style.TopMenu}>
            <nav className={style.TopMenu__Nav}>
                <ul>
                    {links.map(el=>(
                        <li key={el.url}>
                            <Link href={el.url}>
                                <a className={`${style.TopMenu__Link} ${
                                    router.pathname === el.url?
                                        style["TopMenu__Link--active"]:
                                        ""}`}
                                >
                                    {el.text}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}