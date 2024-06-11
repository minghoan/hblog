import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { faCheck, faH, faO, faPenAlt, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axiosClient from "../../../api/axoisClient";

const cx = classNames.bind(style);

function Header() {

    const [isLogin, setIsLogin] = useState(false);
    const [person, setPerson] = useState(null);


    const navigate = useNavigate();

    const menuRef = useRef();


    useEffect(() => {

        const token = JSON.parse(localStorage.getItem("token"));
        if (token != null) {
            setIsLogin(true);
            const headers = {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'text/plain'
            };
            axiosClient.post(`/api/get/info`, token.accessToken, { headers })
                .then(res => {
                    localStorage.setItem("person", JSON.stringify(res.data));
                    setPerson(res.data);
                })
                .catch(errors => {
                    if (errors.response.status == 401) {
                        axiosClient.post(`/api/auth/refresh`, token.refreshToken, { 'Content-Type': 'text/plain' })
                            .then(res => {
                                const token = {
                                    accessToken: res.data?.accessToken,
                                    refreshToken: res.data?.refreshToken
                                };
                                localStorage.setItem("token", JSON.stringify(token));
                                setIsLogin(false);
                            })
                            .catch(errors => {
                                if (errors.response.status == 401) {
                                    axiosClient.post(`/api/auth/logout`, JSON.parse(localStorage.getItem("token")).refreshToken, { 'Content-Type': 'text/plain' })
                                        .then(res => {
                                            localStorage.clear();
                                            setIsLogin(false);
                                        })
                                        .catch(errors => console.log(errors));
                                }
                            });
                    }
                });

        }

    }, [isLogin])



    function handleLogout() {
        axiosClient.post(`/api/auth/logout`, JSON.parse(localStorage.getItem("token")).refreshToken, { 'Content-Type': 'text/plain' })
            .then(res => {
                localStorage.clear();
                setIsLogin(false);
                navigate("/");
            })
            .catch(errors => console.log(errors));
    }


    return (
        <div className="border-b-[4px] border-[#003399] ">
            <div className="flex flex-col w-[92%] m-auto py-[14px]">
                <div className="flex justify-between items-center text-center">
                    <div className="flex justify-center text-center items-center">
                        <Link to={'/'}>
                            <span className="text-center sm:mr-10 mr-5 border-b-[3px] border-[#33CCFF] cursor-pointer">
                                <FontAwesomeIcon icon={faH} className="text-[#33CCFF] sm:text-2xl text-xl font-semibold" />
                                <span className="sm:text-xl text-base font-medium text-[#999999]">
                                    BL
                                </span>
                                <FontAwesomeIcon icon={faO} className="text-[#33CCFF] sm:text-2xl text-xl font-semibold" />
                            </span>
                        </Link>
                        <span className="sm:ml-5 ml-4 text-xl font-medium cursor-pointer text-[#8a8282] hover:text-black">
                            <Link to={"/"}>
                                Trang chủ
                            </Link>
                        </span>
                        <Link to={'/topic/dulich/1'}>
                            <span className="sm:ml-5 ml-2 text-sm sm:block hidden font-medium cursor-pointer text-[#c1bcbc] hover:text-black">
                                Du lịch
                            </span>
                        </Link>
                        <Link to={'/topic/thethao/2'}>
                            <span className="sm:ml-5 ml-2 text-sm sm:block hidden font-medium cursor-pointer text-[#c1bcbc] hover:text-black">
                                Thể thao
                            </span>
                        </Link>
                        <Link to={'/topic/hoctap/3'}>
                            <span className="sm:ml-5 ml-2 text-sm sm:block hidden font-medium cursor-pointer text-[#c1bcbc] hover:text-black">
                                Học tập
                            </span>
                        </Link>
                    </div>
                    <div>
                        {
                            isLogin ?
                                <>
                                    <div
                                        className="relative cursor-pointer"
                                        onClick={() => {
                                            menuRef.current.classList.toggle('opacity-0');
                                            menuRef.current.classList.toggle('invisible');
                                        }}
                                    >
                                        <Avatar
                                            sx={{ width: 40, height: 40 }}
                                            src={`http://localhost:8080${person?.avatar}`} />
                                        <div ref={menuRef} className={cx("menu", "invisible opacity-0 absolute rounded-md bg-white flex sm:w-[280px] min-w-[270px] flex-col top-[53px] left-[-200px] drop-shadow-2xl")}>
                                            <div className="flex p-4 rounded-md rounded-b-none bg-[#ebe7e7]">
                                                <Avatar
                                                    sx={{ width: 100, height: 100, cursor: "pointer" }}
                                                    src={`http://localhost:8080${person?.avatar}`} />
                                                <div className="flex flex-col justify-between my-2 ml-3">
                                                    <span className="text-base text-left cursor-auto text-[#666] font-bold">{person?.accountName}</span>
                                                    <span className="text-sm text-left cursor-auto my-1 text-[#666] font-normal">{person?.email}</span>
                                                    <button className="text-center my-1 bg-blue-400 w-max px-4 py-1 rounded text-white font-medium">
                                                        <Link to={`/account/${person?.idPerson}`}>
                                                            Sửa
                                                        </Link>
                                                    </button>
                                                </div>
                                            </div>
                                            <Link to={`/p/${person?.accountName}`}>
                                                <p className="text-left p-5 mb-[-6px] sm:text-xl text-base cursor-pointer hover:bg-[#f9f7f7]">
                                                    <FontAwesomeIcon icon={faUser} className="mr-4" /> Trang cá nhân
                                                </p>
                                            </Link>
                                            <Link to={"/write"}>
                                                <p className="text-left p-5 mb-[-6px] sm:text-xl text-base cursor-pointer hover:bg-[#f9f7f7]">
                                                    <FontAwesomeIcon icon={faPenAlt} className="mr-4" /> Viết bài
                                                </p>
                                            </Link>
                                            {
                                                person?.role === "ADMIN"
                                                    ?
                                                    <Link to={'/censor'}>
                                                        <p className="text-left p-5 mb-[-6px] sm:text-xl text-base cursor-pointer hover:bg-[#f9f7f7]">
                                                            <FontAwesomeIcon icon={faCheck} className="mr-4" /> Duyệt bài
                                                        </p>
                                                    </Link>
                                                    : <></>
                                            }
                                            <p onClick={handleLogout} className="border-t-[2px] text-left p-5 py-3 text-base sm:text-xl cursor-pointer hover:bg-[#f9f7f7]"><FontAwesomeIcon icon={faRightFromBracket} className="mr-4" />Đăng xuất</p>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <Link to={"/login"}>
                                        <span className="cursor-pointer px-[6px] text-base font-medium text-[#c1bcbc] hover:text-black">Đăng nhập / Đăng kí</span>
                                    </Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;