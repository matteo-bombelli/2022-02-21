import Link from 'next/link';
import style from "./TopMenu.module.scss";
import { useRouter } from "next/router"

export const TopMenu = () => {
    const router = useRouter();
    return (
        <div className={style.TopMenu}>
            <nav className={style.TopMenu__Nav}>
                <ul>
                    <li>
                        <Link href="/react-filtering">
                            <a className={`${style.TopMenu__Link} ${
                                router.pathname === "/react-filtering"?
                                    style["TopMenu__Link--active"]:
                                    ""}`}
                            >
                                React frontend Version
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/be-filtering">
                            <a className={`${style.TopMenu__Link} ${
                                router.pathname === "/be-filtering"?
                                    style["TopMenu__Link--active"]:
                                    ""}`}
                            >
                                Filtering on the nodejs server
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}