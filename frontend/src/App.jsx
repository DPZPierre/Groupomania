import React, { useEffect, useState } from "react";
import Routes from "./routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const fetchToken = async () => {
        const res = await axios({
          method: "get",
          url: `http://localhost:3000/jwtid`,
          withCredentials: true,
        });
        setUid(res.data);
        if (uid) { 
          dispatch(getUser(uid));  
      } 
    }
      fetchToken()
    } catch (error) {
      console.log(error.message)
    }
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  )
}

export default App;
