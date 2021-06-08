import React from 'react';
import MapView from "react-native-maps";

export default function Map(props) {
    const { location, name, height } = props;
    console.log(location)
    return (
        <MapView style={{ height: height, width: "100%" }}
            inicialRegion={location}
        >

            <MapView.Marker
                coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                }}
            />

        </MapView>
    )
}


