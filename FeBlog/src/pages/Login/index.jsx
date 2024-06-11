import { faH, faLock, faO, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

import axiosClient from "../../api/axoisClient";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from "react";

const schema = yup.object({
    email: yup
        .string()
        .required("Vui lòng nhập email").email("Email không đúng định dạng")
        .min(11, 'Độ dài tối thiểu 11 kí tự'),
    password: yup
        .string()
        .required('Vui lòng nhập mật khẩu mật khẩu')
        .min(6, 'Độ dài tối thiểu 6 kí tự')
        .max(13, 'Độ dài không vượt quá 13 kí tự'),
}).required();

function Login() {


    const navigate = useNavigate();

    useEffect(() => {
         if(localStorage.getItem("token") !== null) navigate("/");
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        axiosClient.post(`/api/auth/authenticate`, data, { "Content-Type": "application/json" })
            .then(res => {
                const token = {
                    accessToken: res.data?.accessToken,
                    refreshToken: res.data?.refreshToken
                };
                localStorage.setItem("token", JSON.stringify(token));
                navigate("/");
            })
            .catch(errors => alert(errors.response.data));
    }

    return (
        <div className="w-full">
            <div className="lg:w-[40%] sm:w-[60%] w-[90%] p-10 flex flex-col text-center sm:drop-shadow-2xl bg-white m-auto sm:mt-28 mt-6 ">
                <span className="sm:text-6xl text-5xl font-semibold p-2">
                    <FontAwesomeIcon icon={faH} className="text-[#33CCFF] border-b-[5px] border-[#33CCFF]" />
                    <span className="text-[#999999] m-[1px]">bl</span>
                    <FontAwesomeIcon icon={faO} className="text-[#33CCFF] border-b-[5px] border-[#33CCFF]" />
                </span>
                <span className="text-3xl my-2 font-semibold">Đăng nhập vào HBLO</span>
                <form className="mt-2 w-full">
                    <div className="flex rounded items-center border-[1px] border-[#dcdfe6]">
                        <div className="h-full bg-[#f5f7fa] px-8 py-3 rounded border-r-[1px] rounded-r-none  border-[#dcdfe6]">
                            <FontAwesomeIcon icon={faUser} className="text-[#909399]" />
                        </div>
                        <input className="text-base flex-1 w-[10%] px-6 py-3 outline-none rounded-r font-normal text-[#909399]" placeholder="Email đăng nhập" {...register('email')} />
                    </div>
                    <p className="text-left mt-1 mb-6 ml-1 text-[red] text-sm font-normal">{errors.email?.message}</p>
                    <div className="flex rounded items-center border-[1px] border-[#dcdfe6]">
                        <div className="h-full bg-[#f5f7fa] px-8 py-3 rounded border-r-[1px] rounded-r-none  border-[#dcdfe6]">
                            <FontAwesomeIcon icon={faLock} className="text-[#909399]" />
                        </div>
                        <input className="text-base flex-1 w-[10%] px-6 py-3 outline-none rounded-r font-normal text-[#909399]" placeholder="Mật khẩu" type="password" {...register('password')} />
                    </div>
                    <p className="text-left mt-1 mb-6 ml-1 text-[red] text-sm font-normal">{errors.password?.message}</p>
                    <button onClick={handleSubmit(onSubmit)} className="w-full my-4 bg-[#409eff] rounded py-4 text-center text-xl font-medium text-white">Đăng Nhập</button>
                    <div className="w-full text-[#409eff] text-base flex justify-between mt-4">
                        <span className="cursor-pointer hover:text-[#2a5f94] hover:underline hover:decoration-[#092139] underline-offset-2 decoration-2">Quên mật khẩu?</span>
                        <Link to={"/register"}>
                            <span className="cursor-pointer hover:text-[#2a5f94] hover:underline hover:decoration-[#092139] underline-offset-2 decoration-2">Tạo tài khoản</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;