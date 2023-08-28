import React, { useEffect } from 'react';
import { View, Text, Linking } from 'react-native'; // Importe o Linking do React Native
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { GetContext } from './AppContext';

const DeepLinkHandler = () => {
  const { authToken } = GetContext();
  const navigation = useNavigation();

  const fetchPlaces = async (placeId) => {
        try {
        const response = await axios.get(
            'https://itapastur-api.fly.dev/categories/enterprises',
            {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            }
        );
        let data = response.data["enterprises"];
        const categories = ['artesoes', 'pontos', 'lojas'];
        let placeData = {};
        categories.forEach((category) => {
            let filteredList = data[category].filter(item => item['id'] === placeId);
            if (filteredList.length > 0) {
                placeData = filteredList[0];
            }
        })
        navigation.navigate('Place', { placeData });
        } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        };
    };

    useEffect(() => {
        // Lidar com o deep link
        const handleDeepLink = async (event) => {
        const { path, queryParams } = Linking.parse(event.url);

        if (path === 'abrir-pagina/place') {
            const placeId = queryParams.id;
            // Navegar para a tela Place passando o ID como parâmetro
            fetchPlaces(placeId); 
        }
        };

        // Adicionar um listener para o evento de deep link
        Linking.addEventListener('url', handleDeepLink);

        // Remover o listener ao desmontar o componente
        return () => {
        Linking.removeEventListener('url', handleDeepLink);
        };
    }, [navigation]);

  return (
    <View>
    </View>
  );
};

export default DeepLinkHandler;