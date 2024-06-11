import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axoisClient";

const mdParser = new MarkdownIt(/* Markdown-it options */);


function Edit() {
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState({});
    const [title, setTitle] = useState('');

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {

        const token = JSON.parse(localStorage.getItem("token"));
        if (token != null) {
            const headers = {
                'Authorization': `Bearer ${token.accessToken}`,
            };
            axiosClient.get(`/api/get/${id}/blog`, { headers })
                .then(res => {
                    setTopic(res.data.idTopic);
                    setTitle(res.data.title);
                    setContent({ textHtml: res.data.textHtml, textMarkdown: res.data.textMarkdown });
                })
                .catch(errors => console.log(errors))
        }
    }, [])

    function handleUpdate() {
        const token = JSON.parse(localStorage.getItem("token"));
        const cf = confirm("Có muốn thay đổi nội dung?");
        if (cf) {
            const headers = {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            };

            const blog = {
                idBlog: id,
                title: title,
                textHtml: content.textHtml,
                textMarkdown: content.textMarkdown,
                idTopic: topic
            }

            axiosClient.patch(`/api/update/blog`, blog, { headers })
                .then(res => {
                    navigate(`/`);
                })
                .catch(errors => console.log(errors))
        }
    }

    function onImageUpload(file) {
        const formData = new FormData();
        formData.append('image', file);

        return axiosClient.post('/upload-image', formData, { 'Content-Type': 'multipart/form-data' })
            .then((res) => {
                return `http://localhost:8080${res.data}`;
            })

    }

    function handleEditorChange({ html, text }) {
        setContent({ textHtml: html, textMarkdown: text });
    }

    const handleChange = (event) => {
        setTopic(event.target.value);
    };

    return (
        <div className="mt-10 w-[90%] m-auto">
            <div className="flex sm:flex-row flex-col mb-4">
                <div className="sm:w-[20%] lg:w-[10%] w-[100%]">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Chủ đề</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={topic}
                            label="Chủ đề"
                            onChange={handleChange}
                        >
                            <MenuItem value="1">Du lịch</MenuItem>
                            <MenuItem value="2">Thể thao</MenuItem>
                            <MenuItem value="3">Học tập</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="sm:mt-0 mt-4 flex-1 sm:ml-2 outline-none rounded border-[1px] border-[#989696] px-4 py-2 text-black font-bold" placeholder="Nhập tiêu đề"></input>
            </div>
            <MdEditor value={content.textMarkdown} onImageUpload={onImageUpload} style={{ height: '500px', width: '100%' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            <button onClick={handleUpdate} className="mt-14 px-6 py-3 bg-blue-500 rounded text-white font-medium text-base">Cập Nhật</button>
        </div>
    );
}

export default Edit;