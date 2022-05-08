import React, { useState } from "react";

function Movieform({ addToMovieDirectory }) {
  const [errorDuration, setErrorDuration] = useState(false);
  const [data, setData] = useState({ name: "", ratings: "", duration: "" });

  const addMovie = () => {
    if (data.name && data.ratings && data.duration) {
      if (!ValidateDuration()) {
        return setErrorDuration(true);
      }
      let updatedDuration = checkForHrsConversion();
      addToMovieDirectory({ ...data, duration: updatedDuration });
    }
  };

  const checkForHrsConversion = () => {
    let duration = parseFloat(data.duration.slice(0, data.duration.length - 1));
    if (data.duration[data.duration.length - 1] === "m") {
      let hours = (duration / 60).toFixed(2);
      return hours;
    }
    return duration.toString();
  };

  const ValidateDuration = () => {
    let durationFormat = data.duration[data.duration.length - 1];
    if (durationFormat === "h" || durationFormat === "m") {
      let duration = data.duration.substring(0, data.duration.length - 1);
      if (isNaN(duration)) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  };

  const changeData = (e) => {
    if (errorDuration) {
      setErrorDuration(false);
    }
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section>
      <div className="card pa-30">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="layout-column mb-15">
            <label htmlFor="name" className="mb-3">
              Movie Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Movie Name"
              data-testid="nameInput"
              name="name"
              onChange={changeData}
            />
          </div>
          <div className="layout-column mb-15">
            <label htmlFor="ratings" className="mb-3">
              Ratings
            </label>
            <input
              type="number"
              id="ratings"
              placeholder="Enter Rating on a scale of 1 to 100"
              data-testid="ratingsInput"
              name="ratings"
              onChange={changeData}
            />
          </div>
          <div className="layout-column mb-30">
            <label htmlFor="duration" className="mb-3">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              placeholder="Enter duration in hours or minutes"
              data-testid="durationInput"
              name="duration"
              onChange={changeData}
            />
          </div>
          {/* Use this div when time format is invalid */}
          {errorDuration && (
            <div className="alert error mb-30" data-testid="alert">
              Please specify time in hours or minutes (e.g. 2.5h or 150m)
            </div>
          )}
          <div className="layout-row justify-content-end">
            <button
              type="submit"
              className="mx-0"
              data-testid="addButton"
              onClick={addMovie}
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Movieform;
