import { useEffect, useState } from "react";
import ItemLinkBlog from "../../components/ItemLinkBlog";
import axiosClient from "../../api/axoisClient";
import { useLocation, useParams } from "react-router-dom";

function HomePage() {

    const location = useLocation();

    const [list, setList] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        if (id) {
            axiosClient.get(`/api/getAll/blog/topic/${id}`)
                .then(res => {
                    setList(res.data)
                })
                .catch(errors => {
                    console.log(errors);
                });
        }
        else {
            axiosClient.get(`/api/get/blogChecked`)
                .then(res => {
                    setList(res.data)
                })
                .catch(errors => {
                    console.log(errors);

                });
        }
    }, [location]);

    console.log(list);

    return (
        <>
            {
                (list?.length != 0) ?
                    <div>
                        <div className="w-[80%] m-auto mt-20">
                            {
                                list?.filter(value => !value?.deleted)
                                    .map((value, index) => {
                                        return (
                                            <ItemLinkBlog info={value} key={index} />
                                        )
                                    })
                            }
                        </div>
                    </div>
                    :
                    <p className="w-[80%] m-auto mt-44 text-center text-base font-semibold text-[#999]">Không có gì ở đây cả</p>
            }
        </>
    );
}

export default HomePage;