import {Mood} from "../../models/Mood";

interface MoodItemProps {
    moodItem: Mood,
    deleteCallback: (moodId: number) => Promise<void>,
}

export default function MoodItem({moodItem, deleteCallback}: MoodItemProps) {
    const renderRatings = () => {
        let result = '';
        for (let i = 0; i < 10; i++) {
            if (i < moodItem.rating) {
                result += '🌟';
            } else {
                result += '✰';
            }
        }
        return result;
    };

    const renderDate = () => {
        let date = new Date(moodItem.createdAt);
        return date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() +
            ":" + date.getSeconds();
    };

    return (
        <div className={'flex flex-col w-3/4 border-[2px] mb-2 mt-2 pb-5 rounded-3xl'}>
            <p className={'text-center'}>{renderDate()}</p>
            <p className={'text-center pt-3 pb-3 text-3xl'}>{moodItem.feelingText}</p>
            <div className={'flex justify-center'}>
                <p>{renderRatings()}</p>
            </div>
            <div className={'flex justify-center'}>
                <button className={'btn btn-black'} onClick={() => window.location.href = "/moods/" + moodItem.moodId + "/edit"}>Edit
                </button>
                <button className={'btn btn-black'} onClick={async () => await deleteCallback(moodItem.moodId)}>Delete
                </button>
            </div>
        </div>
    );
}