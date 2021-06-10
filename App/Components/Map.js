//Importaciones
import React from 'react';
import MapView from "react-native-maps";

//Componente Map para mostrar ubicaciones
export default function Map(props) {
    const { location, height } = props;
    return (
        <MapView style={{ height: height, width: "100%", }}
            initialRegion={location}
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


