import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { useSelector , useDispatch } from "react-redux";
import { SearchActions } from "../../redux/search-slice";
const List = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const city = useSelector(state => state.search.city);
  const options = useSelector(state => state.search.options);
  const dates = useSelector(state => state.search.dates);
  const [date, setDate] = useState([
    {
      startDate : new Date(dates[0].startDate),
      endDate : new Date(dates[0].endDate),
      key: "selection",
    }
  ]);
  const [destination, setDestination] = useState(city);
  const [openDate, setOpenDate] = useState(false);
  const [adult, setAdult] = useState(options.adult);
  const [children, setChildren] = useState(options.children);
  const [room, setRoom] = useState(options.room);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, error, loading , refetch } = useFetch(`/hotel?city=${destination}&min=${min || 0}&max=${max || 10000}`);

  const handleClick = () => {
    const serlizedDate = [{startDate : date[0].startDate.toISOString(), endDate : date[0].endDate.toISOString()}]
    const payload = {
       city : destination,
       dates : serlizedDate,
       options : {
         adult,
         children,
         room
       }
    }
    dispatch(SearchActions.reSearch(payload))
     refetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" onChange={(e) => setDestination(e.target.value)}/>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate || new Date(),
                "MM/dd/yyyy"
              )} to ${format(date[0]?.endDate || new Date(), "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={e => setMin(e.target.value)} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={e => setMax(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={adult}
                    onChange={(e) => setAdult(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={children}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={room}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? <p>loading..</p> : (
              <>
                {data && data.map(item => {
                  return <SearchItem key={item._id} item={item}/>
                })}
              </>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
