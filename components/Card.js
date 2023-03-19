import React from 'react';

const Card = ({details}) => {
  console.log(details)
  return (
        <div className = "flex justify-center align-center flex-col max-w-lg px-10">
          {details?.map((val,index) => {
            return (
            <div key = {index}>
            <h2 className = "text-lg pt-2">{val.header}</h2>
            <p className = "ml-4 text-sm">{val.paragraph}</p>
            </div>
            )
          })}
        </div>
  );
};

export default Card;
