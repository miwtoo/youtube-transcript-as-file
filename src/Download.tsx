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
        <button onClick={handleDownload}>
            Download
        </button>
    );
};

export default Download;