import React from 'react'

export default function PuzzleOnlyPlayer(props) {
    const { pharse, booleanArray } = props;
    let ph = ["'", ".", ",", "?", "!", "#", "@", "|", "&", "%", "$", "/"];
    return (
        <div className="row">
            {pharse.map((item, index) => {
                return (
                    <span key={index}>
                        {ph.map(i => i === item).findIndex(i => i === true) < 0 ? (
                            <span className="col-1 text-center bg-primary text-uppercase text-light mr-1 border-bottom">
                                {booleanArray[index] === true ? item : "   "}{" "}
                            </span>
                        ) : (
                                <span className="col-1 text-center text-uppercase text-success mr-1 ">
                                    {item}
                                </span>
                            )}
                    </span>
                );
            })}
        </div>
    )
}
