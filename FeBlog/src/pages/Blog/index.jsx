import { useEffect, useState } from "react";
import axiosClient from "../../api/axoisClient";
import { useNavigate, useParams } from "react-router-dom";

function Blog() {

    const [blog, setBlog] = useState(null);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get(`/api/get/${id}/blog`)
            .then(res => setBlog(res.data))
            .catch(errors => console.log(errors));
    }, [])

    function handleCheck() {
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = {
            'Authorization': `Bearer ${token.accessToken}`,
        };
        let res = confirm("Bạn có muốn duyệt bài viết này");
        if (res) {
            axiosClient.patch(`/api/admin/update/blog/${blog.idBlog}`, null, { headers })
                .then(res => {
                    navigate("/censor");
                })
                .catch(errors => console.log(errors));
        }
    }


    return (
        <>
            {
                (blog?.checked == false && (blog?.email == JSON.parse(localStorage.getItem("person")).email || JSON.parse(localStorage.getItem("person")).role == "ADMIN") || blog?.checked && !blog?.deleted)
                    ?
                    <div className="sm:w-[75%] w-[92%] m-auto mt-20 z-0">
                        <div className="flex flex-col">
                            <div className="flex flex-wrap">
                                <div className="sm:w-[35%] flex w-[100%]">
                                    <img className="w-[20%] max-h-[100px] mr-8" src={`http://localhost:8080${blog?.avatar}`}></img>
                                    <span className="cursor-pointer w-[20%] text-base font-bold text-[#33629c] hover:underline hover:underline-offset-2">{blog?.email}</span>
                                </div>
                                <span className="flex-1 text-right text-base font-medium text-[#999]">Cập nhật vào {blog?.updateAt || blog?.createdAt}</span>
                            </div>
                            <p className="my-6 sm:text-4xl text-2xl text-black font-bold">{blog?.title}</p>
                            <div dangerouslySetInnerHTML={{ __html: blog?.textHtml }}></div>
                        </div>

                        {
                            (!blog?.checked && JSON.parse(localStorage.getItem("person")).role == "ADMIN") &&
                            <>
                                <hr />
                                <button onClick={handleCheck} className="px-3 py-2 bg-green-500 text-white font-medium rounded">Duyệt bài</button>
                            </>
                        }

                    </div>
                    : <img className="w-[70%] m-auto mt-10" src="https://aioseo.com/wp-content/uploads/2021/04/how-to-find-and-fix-404-errors-in-wordpress.png.webp"></img>
            }
        </>
    );
}

export default Blog;