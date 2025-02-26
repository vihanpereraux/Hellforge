export interface ChannelDataProps {
    channelName: string,
    channelURL: string,
    streamType: string,
    channel_logo: string
}

export interface PlayerProps {
    data: ChannelDataProps,
    streamType: string,
}