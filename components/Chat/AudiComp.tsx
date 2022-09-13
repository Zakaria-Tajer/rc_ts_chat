import { View, Image, Text, Pressable } from 'react-native'
import React from 'react'
import { Audio } from 'expo-av';
import { useState, useEffect } from "react"
import { Entypo, AntDesign } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useSelector } from 'react-redux';
import { RooteState } from '../../redux/store';




const AudiComp = (url: string | any) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [soundStatus, setSoundStatus] = useState<any>(null)
    const [isSoundPlaying, setIsSoundPlaying] = useState<any>(null)
    const [currentAudio, setCurrentAudio] = useState<any>([])
    const [playBackPosition, setPlaybackPosition] = useState<any>(null)
    const [playBackDuration, setPlaybackDuration] = useState<any>(null)
    const [totalAudioDuration, setTotalAudioDuration] = useState<any>({})

    useEffect(() => {
        const _onPlaybackStatusUpdate = (playbackStatus: any) => {
            setTotalAudioDuration(playbackStatus)
        }
        const playAudioObj = new Audio.Sound();
        playAudioObj.loadAsync({
            uri: url.source.uri,
        }, { shouldPlay: false });
        playAudioObj.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
    }, [])

    const AudioId = useSelector((state: RooteState) => state.dataHandler.AudioId)
    // console.log("audi", AudioId);

    const _onPlaybackStatusUpdate = (playbackStatus: any) => {
        console.log(playbackStatus);
        if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
            setPlaybackPosition(playbackStatus.positionMillis);
            setPlaybackDuration(playbackStatus.durationMillis);
        }

    }

    const calculateSeekBar = (isComplete: any) => {
        if (playBackPosition !== null && playBackDuration !== null && isComplete === false) {
            return playBackPosition / playBackDuration
        } else {
            return playBackPosition
        }


    }

    const millisToMinutesAndSeconds = () => {
        let minutes = Math.floor(totalAudioDuration.durationMillis / 60000);
        let seconds: any = ((totalAudioDuration.durationMillis % 60000) / 1000).toFixed(0);

        if (isNaN(seconds)) return '...'
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    const playAudio = async () => {
        if (soundStatus === null) {
            const playAudioObj = new Audio.Sound();
            const status = await playAudioObj.loadAsync({
                uri: url.source.uri,
            }, { shouldPlay: true });
            setCurrentAudio((prev: any) => [...prev, AudioId])
            setSoundStatus(status);
            setIsPlaying(true)
            setIsSoundPlaying(playAudioObj)
            console.log(isSoundPlaying);

            return playAudioObj.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
        }

        if (soundStatus.isLoaded && soundStatus.isPlaying) {
            const status = await isSoundPlaying.setStatusAsync({ shouldPlay: false });
            setIsPlaying(false)
            return setSoundStatus(status);
        }

        if (soundStatus.isLoaded && !soundStatus.isPlaying && AudioId == currentAudio[0]) {
            const status = await isSoundPlaying.playAsync()
            setIsPlaying(true)
            return setSoundStatus(status);
        }

    }

    return (
        <View className='w-3/4 relative flex-row pl-3 py-3 mr-3 h-16 items-center bg-white shadow-sm mt-4 rounded justify-between'>

            <View className='flex-row items-center'>

                <Pressable onPress={playAudio}>
                    {isPlaying ? (
                        <AntDesign name="pause" size={30} color="#ad0808" />

                    ) : (
                        <Entypo name="controller-play" size={30} color="#ad0808" />
                    )}
                </Pressable>

                <View className=''>
                    <Slider
                        style={{ width: 190, height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        value={calculateSeekBar(false)}
                        thumbTintColor='#ad0808'
                        minimumTrackTintColor="#ad0808"
                        maximumTrackTintColor="#ad0808"
                        onSlidingComplete={(val) => calculateSeekBar(val)}
                    />
                    <Text className='text-xs -bottom-2 left-3 absolute'>{millisToMinutesAndSeconds()}{" "}min</Text>
                </View>
            </View>
            <View className='w-10 h-10 mr-4 rounded-full'>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} className='w-fit h-full object-contain' />
            </View>

        </View>
    )
}

export default AudiComp