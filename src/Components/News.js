import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const captilizedFunction = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updatePage = async () => {
    props.setProgress(10);
    var url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    var data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticle(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updatePage();
    document.title = `DailyNews - ${captilizedFunction(props.category)} `;
  }, []);

  const fetchMoreData = async () => {
    var url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    var data = await fetch(url);
    let parseData = await data.json();
    setArticle(article.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0", marginTop: "90px" }}
      >
        DailyNews - Top {captilizedFunction(props.category)} headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        style={{ height: "auto;", overflow: "auto;" }}
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length !== totalResults}
        loader={loading && <Spinner />}
        scrollableTarget="scrollableDiv"
      >
        <div className="container">
          <div className="row">
            {article.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title !== null ? element.title : ""}
                    description={
                      element.description !== null ? element.description : ""
                    }
                    imageUrl={
                      !element.urlToImage
                        ? "https://static.toiimg.com/photo/108585118.cms"
                        : element.urlToImage
                    }
                    newsUrl={element.url}
                    author={!element.author ? "Unknown" : element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "sports",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
