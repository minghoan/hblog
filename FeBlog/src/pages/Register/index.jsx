import { faH, faO } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import axiosClient from "../../api/axoisClient";
import { useEffect } from "react";

const schema = yup.object({
    email: yup
        .string()
        .required('Email là bắt buộc')
        .email('Email không đúng định dạng')
        .min(11, 'Độ dài tối thiểu 11 kí tự'),
    nickName: yup
        .string()
        .required("Tên tài khoản là bắt buộc"),
    password: yup
        .string()
        .required('Mật khẩu là bắt buộc')
        .min(6, 'Độ dài tối thiểu 6 kí tự')
        .max(13, 'Độ dài không vượt quá 13 kí tự'),
    confirmPassword: yup
        .string()
        .required('Vui lòng xác nhận lại mật khẩu')
        .min(6, 'Độ dài tối thiểu 6 kí tự')
        .max(13, 'Độ dài không vượt quá 13 kí tự')
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
}).required();

function Register() {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") !== null) navigate("/");
    }, []);


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = (data) => {
        const person = {
            email: data.email,
            password: data.password,
            accountName: data.nickName
        }
        axiosClient.post(`/api/auth/register`, person, { "Content-Type": "application/json" })
            .then((res) => {
                alert(res.data);
            })
            .catch(errors => alert(errors.response.data));

    }

    return (
        <div className="w-[100vw]">
            <div className="lg:w-[50%] sm:w-[70%] w-[90%] p-8 flex flex-col text-center sm:drop-shadow-2xl bg-white m-auto mt-10">
                <Link to={"/login"}>
                    <span className="absolute top-4 left-8 text-red-400 text-base font-medium cursor-pointer">Đăng nhập</span>
                </Link>
                <span className="sm:text-6xl text-4xl font-semibold p-2">
                    <FontAwesomeIcon icon={faH} className="text-[#33CCFF] border-b-[5px] border-[#33CCFF]" />
                    <span className="text-[#999999] m-[1px]">bl</span>
                    <FontAwesomeIcon icon={faO} className="text-[#33CCFF] border-b-[5px] border-[#33CCFF]" />
                </span>
                <span className="text-3xl my-2 font-semibold">Đăng ký tài khoản cho HBLO</span>
                <form className="my-4 w-full">
                    <div className="flex sm:flex-row flex-col justify-between my-2">
                        <div className="flex flex-col sm:w-[50%] w-full">
                            <input className="text-base sm:mb-0 my-1 px-6 py-3 outline-none rounded border-[1px] border-[#dcdfe6] font-normal text-[#909399]" placeholder="Địa chỉ email của bạn" {...register('email')} />
                            <p className="text-left mt-1 mb-6 ml-1 text-[red] text-sm font-normal ">{errors.email?.message}</p>
                        </div>
                        <div className="flex flex-col sm:w-[40%] w-full">
                            <input className="text-base sm:mt-0 mt-4 px-6 py-3 outline-none rounded border-[1px] border-[#dcdfe6] font-normal text-[#909399]" placeholder="Tên tài khoản" {...register('nickName')} />
                            <p className="text-left mt-1 mb-6 ml-1 text-[red] text-sm font-normal ">{errors.nickName?.message}</p>
                        </div>
                    </div>
                    <input type="password" className="text-base w-full my-1 px-6 py-3 outline-none rounded border-[1px] border-[#dcdfe6] font-normal text-[#909399]" placeholder="Mật khẩu" {...register('password')} />
                    <p className="text-left mt-1 mb-6 ml-1 text-[red] text-sm font-normal">{errors.password?.message}</p>
                    <input type="password" className="text-base w-full my-1 px-6 py-3 outline-none rounded border-[1px] border-[#dcdfe6] font-normal text-[#909399]" placeholder="Xác nhận mật khẩu" {...register('confirmPassword')} />
                    <p className="text-left mt-1 mb-6 ml-1 text-[red] text-sm font-normal ">{errors.confirmPassword?.message}</p>
                    <button onClick={handleSubmit(onSubmit)} className="w-full my-6 bg-[#409eff] rounded py-4 text-center text-xl font-medium text-white">Đăng Ký</button>
                </form>
            </div>
        </div>
    );
}

export default Register;