import React, { useEffect, useState } from "react";
import client from "../../api/client";
import { USER_STORAGE_KEY } from "../../config/constants";

function withUser(Component) {
  const Wrapper = (props) => {
    const cachedUser = localStorage.getItem(USER_STORAGE_KEY);
    const [user, setUser] = useState(cachedUser);
    useEffect(() => {
      if (!cachedUser) {
        client
          .get("/accounts/user/")
          .then((response) => {
            const data = response.data;
            localStorage.setItem(USER_STORAGE_KEY, data);
            setUser(data);
          })
          .catch((error) => console.log(error));
      } else {
        setUser(cachedUser);
      }
    }, [cachedUser]);
    return <Component {...props} user={user} />;
  };
  return Wrapper;
}

export default withUser;
