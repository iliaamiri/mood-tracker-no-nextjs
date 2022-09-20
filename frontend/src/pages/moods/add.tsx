import {useState} from "react";
import MoodRepository from "../../services/moodRepository";

export default function AddMood() {
    const [notes, setNotes] = useState<string>("");
    const [rating, setRating] = useState<number>(0);

    const addMoodHandle = async () => {
        try {
            await MoodRepository.add({
                feelingText: notes,
                rating: rating
            });

            window.location.href = '/';
        } catch (error) {
            debugger;
            console.log(error);
            alert("error");
        }
    };

    return (
        <div className={'container mx-auto h-screen flex flex-col align-center place-content-center justify-center'}>
            <h1 className={'text-center text-6xl font-bold'}>Mood Tracker</h1>
            <div className={'flex justify-center mt-2'}>
                <label>Notes:</label>
                <input className={'bg-zinc-600 rounded ml-1'} value={notes} onChange={(event) => setNotes(event.target.value)} />
            </div>
            <div className={'flex justify-center mt-1 mb-2'}>
                <label>Rating:</label>
                <input className={'bg-zinc-600 rounded ml-1'} type={'number'} max={10} min={0} value={rating} onChange={(event) => setRating(parseInt(event.target.value))}/>
            </div>
            <div className={'flex justify-center'}>
                <button className={'btn btn-black'} onClick={() => addMoodHandle()}>Submit</button>
            </div>
        </div>
    );
}
