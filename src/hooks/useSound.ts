import TransmissionSound from '../assets/effects/open-transmission.mp4';
import ViewSound from '../assets/effects/new-view.mp4';

const broadcastSound = new Audio(TransmissionSound);
const viewerSound = new Audio(ViewSound);

export function useSound() {
    const openBroadcast = () => {
        broadcastSound.currentTime = 0;
        broadcastSound.volume = 0.1
        broadcastSound.play();
    }
    const viewerBroadcast = () => {
        viewerSound.currentTime = 0;
        viewerSound.volume = 0.1
        viewerSound.play();
    }


    return {
        openBroadcast,
        viewerBroadcast
    }
}