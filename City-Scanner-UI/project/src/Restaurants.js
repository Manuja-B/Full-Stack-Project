import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Map from "./Map";
import ls from "local-storage";

class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      locations: [],
      lat: " ",
      long: " "
    };
  }

  handleClick(index) {
    this.setState({ index });
    ls.set("selectedIndex", index);
          window.location.href="/RestaurantDetails"
  }

  componentWillMount() {
    ls.set("page", "restaurants");
  }
  componentDidMount() {
    return axios({
      method: "post",
      url: "http://localhost:8080/getRestaurants",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: ls.get("city")
    })
      .then(response => {
        console.log(response.data);
        this.setState({ restaurants: response.data.results });
        this.setState({ locations: response.data.results });

        return axios({
          method: "post",
          url: "http://localhost:8080/getPosition",
          headers: { "Access-Control-Allow-Origin": "*" },
          data: ls.get("city")
        })
          .then(response => {
            console.log(response.data);
            this.setState({ lat: response.data.lat });
            this.setState({ long: response.data.long });
            console.log("states hanged", this.state);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    //const { data } = this.props.location;
    if (ls.get("city") == null) {
      window.location.href = "/home";
    } else if (this.state.lat != " " && this.state.long != " ") {
      return (
        <div className="containter-fluid">
          <h1>Restaurants in {ls.get("city")}</h1>
          <div className="row">
            <div className="col-sm-6  ">
              {this.state.restaurants.map((el, i) => (
                <div
                  style={{
                    display: "inline-block",
                    marginBottom: 18,
                    marginRight: 18,
                    marginLeft: 100,
                    paddingTop: "10px",
                    fontColor: "black"
                  }}
                >
                  <Card onClick={this.handleClick.bind(this, el)}>
                    <CardActionArea>
                    <div>
                        <div
                          className="card float-right"
                          style={{ width: 600 }}
                        >
                          <div className="row">
                            <div className="col-sm-5">
                              <img
                                className="d-block w-100"
                                src="https://picsum.photos/150?image=641"
                                alt=""
                              />
                            </div>
                            <div className="col-sm-7" style={{ marginTop: 10 }}>
                              <div className="card-block">
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h3"
                                >
                                  {el.name}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h1"
                                >
                                  <Rater total={5} rating={el.rating} />
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  {el.vicinity}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>         
                      {/* <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        width="80"
                        image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg"
                        title="Contemplative Reptile"
                      />
                      <CardContent style={{ display: "inline-block" }}>
                        <Typography gutterBottom variant="h5" component="h3">
                          {el.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h1">
                          <Rater total={5} rating={el.rating} />
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {el.vicinity}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {el.types[0]}
                          &nbsp;
                          {el.types[1]}
                          &nbsp;
                          {el.types[2]}
                          &nbsp;
                          {el.types[3]}
                        </Typography>
                      </CardContent> */}
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
            <div className="col-sm-6">
              <Map
                lat={this.state.lat}
                long={this.state.long}
                locations={this.state.locations}
                shopLoc={[]}
                busStopLoc={[]}
                atmLoc={[]}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default Restaurants;
