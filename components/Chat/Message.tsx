import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RooteState } from '../../redux/store';
import moment from 'moment';
import ImageComp from './ImageComp';
import VideoComp from './VideoComp';
import AudiComp from './AudiComp';
import { uploadedFilesData } from '../../redux/slices/DataSlice';


interface MessageProps {
    user?: any;
    message?: any;
    messageType: any;
    MessageKey: any;
}


const Message = ({ user, message, messageType, MessageKey }: MessageProps) => {
    const currentUserEmail = useSelector((state: RooteState) => state.dataHandler.currentUser)
    const isEqual = user === currentUserEmail
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(uploadedFilesData({ AudioId: MessageKey }))
    }, [])

    const getFileTypes = () => {
        if (messageType === "image/jpeg") {
            return <ImageComp key={MessageKey} source={{ uri: message.message }} />
        } else if (messageType === "video/mp4") {
            return <VideoComp key={MessageKey} source={{ uri: message.message }} />
        } else if (messageType === "audio/mpeg") {
            return <AudiComp key={MessageKey} source={{ uri: message.message }} />
        }

    }




    return (
        <View className={isEqual ? 'w-full relative space-y-4 items-end' : 'w-full relative space-y-4 items-start'}>
            {messageType !== "string" ? (
                <View className='mb-2 mx-3'>

                    {getFileTypes()}

                </View>

            ) : (

                <Text className={
                    isEqual
                        ? `w-fit px-10 max-w-[70%] py-6 break-words relative flex-col rounded-md m-3 mb-2 pl-2 text-white bg-[#ad0808]`
                        : 'w-fit px-10 max-w-[70%] py-6 break-words rounded-md m-3 mb-2 relative pl-2 bg-white'}
                    style={{ fontFamily: 'Montserrat-Medium' }}
                >
                    {message.message}
                </Text>
            )}
            {/* <View className='absolute bottom-2.5 '>
                <Text className={isEqual ? 'pr-5 text-white' : 'px-4'}>{message.timestamp ? moment(message.timestamp).format('LT') : '...'}</Text>
            </View> */}
        </View>
    )
}

export default Message
