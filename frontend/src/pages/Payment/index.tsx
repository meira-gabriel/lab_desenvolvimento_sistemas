import { useEffect, useState, useRef } from 'react';

import Head from "../../components/Head";
import { Container } from "./styles";
import { OrderHeader } from "../../components/OrderHeader";
import { useCart } from "../../hooks/useCart";
import { ConvertValue } from "../../helpers/convertValue";


import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import customIconUrl from '../../assets/location.svg'
import api from '../../services/api';

interface Coordinate {
    lat: number;
    lng: number;
}

export default function Payment() {
    const { cart } = useCart()

    const totalAmount = cart.reduce((acc, item) => (acc += item.subtotal), 0)

    const [pagamento, setPagamento] = useState(true)

    const [route, setRoute] = useState<Coordinate[]>([]); // Adicione a tipagem para 'route'
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPosition, setCurrentPosition] = useState<Coordinate | null>(null); // Adicione a tipagem para 'currentPosition'

    const mapRef = useRef<any>(null);

    useEffect(() => {
        const getNextCoordinate = () => {
            if (currentIndex < route.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        };

        const intervalId = setInterval(getNextCoordinate, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentIndex, route]);

    useEffect(() => {
        api.get("/delivery-route").then((response) => {
            setRoute(response.data);
            setCurrentPosition(response.data[0]);
        });
    }, []);

    const customIcon = new L.Icon({
        iconUrl: customIconUrl,
        iconSize: [40, 40],
        iconAnchor: [15, 40]
    });

    useEffect(() => {
        const smoothMarkerMovement = () => {
            if (currentIndex < route.length - 1 && currentPosition !== null) {
                const currentLat = currentPosition?.lat || 0;
                const currentLng = currentPosition?.lng || 0;
                const nextLat = route[currentIndex + 1].lat;
                const nextLng = route[currentIndex + 1].lng;

                const intermediateLat = currentLat + (nextLat - currentLat) * 0.1;
                const intermediateLng = currentLng + (nextLng - currentLng) * 0.1;

                setCurrentPosition({ lat: intermediateLat, lng: intermediateLng });

                if (mapRef.current) {
                    mapRef.current.setView({ lat: intermediateLat, lng: intermediateLng });
                }

            }
        };

        const smoothMovementInterval = setInterval(smoothMarkerMovement, 100);

        return () => {
            clearInterval(smoothMovementInterval);
        };
    }, [currentIndex, currentPosition, route]);

    return (
        <>
            <Head title='Pagamento' />

            <Container>
                <OrderHeader />
                {pagamento ?
                    <div>
                        <h3>Pagamento</h3>
                        <h4>Pix</h4>
                        <img src="https://banqi.com.br/assets/img/uploads/qrcode.png"></img>
                        <span>
                            Total : <strong>{ConvertValue(totalAmount)}</strong>
                        </span>
                        <button onClick={() => setPagamento(false)}>Pagar</button>
                    </div>
                    :
                    <div>
                        <h1>Localização em Tempo Real</h1>
                        {route.length > 0 && currentPosition !== null ? (
                            <MapContainer
                                center={currentPosition}
                                zoom={15}
                                style={{ width: "100%", height: "400px", marginBottom: "10px" }}
                                ref={mapRef}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={currentPosition} icon={customIcon}>
                                    <Popup>Localização atual</Popup>
                                </Marker>
                            </MapContainer>
                        ) : (
                            <p>Obtendo a localização...</p>
                        )}
                    </div>
                }
            </Container>
        </>
    )
}