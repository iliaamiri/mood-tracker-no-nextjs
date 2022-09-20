import {useEffect, useState} from 'react';
import './App.css';
import {Mood} from "./models/Mood";
import MoodRepository from "./services/moodRepository";
import MoodItem from "./components/Mood/MoodItem";
import {Link} from "react-router-dom";

enum OrderByEnum {
    Date,
    Rate
}

function App() {
    const [moodsList, setMoodList] = useState<Mood[]>([]);

    useEffect(() => {
        (async function () {
            const allMoods = await MoodRepository.getAll();

            setMoodList([...allMoods]);
        })();
    }, []);

    const deleteCallback = async (moodId: number) => {
        setMoodList((currentMoodList) => {
            let newList = currentMoodList.filter(mood => mood.moodId !== moodId);
            return [...newList];
        });
        await MoodRepository.remove(moodId);
    };

    const orderByHandler = (orderBy: OrderByEnum) => {
        if (orderBy === OrderByEnum.Date) {
            setMoodList((currentMoodList) => {
                let newList = currentMoodList.sort((mood1, mood2) => new Date(mood2.createdAt).getTime() - new Date(mood1.createdAt).getTime());
                return [...newList];
            });
        } else if (orderBy === OrderByEnum.Rate) {
            setMoodList((currentMoodList) => {
                let newList = currentMoodList.sort((mood1, mood2) => mood2.rating - mood1.rating);
                return [...newList];
            });
        } else {
            //debugger;
            // alert("ERROR");
        }
    };

    return (
        <div className={'container mx-auto h-screen flex flex-col align-center place-content-center justify-center'}>
            <h1 className={'text-center text-6xl font-bold'}>Mood Tracker</h1>
            <div className={'flex justify-center'}>
                <button className={'btn btn-black'}>
                    <Link to={'/moods/add'}>Add Mood</Link>
                </button>
            </div>
            <div className={'flex justify-center'}>
                <button className={'btn btn-black'} onClick={() => orderByHandler(OrderByEnum.Date)}>Order By Date
                </button>
                <button className={'btn btn-black'} onClick={() => orderByHandler(OrderByEnum.Rate)}>Order By Rating
                </button>
            </div>
            <div className={'flex w-full justify-center items-center flex-col'}>
                {
                    moodsList.map((moodItem: Mood, index) => (
                        <MoodItem key={moodItem.moodId} moodItem={moodItem} deleteCallback={deleteCallback}/>
                    ))
                }
            </div>
        </div>
    )
}

export default App
