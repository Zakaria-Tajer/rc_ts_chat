import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RooteState } from '../../redux/store';
import moment from 'moment';


interface MessageProps {
    user: any;
    message: any;
}


const Message = ({ user, message }: MessageProps) => {
    const currentUserEmail = useSelector((state: RooteState) => state.dataHandler.currentUser)
    const isEqual = user === currentUserEmail
    return (
        <View className={isEqual ? 'w-full relative space-y-4 items-end' : 'w-full relative space-y-4 items-start'}>
            <Text className={
                isEqual
                    ? `w-fit px-10 max-w-[70%] py-6 break-words relative flex-col rounded-md m-3 mb-2 pl-2 text-white bg-[#ad0808]`
                    : 'w-fit px-10 max-w-[70%] py-6 break-words rounded-md m-3 mb-2 relative pl-2 bg-white'}
                style={{ fontFamily: 'Montserrat-Medium' }}
            >
                {message.message}
            </Text>
            <View className='absolute bottom-2.5 '>
                <Text className={isEqual ? 'pr-5 text-white' : 'px-4'}>{message.timestamp ? moment(message.timestamp).format('LT') : '...'}</Text>
            </View>
        </View>
    )
}

export default Message
