import { saveAs } from 'file-saver';
import axios from 'axios'
import React from 'react';

interface DownloadProps {
    link: string
}

const Download: React.FC<DownloadProps> = (props) => {

    const fetchTranscript = async (videoId: string) => {
        const options = {
            method: 'POST',
            url: 'https://api.kome.ai/api/tools/youtube-transcripts',
            headers: { 'content-type': 'application/json' },
            data: { video_id: videoId, format: true }
        };

        try {
            const { data } = await axios.request(options);
            return data.transcript;
        } catch (error) {
            console.error('Error fetching transcript:', error);
            throw error;
        }
    };

    const handleDownload = async () => {
        try {
            const transcript = await fetchTranscript(props.link);
            const file = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
            saveAs(file, 'youtube_transcript.txt');
        } catch (error) {
            console.error('Error handling download:', error);
        }
    };

    return (
        <button onClick={handleDownload} className="inline-flex items-center gap-x-2 px-3 py-1 shadow-lg shadow-gray-500/50 bg-black text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]">
            <span className="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                </svg>
            </span>
            Download
        </button>
    );
};

export default Download;