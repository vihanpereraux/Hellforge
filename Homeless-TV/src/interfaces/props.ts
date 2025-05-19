export interface ChannelDataProps {
    channelName: string,
    channelURL: string [],
    streamType: string,
    channel_logo: string
}

export interface PlayerProps {
    data: ChannelDataProps,
    // streamType: string,
}

export interface ChannelDetailsProps {
    id: string,
    channelName: string,
    streamType: string,
    channelLogo: string,
    channelCategory: string,
    channelURL: string[]
}