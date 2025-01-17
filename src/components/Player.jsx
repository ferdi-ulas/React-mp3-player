import React, { useState, useRef, useEffect } from "react";
import { GrPlayFill } from "react-icons/gr";
import { TbPlayerStopFilled } from "react-icons/tb";
import { IoPlayBack } from "react-icons/io5";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import Footer from "./Footer";
import "../css/Player.css";

const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const tracks = [
        { title: "Avril Lavigne - When You're Gone", src: "../public/Avril Lavigne - When Youre Gone (Official Video).mp3" },
        { title: "Coolio - Gangstas Paradise (feat. L.V.)", src: "../public/Coolio - Gangstas Paradise (feat. L.V.) [Official Music Video].mp3" },
        { title: "Evanescence - Bring Me To Life", src: "../public/Evanescence - Bring Me To Life (Official Music Video).mp3" },
    ];

    const audioRef = useRef(null);
    const progressBarRef = useRef(null);

    const togglePlay = () => {
        const audioElement = audioRef.current;
        isPlaying ? audioElement.pause() : audioElement.play();
        setIsPlaying(!isPlaying);
    };

    const onTimeUpdate = () => {
        if (!dragging) {
            const current = audioRef.current.currentTime;
            setCurrentTime(current);
            setProgress((current / duration) * 100);
        }
    };

    const onProgressClick = (e) => {
        const clickPosition = (e.clientX - progressBarRef.current.getBoundingClientRect().left) / progressBarRef.current.offsetWidth;
        const newTime = clickPosition * duration;
        audioRef.current.currentTime = newTime;
        setProgress(clickPosition * 100);
    };

    const onProgressDragStart = () => setDragging(true);

    const onProgressDragEnd = () => {
        setDragging(false);
        audioRef.current.currentTime = (progress / 100) * duration;
    };

    const onProgressDrag = (e) => {
        if (dragging) {
            const clickPosition = (e.clientX - progressBarRef.current.getBoundingClientRect().left) / progressBarRef.current.offsetWidth;
            setProgress(Math.min(Math.max(clickPosition * 100, 0), 100));
        }
    };

    const playPrevious = () => {
        setCurrentTrackIndex((prevIndex) =>
            prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
        );
    };

    const playNext = () => {
        setCurrentTrackIndex((prevIndex) =>
            prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = tracks[currentTrackIndex].src;
            audioRef.current.load();
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            setProgress(0);
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentTrackIndex]);

    useEffect(() => {
        const audioElement = audioRef.current;
        const updateDuration = () => setDuration(audioElement.duration);
        audioElement.addEventListener("timeupdate", onTimeUpdate);
        audioElement.addEventListener("loadedmetadata", updateDuration);

        return () => {
            audioElement.removeEventListener("timeupdate", onTimeUpdate);
            audioElement.removeEventListener("loadedmetadata", updateDuration);
        };
    }, []);

    return (
        <div className="player-container">
            <h2>{tracks[currentTrackIndex].title}</h2>
            <img
                src="https://images.pexels.com/photos/30192163/pexels-photo-30192163/free-photo-of-petra-tou-romiou-nun-hava-gorunumu-kibris-sahil-seridi.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Cover"
            />
            <audio ref={audioRef} />
            <div className="controls">
                <button onClick={playPrevious}><IoPlayBack /></button>
                <button onClick={togglePlay} className="play-button">
                    {isPlaying ? <TbPlayerStopFilled /> : <GrPlayFill />}
                </button>
                <button onClick={playNext}><TbPlayerTrackNextFilled /></button>
            </div>
            <div
                className="progress-container"
                ref={progressBarRef}
                onClick={onProgressClick}
                onMouseDown={onProgressDragStart}
                onMouseUp={onProgressDragEnd}
                onMouseMove={onProgressDrag}
            >
                <div className="progress-bar" style={{ width: `${progress}%` }} />
                <div className="progress-thumb" style={{ left: `${progress}%` }} />
            </div>
            <div className="time-info">
                <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

export default Player;
