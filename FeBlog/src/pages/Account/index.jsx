import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../../api/axoisClient";
import { useNavigate } from "react-router-dom";

function Account() {

    const [info, setInfo] = useState(null);
    const [render, setRender] = useState(false);

    const fileInputRef = useRef(null);


    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));

        const headers = {
            'Authorization': `Bearer ${token.accessToken}`,
            'Content-Type': 'text/plain'
        };

        if (token == null) navigate('/login');
        else {
            axiosClient.post('/api/get/info', token.accessToken, { headers })
                .then(res => {
                    setInfo(res.data);
                })
                .catch(errors => console.log(errors));
        }
    }, [render])

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };


    const handleFileSelect = (e) => {
        const token = JSON.parse(localStorage.getItem('token'));

        const headers = {
            'Authorization': `Bearer ${token.accessToken}`,
            'Content-Type': 'multipart/form-data'
        };

        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('image', file);

        axiosClient.patch(`/api/update/avatar/${info?.idPerson}`, formData, { headers })
            .then((res) => {
                setRender(!render);
            })

    };

    return (
        <div className="w-full flex flex-col">
            <p className="w-[80%] m-auto my-4 text-black font-medium text-3xl">Profile</p>
            <hr className="w-[80%] m-auto" />
            <div className="mt-20 w-[80%] m-auto flex sm:flex-row flex-col">
                <div className="flex flex-col items-center sm:mr-40 sm:mb-0 mb-20">
                    <Avatar
                        sx={{ width: 250, height: 250 }}
                        src={`http://localhost:8080${info?.avatar}`} />
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }} />
                    <button onClick={handleButtonClick} className="cursor-pointer mt-6 text-white font-medium bg-[#999] rounded text-center px-3 py-2 text-sm">CHANGE AVATAR</button>
                </div>
                <div className="flex-1 flex flex-col px-10">
                    <span className="text-black font-medium text-xl mb-[-8px]">Email</span>
                    <p className="sm:w-[70%] w-[90%] text-black font-normal text-sm lg:text-base px-4 py-1 rounded bg-[#f6f8fa] border-[1px] border-[#ccc]">{info?.email}</p>
                    <div className="w-full">
                        <span className="text-black font-medium text-xl mb-[-8px]">Name</span>
                        <div className="flex items-center">
                            <p className="sm:w-[70%] w-[90%] text black font-normal text-sm lg:text-base px-4 py-1 rounded bg-[#f6f8fa] border-[1px] border-[#ccc]">{info?.accountName}</p>
                            <FontAwesomeIcon className="ml-8 text-2xl cursor-pointer" icon={faEdit} />
                        </div>
                    </div>
                    <div className="w-full">
                        <span className="text-black font-medium text-xl mb-[-8px]">Password</span>
                        <div className="flex items-center">
                            <p className="sm:w-[70%] w-[90%] text black font-normal text-sm lg:text-base px-4 py-1 rounded bg-[#f6f8fa] border-[1px] border-[#ccc]">**********</p>
                            <FontAwesomeIcon className="ml-8 text-2xl cursor-pointer" icon={faEdit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;