import React, { useEffect, useRef, useState } from 'react'
import { GoogleMap, LoadScript, DirectionsRenderer, MarkerF } from '@react-google-maps/api'
import restaurante from '../../../assets/loja.png'
import casa from '../../../assets/casa.png'
import location from '../../../assets/pin.png'
import api from '../../../services/api'
import { getDeliveryById, updateDeliveryPosition } from '../../../services/deliveryService'
import { useCart } from '../../../hooks/useCart'

interface MapDeliveryProps {
  setDistancia: React.Dispatch<React.SetStateAction<string>>
  setDuracao: React.Dispatch<React.SetStateAction<string>>
  setDeliveryFull: React.Dispatch<React.SetStateAction<boolean>>
}

interface Coordinate {
  lat: number
  lng: number
}

const MapDelivery = ({ setDistancia, setDuracao, setDeliveryFull }: MapDeliveryProps) => {
  const { deliveryId } = useCart()

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

  const mapStyles = {
    height: '400px',
    width: '100%',
    borderRadius: '5px',
  }
  const [mapLoaded, setMapLoaded] = useState(false)
  const [directions, setDirections] = useState<any>(null)
  const [map, setMap] = useState<any>(null)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  const [defaultStart, setDefaultStart] = useState({ lat: 0, lng: 0 })
  const [defaultDestination, setDefaultDestination] = useState({ lat: 0, lng: 0 })
  const [deliveryDriverPosition, setDeliveryDriverPosition] = useState({ lat: 0, lng: 0 })

  //   console.log(defaultStart, defaultDestination, deliveryDriverPosition)

  //   useEffect(() => {
  //     api.get('/delivery-route').then((response) => {
  //       setRoute(response.data)
  //       setDefaultStart(response.data[0])
  //       setDefaultDestination(response.data[response.data.length - 1])
  //       setDeliveryDriverPosition(response.data[0])
  //     })
  //   }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDeliveryById(deliveryId)
        setDefaultStart({ lat: Number(response.data.lat), lng: Number(response.data.lng) })
        setDefaultDestination({
          lat: Number(response.data.latDestination),
          lng: Number(response.data.lngDestination),
        })
        setDeliveryDriverPosition({
          lat: Number(response.data.lat),
          lng: Number(response.data.lng),
        })
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  function loadMap(map: any) {
    setMapLoaded(true)
    setMap(map)
  }

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       const fetchData = async () => {
  //         try {
  //           const response = await updateDeliveryPosition(1, '', '')
  //           console.log(response)
  //           if (
  //             response.data.lat !== response.data.latDestination &&
  //             response.data.lng !== response.data.lngDestination
  //           ) {
  //             setDeliveryDriverPosition({ lat: response.data.lat, lng: response.data.lng })
  //           } else {
  //             setDeliveryFull(true)
  //           }
  //         } catch (error) {
  //           console.error(error)
  //         }
  //       }

  //       fetchData()
  //     }, 5000)

  //     return () => {
  //       clearInterval(interval)
  //     }
  //   }, [deliveryDriverPosition])

  // const simulateDelivery = () => {
  //     let currentIndex = 0;

  //     const moveDelivery = () => {
  //         console.log(currentIndex)
  //         if (currentIndex < route.length) {
  //             setDeliveryDriverPosition(route[currentIndex]);
  //             currentIndex += 1;

  //             // Chama a função recursivamente para a próxima posição após um intervalo de tempo
  //             setTimeout(moveDelivery, 5000); // A cada 5 segundos
  //         } else {
  //             // Entregador chegou ao destino
  //         }
  //     };

  //     // Inicia a simulação
  //     moveDelivery();
  // };

  // useEffect(() => {
  //     // Inicia a simulação quando o componente é montado
  //     simulateDelivery();
  // }, []);

  const directionsRef = useRef<any>(null)
  const mapRef = useRef(null)

  const request = {
    origin: deliveryDriverPosition, // Posição do entregador
    destination: defaultDestination,
    travelMode: 'DRIVING' as google.maps.TravelMode,
  }

  useEffect(() => {
    if (mapLoaded && deliveryDriverPosition.lat !== 0 && defaultDestination.lat !== 0) {
      const directionsService = new window.google.maps.DirectionsService()

      if (directionsRef.current) {
        directionsRef.current.setMap(null)
      }

      if (directions) {
        setIsFirstLoad(false)
      }

      directionsService.route(request, (result, status) => {
        setDirections(result)
        if (status === 'OK' && result) {
          if (result.routes && result.routes.length > 0) {
            const route = result.routes[0]
            if (route.legs && route.legs.length > 0) {
              const leg = route.legs[0]
              if (leg.distance && leg.duration) {
                const directionsRenderer = new window.google.maps.DirectionsRenderer({
                  suppressMarkers: true,
                })

                // Configure para exibir no mapa
                directionsRenderer.setMap(map)

                // Armazene a referência para futura remoção
                directionsRef.current = directionsRenderer

                // Defina a nova rota
                directionsRenderer.setDirections(result)
                // setDirections(result)
                setDistancia(leg.distance.text)
                setDuracao(leg.duration.text)
              } else {
                console.error('Dados de distância e duração não encontrados na rota.')
              }
            } else {
              console.error('Nenhuma perna de rota encontrada.')
            }
          } else {
            console.error('Nenhuma rota encontrada.')
          }
        } else {
          console.error('Erro ao calcular a rota:', status)
        }
      })
    }
  }, [mapLoaded, deliveryDriverPosition])

  return (
    <LoadScript googleMapsApiKey={apiKey ? apiKey : ''}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={deliveryDriverPosition}
        onLoad={(map) => loadMap(map)}
        ref={mapRef}
      >
        <MarkerF
          position={defaultStart}
          icon={{
            url: restaurante,
          }}
        />

        <MarkerF
          position={defaultDestination}
          icon={{
            url: casa,
          }}
        />

        <MarkerF
          position={deliveryDriverPosition}
          icon={{
            url: location,
          }}
        />

        {isFirstLoad ? (
          <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />
        ) : null}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapDelivery
