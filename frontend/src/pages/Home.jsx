import React, { useContext } from 'react';
import NewPostForm from '../components/NewPostForm';
import Thread from '../components/Thread';
import { UidContext } from '../components/AppContext';
import Login from '../components/Log/Login';

const Home = () => {
    const uid = useContext(UidContext);
    return (
       <div className="home">
            <div className="container">
            {uid ? <NewPostForm /> : <Login signin={true} signup={false} />}
                <Thread />
            </div>
       </div>
    );
};

export default Home;