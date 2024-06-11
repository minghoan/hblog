import { faEdit, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axoisClient";

function ItemLinkBlog({ info, person, deleted = null, onUpdateLoad }) {


    function handleDelete() {
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = {
            'Authorization': `Bearer ${token.accessToken}`,
        };
        const cf = confirm("Bạn có muốn xóa không")
        if (cf) {
            axiosClient.delete(`/api/delete/blog/${info?.idBlog}`, { headers })
                .then(res => onUpdateLoad())
                .catch(errors => console.log(errors));
        }
    }

    function handleRevoke() {
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = {
            'Authorization': `Bearer ${token.accessToken}`,
        };
        const cf = confirm("Bạn có muốn thu hồi không")
        if (cf) {
            axiosClient.patch(`/api/revoke/blog/${info?.idBlog}`, null, { headers })
                .then(res => onUpdateLoad())
                .catch(errors => console.log(errors));
        }
    }

    return (
        <div className="flex w-[90%] m-auto justify-between">
            <div className="flex relative text-center my-[20px] flex-1 p-3 border-b-[2px]">
                <div className="lg:w-[8%] w-[20%]">
                    <img className="w-[100%] max-h-[150px]" src={`http://localhost:8080${info?.avatar}`}></img>
                </div>
                <div className="flex-1 flex flex-col text-left ml-8 justify-around">
                    <div className="mb-2 flex-wrap flex text-left">
                        <span className="mr-4 text-[#1f76d9] text-base font-medium hover:underline hover:underline-offset-2 cursor-pointer">{info?.email}</span>
                        <span className="mr-4 text-sm font-medium text-[#9b9b9b]">{info?.createdAt}</span>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        <Link to={`/${info?.idBlog}/${info?.title}`}>
                            <p className="text-xl text-black font-medium cursor-pointer hover:text-[#1f76d9]">{info?.title}</p>
                        </Link>
                        {
                            !info?.checked &&
                            <span className="h-max text-sm font-medium py-2 px-3 rounded-2xl bg-red-500 text-white mt-2">Chưa duyệt</span>
                        }
                    </div>
                </div>
                <span className="absolute top-[-16px] right-[-10px] px-3 py-1 bg-green-500 text-sm font-medium text-white rounded-2xl">{info?.idTopic == 1 ? "Du lịch" : (info?.idTopic == 2 ? "Thể thao" : "Học tập")}</span>
            </div>
            {
                deleted != null ?
                    (deleted == false) ?
                        <div className="lg:w-[10%] w-[20%] flex flex-col ml-20 py-10 justify-evenly">
                            <button onClick={handleDelete} className="py-2 px-3 bg-red-500 text-white lg:text-base text-sm font-medium rounded my-1">
                                <FontAwesomeIcon icon={faTrash} className="mx-2" />
                                Xóa
                            </button>
                            <button className="py-2 px-3 bg-blue-500 text-white lg:text-base text-sm font-medium rounded my-1">
                                <Link to={`/edit/${info?.title}/${info?.idBlog}`}>
                                    <FontAwesomeIcon icon={faEdit} className="mx-2" />
                                    Sửa
                                </Link>
                            </button>
                        </div>
                        : <div className="lg:w-[16%] w-[20%] flex flex-col ml-20 py-10 justify-evenly">
                            <button onClick={handleDelete} className="py-2 px-3 bg-red-500 text-white lg:text-base text-sm font-medium rounded my-1">
                                <FontAwesomeIcon icon={faTrash} className="mx-2" />
                                Xóa vĩnh viễn
                            </button>
                            <button onClick={handleRevoke} className="py-2 px-3 bg-blue-500 text-white lg:text-base text-sm font-medium rounded my-1">
                                <FontAwesomeIcon icon={faRefresh} className="mx-2" />
                                Thu hồi
                            </button>
                        </div>
                    : <></>
            }
        </div>

    );
}

export default ItemLinkBlog;