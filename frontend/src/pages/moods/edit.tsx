import React, {useEffect, useState} from "react";
import MoodRepository from "../../services/moodRepository";
import {useLoaderData} from "react-router-dom";
import {Mood} from "../../models/Mood";

export async function loader({ params }: any): Promise<Mood> {
    if (params.moodId !== undefined) {
        return await MoodRepository.getOne(params.moodId);
    } else {
        return {} as Mood;
    }
}

const EditMood = () => {
    const mood = useLoaderData() as Mood;

    const [notes, setNotes] = useState<string>(mood.feelingText);
    const [rating, setRating] = useState<number>(mood.rating);

    const updateMoodHandle = async () => {
        try {
            await MoodRepository.update({
                moodId: mood.moodId,
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

    const handleRatingChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let changedValue = event.target.value;
        if (changedValue === undefined || isNaN(parseInt(changedValue))) {
            setRating(0);
        } else {
            setRating(parseInt(changedValue));
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
                <input className={'bg-zinc-600 rounded ml-1'} type={'number'} max={10} min={0} value={rating} onChange={handleRatingChange}/>
            </div>
            <div className={'flex justify-center'}>
                <button className={'btn btn-black'} onClick={() => updateMoodHandle()}>Submit</button>
            </div>
        </div>
    );
};

export default EditMood;