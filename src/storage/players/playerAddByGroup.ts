import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

import { PlayerStorageDTO } from './PlayerStorageDTO';
import { getAllPlayersByGroup } from './playerGetAllByGroup';
import { AppError } from '@utils/AppError';

export async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {

        const storedPlayers = await getAllPlayersByGroup(group);

        const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);

        if(playerAlreadyExists.length > 0) {
            throw new AppError("Essa pessoa já está adicionada em um time aqui.");
        }

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([...storedPlayers, newPlayer]));

    } catch (error) {
        throw error;
    }
}
