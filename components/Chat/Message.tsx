import { View, Text, Image } from 'react-native'
import React from 'react'
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
    const mimeType = useSelector((state: RooteState) => state.dataHandler.fileMimeType)
    const dispatch: AppDispatch = useDispatch()
    const MessageTypeStyle = isEqual ? 'w-40 h-40 object-cover ' : ''

    const getFileTypes = () => {
        if (messageType === "image/jpeg") {
            return <ImageComp key={MessageKey} source={{ uri: message.message }} />
        } else if (messageType === "video/mp4") {
            return <VideoComp key={MessageKey} source={{ uri: message.message }} />
        } else if (messageType === "audio/mpeg") {
            return <AudiComp key={MessageKey} source={{ uri: message.message }} />
           
        }

    }

    if (messageType === "audio/mpeg") dispatch(uploadedFilesData({ AudioId: MessageKey }))



    return (
        <View className={isEqual ? 'w-full relative space-y-4 items-end' : 'w-full relative space-y-4 items-start'}>
            {messageType !== "string" ? (
                <View className='mb-2'>

                    {getFileTypes()}

                </View>
                // <View className={isEqual ? 'w-full items-end pr-3' : 'w-full items-start'}>
                //     <Image className='w-40 h-40 object-cover rounded' source={{ uri: message.message}}/>
                // </View>
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
            {/* <Image className='w-full h-20 bg-blue-400 object-cover' source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/rc-ts-59ece.appspot.com/o/files%2FlzULCaTI2NteRjUdtFmJFB_IMG_1662639726369.jpg?alt=media&token=98b5a7e4-389b-46b5-ae5f-9530caa68e5e'}}/> */}
        </View>
    )
}

export default Message
