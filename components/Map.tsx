import { View, Text } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'

const Map = () => {
    // const region = {}
    return (
        <>
            <Text>hi dsdsd </Text>
            {/* <MapView
                provider={PROVIDER_GOOGLE}
                className='w-full h-full rounded-2xl'
                tintColor='black'
                mapType='mutedStandard'
                showsPointsOfInterest={false}
                // initialRegion={region}
                showsUserLocation={true}
                userInterfaceStyle='light'
            >
                <Text>Map</Text>
            </MapView> */}
            <MapView
                provider={PROVIDER_DEFAULT}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </>
    )
}

export default Map