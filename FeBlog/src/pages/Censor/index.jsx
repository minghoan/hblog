import { useEffect, useState } from "react";
import axiosClient from "../../api/axoisClient";
import { useNavigate } from "react-router-dom";
import ItemLinkBlog from "../../components/ItemLinkBlog";

function Censor() {

    const [listCheck, setListCheck] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token != null) {
            const headers = {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'text/plain'
            };
            axiosClient.get(`/api/admin/get/blog`, { headers })
                .then(res => {
                    console.log(res.data);
                    setListCheck(res.data)
                })
                .catch(errors => {
                    console.log(errors);
                    if (errors.response.status == 401) {
                        window.location.reload();
                    }
                    else if (errors.response.status == 403) {
                        navigate("/");
                    }
                });
        }
        else {
            navigate("/");
        }
    }, []);


    return (
        <div className="mt-16" >
            <hr />
            <div className="w-[86%] m-auto">
                <span className="w-max text-left py-3 px-5 border-b-[4px] border-blue-500 sm:text-xl text-base text-blue-700 font-medium">Bài viết</span>
            </div>
            <hr />
            {
                (listCheck == null || listCheck.length == 0) ? <p className="w-[80%] m-auto mt-10 text-center text-base font-semibold text-[#999]">Không có gì ở đây cả</p>
                    :
                    <div className="w-[80%] m-auto mt-20">
                        {
                            listCheck.map((value, index) => {
                                return (
                                    <ItemLinkBlog info={value} key={index} />
                                )
                            })
                        }
                    </div>
            }
        </div>

    );
}

export default Censor;