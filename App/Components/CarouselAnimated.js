//Importaciones
import React from 'react';
import { Image } from 'react-native-elements';
import Carousel from "react-native-snap-carousel";

//Componente para mostrar imágenes en carousel: 
//deslizar en pantalla para encontrar otras imágenes
export default function CarouselAnimated(props) {
    const { arrayImages, height, width } = props;

    const renderItem = ({ item }) => {
        return (
            <Image
                style={{ width, height }}
                source={{ uri: item }}
            />)
    }

    return (
        <Carousel
            layout={"tinder"}
            data={arrayImages}
            sliderWidth={width}
            itemWidth={width}
            renderItem={renderItem}
        />
    )
}
