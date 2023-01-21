import React, { useState, useEffect } from "react";
function Form() {
    const [data, getData] = useState([]);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [gender, setGender] = useState();
    const URL = "https://dataimg-c18fc-default-rtdb.firebaseio.com/.json";
    useEffect(() => {
        fetch(URL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.status !== 200) {
            }
            res.json()
                .then((response) => {
                    console.log(response);
                    getData(response);
                    setId(response[0].ID);
                    setName(response[0].Name);
                    setLocation(response[0].Location);
                    setDate(response[0].Date);
                    setTime(response[0].Time);
                    setGender(response[0].Gender);
                })
        }).catch((e) => {
            console.log(e);
        });
    }, []);
    const imgURL = "https://firebasestorage.googleapis.com/v0/b/dataimg-c18fc.appspot.com/o/" + name + ".jpg?alt=media";
    function handleClick(id, name, location, date, time, gender) {
        setId(id);
        setName(name);
        setLocation(location);
        setDate(date);
        setTime(time);
        setGender(gender);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            <h4>{id}</h4>
                            <h6>Person Detected</h6>
                        </div>
                        <div className="card-body">
                            Name: {name} <br></br>
                            Location: {location} <br></br>
                            Date: {date} <br></br>
                            Time: {time} <br></br><br></br>
                            Description:<br></br>
                            {name} detected at<br></br>
                            {location} on {date}<br></br>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card" >
                        <div className="card-header">
                            <b>{gender}</b>
                        </div><center>
                            <img src={imgURL} height="500px" width="500px" alt="Logo" />
                        </center>
                    </div>
                </div>
                <div className="col">
                    <div className="card" style={{height:"550px", overflow:"auto"}}>
                        <div className="card-header">
                            <b>Events</b>
                        </div>
                        {data.map((item, i) => (
                            <div key={i} onClick={() => handleClick(item.ID, item.Name, item.Location, item.Date, item.Time, item.Gender)} className="alert" role="alert">
                                {item.ID} : {item.Location}  &nbsp;&nbsp;&nbsp;&nbsp;<i>{item.Date} {item.Time}</i><br></br>
                              
                                Person detected.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            
                            </div>
                            
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Form;
