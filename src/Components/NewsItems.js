import React from "react";

const NewsItems = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>

        <img
          src={imageUrl}
          style={{ height: "8rem" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              by {author} on {new Date(date).toUTCString()}
            </small>
          </p>
          <a href={newsUrl} target="blank" className="btn btn-sm  btn-dark">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItems;
