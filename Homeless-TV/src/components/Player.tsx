import React, {useEffect} from "react";
import ReactPlayer from 'react-player';

// props
import { PlayerProps } from "../interfaces/props";

const Player: React.FC<PlayerProps> = ({ data, streamType }) => {
    useEffect(() => {
        console.log(streamType)
    }, [data, streamType])
    
    return (
        <>
            <div>
                {streamType === "stream" ? (
                    <div style={{
                        width: '98.25%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ReactPlayer
                            height={720 / .8}
                            width={1080 / .8}
                            url={data?.channelURL}
                            playing={true}
                            controls
                            muted={true}
                        />
                    </div>
                ) : (
                    <div style={{
                        width: '99%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <iframe
                            allowFullScreen={true}
                            style={{
                                height: 'calc(720px / .8)',
                                width: 'calc(1080px / .8)',
                                border: 'none',
                                borderRadius: '12px'
                            }} src={data?.channelURL}></iframe>
                    </div>
                )}
            </div>
        </>
    )
}

export default Player;