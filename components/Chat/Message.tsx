import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components/native';
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
                    ? `w-fit px-10 max-w-[70%] py-6 break-words  flex-col rounded-md m-3 mb-2 pl-2 text-white bg-[#ad0808]`
                    : 'w-fit px-10 max-w-[70%] py-6 break-words rounded-md m-3 mb-2 relative pl-2 bg-white'}
                style={{ fontFamily: 'Montserrat-Medium' }}
            >
                {message.message}
            </Text>
            <View className={isEqual ? 'absolute bottom-2.5' : 'absolute right-0 bottom-2.5 items-end'}>
                <Text className={isEqual ? 'pr-5 text-white' : ''}>{message.timestamp ? moment(message.timestamp).format('LT') : '...'}</Text>
            </View>
            {/* <Text className='abolute top-0'>{message.timestamp}</Text> */}
        </View>
    )
}

export default Message
