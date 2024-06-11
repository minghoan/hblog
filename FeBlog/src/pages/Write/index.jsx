import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

import { useState } from "react";
import axiosClient from "../../api/axoisClient";
import { useNavigate } from "react-router-dom";

const mdParser = new MarkdownIt(/* Markdown-it options */);


function Write() {

    const [topic, setTopic] = useState('');
    const [content, setContent] = useState({});
    const [title, setTitle] = useState('');

    const navigate = useNavigate();

    function onImageUpload(file) {

        const formData = new FormData();
        formData.append('image', file);

        return axiosClient.post('/upload-image', formData, { 'Content-Type': 'multipart/form-data' })
            .then((res) => {
                return `http://localhost:8080${res.data}`;
            })

    }

    function saveBlog() {
        const token = JSON.parse(localStorage.getItem("token"));
        const person = JSON.parse(localStorage.getItem("person"));
        if (!localStorage.getItem("person") && !localStorage.getItem("jwt")) alert("Vui lòng đăng nhập");
        else {
            if (title === '' || topic === '') alert("Vui lòng điền thông tin đầy đủ");
            else {
                const blog = {
                    title: title,
                    textHtml: content.textHtml,
                    textMarkdown: content.textMarkdown,
                    email: person.email,
                    idTopic: topic
                }

                const headers = {
                    'Authorization': `Bearer ${token.accessToken}`,
                    'Content-Type': 'application/json'
                };
                axiosClient.post(`/api/post/blog`, blog, { headers })
                    .then(res => {
                        alert("Đăng bài thành công");
                        navigate(`/p/${person?.accountName}`)
                    })
                    .catch(errors => {
                        console.log(errors);
                        if (errors.response.status == 401) {
                            window.location.reload();
                        }
                    });
            }
        }

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
            <MdEditor defaultValue='' onImageUpload={onImageUpload} style={{ height: '450px', width: '100%' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            <button onClick={saveBlog} className="mt-14 px-6 py-3 bg-blue-500 rounded text-white font-medium text-base">Đăng</button>
        </div>
    );
}

export default Write;