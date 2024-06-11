import { useEffect, useRef, useState } from "react";
import axiosClient from "../../api/axoisClient";
import ItemLinkBlog from "../../components/ItemLinkBlog";
import { useNavigate } from "react-router-dom";

function Person() {

    const [list, setList] = useState(null);
    const [load, setLoad] = useState(false);

    const navigate = useNavigate();

    const span1Ref = useRef();
    const span2Ref = useRef();

    const div1Ref = useRef();
    const div2Ref = useRef();


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const person = JSON.parse(localStorage.getItem("person"));
        if (token != null) {
            const headers = {
                'Authorization': `Bearer ${token.accessToken}`,
            };

            axiosClient.get(`/api/getAll/blog/${person.email}`, { headers })
                .then(res => {
                    setList(res.data);
                })
                .catch(errors => console.log(errors));
        }
        else {
            navigate('/login');
        }

    }, [load])

    const updateLoad = () => {
        setLoad(!load);
    };

    function handleSpan1() {
        span1Ref.current.classList.remove("border-none");
        span2Ref.current.classList.add("border-none");
        div1Ref.current.classList.remove("hidden");
        div2Ref.current.classList.add("hidden");
    }

    function handleSpan2() {
        span2Ref.current.classList.remove("border-none");
        span1Ref.current.classList.add("border-none");
        div2Ref.current.classList.remove("hidden");
        div1Ref.current.classList.add("hidden");
    }

    return (
        <div className="mt-16">
            <hr />
            <div className="w-[86%] m-auto">
                <span onClick={handleSpan1} ref={span1Ref} className="cursor-pointer w-max text-left py-3 px-5 border-b-[4px] border-blue-500 sm:text-xl text-base text-blue-700 font-medium mr-10">Bài viết</span>
                <span onClick={handleSpan2} ref={span2Ref} className="cursor-pointer w-max text-left py-3 px-5 border-none border-b-[4px] border-blue-500 sm:text-xl text-base text-blue-700 font-medium">Bài viết đã xóa</span>
            </div>
            <hr />
            {
                <>
                    {/* <p className="z-0 w-[80%] m-auto mt-10 text-center text-base font-semibold text-[#999]">Không có gì ở đây cả</p> */}
                    <div className="z-10">
                        <div ref={div1Ref} className="w-[80%] m-auto mt-20">
                            {
                                list?.filter(value => !value?.deleted)
                                    .map((value, index) => {
                                        return (
                                            <ItemLinkBlog info={value} key={index} deleted={false} onUpdateLoad={updateLoad} />
                                        )
                                    })
                            }
                        </div>
                        <div ref={div2Ref} className="w-[80%] m-auto mt-20 hidden">
                            {
                                list?.filter(value => value?.deleted)
                                    .map((value, index) => {
                                        return (
                                            <ItemLinkBlog info={value} key={index} deleted={true} onUpdateLoad={updateLoad} />
                                        )
                                    })
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default Person;