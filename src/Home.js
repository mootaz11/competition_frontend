import logo from './logo.svg';
import { useState, useEffect, useContext } from 'react';
import { getEntreprises } from './axios';
import marker from './assets/marker.png';
import './Home.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow
} from "react-google-maps";
import globalContext from './context/globalContext';




const Map = (props) => {
  const context = useContext(globalContext);


  const [entreprises, setEntreprises] = useState([]);
  const [mapMarker,setMapMarker] = useState(null);
  const [entreprise ,setEntreprise]=useState(null);

  useEffect(() => {
    getEntreprises().then(_entreprises => {
      setEntreprises(_entreprises);
    }).catch(err => { console.log(err) })
  }, [])

const onMarkerClick = ( value) =>
{
      setMapMarker(value);
}
const handleEntrepriseInfo =(value)=>{
  setEntreprise(value)
  context.handleEntreprise(value);
}

  return (


    <GoogleMap defaultZoom={7} defaultCenter={{ lat: 33.8869, lng: 9.5375 }} options={{ mapTypeControl: false, styles: customStyle }}  >

      {
        entreprises.map((value) =>

          <Marker key={value._id} onClick={()=>{onMarkerClick(value)}}
            position={{ lat: Number(value.location.latitude), lng: Number(value.location.longitude) }} icon={{ url: marker, scaledSize: new window.google.maps.Size(40, 40) }}>

            { value==mapMarker &&  (
              <InfoWindow
               key={value._id}
               marker={value}
              >

                <div onClick={()=>{handleEntrepriseInfo(value)}} style={
                  { height:"10vh",width:"30vh"
                  ,background: "white",display:"flex",
                  flexDirection:"column",alignItems:"center",
                  justifyContent:"center" }}>
                 <text>{"Nom du societe : " + value.name}</text> 
                  <text>{"Adresse du societe :"+value.address}</text>
                </div>
              </InfoWindow>
            )}

          </Marker>


        )
      }





    </GoogleMap>


  )


}


export default function Home() {
    const Wrapper = withScriptjs(withGoogleMap(Map))
    const context = useContext(globalContext);
    const [entreprise,setEntreprise]=useState(null)
  
  
    useEffect(()=>{
        setEntreprise(context.entreprise)
    },[context.entreprise])
  
  
  
    return (
    <div className="Home">
        <div className="entrepriseContainer">
          <div className="titleContainer">
            <text className="title">Entrepreneuriat.tn</text>
          </div>
          <div className="EntrepriseimageContainer">
                  <img className ="image" src={entreprise ? "http://localhost:4000/"+entreprise.image:null}/>
          </div>
          <div className="informationsContainer">
            <div className="info">
                <text className="info_text"> name :</text>
                <text className="info_text">description :</text>
                <text className="info_text" >addresse :</text>
                <text className="info_text" >contact : </text>
                
            </div>
            <div className="value">
                <text className="info_data"> {entreprise ? entreprise.name : ""}</text>
                <text className="info_data">{entreprise ? entreprise.description : ""}</text>
                <text className="info_data" >{entreprise ? entreprise.address : ""}</text>
                <text className="info_data" >{entreprise ? entreprise.contact : ""}</text>


            </div>
          </div>
        </div>
        <div className="mapContainer">
          <Wrapper
  
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDcbXzRxlL0q_tM54tnAWHMlGdmPByFAfE&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: '100vh', width: '100%' }} > </div>}
            containerElement={<div style={{ height: '100vh', width: '100%' }}> </div>}
            mapElement={<div style={{ height: '100vh', width: '100%' }} > </div>}
  
          />
        </div>
      </div>
    );
  }
  
  const customStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ]