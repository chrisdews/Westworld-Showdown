import React, { Component } from 'react';
import  Timer from 'react-compound-timer';

const CountDownTimer = ({setTimerState}) =>{
  
    return (
    
        <Timer
    initialTime={65000}
    direction="backward"
    checkpoints = 	{[
      {
          time: 30000,
          callback: () => {setTimerState(30)},
      },
      {
          time: 10000,
          callback: () => {setTimerState(10)},
      },
      {
        time: 0,
        callback: () => {setTimerState(0)},
    }

  ]} >
    {({getTimerState}) => (
        <React.Fragment>
            {/* <Timer.Days /> days
            <Timer.Hours /> hours */}
            <Timer.Minutes /> minutes {" "}
            <Timer.Seconds /> seconds
            {/* <Timer.Milliseconds /> milliseconds */}
          
        </React.Fragment>
    )}
</Timer>
    
    );
  
}

export default CountDownTimer;