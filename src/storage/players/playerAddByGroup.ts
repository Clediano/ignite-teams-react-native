import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

import { PlayerStorageDTO } from './PlayerStorageDTO';
import { getAllPlayersByGroup } from './playerGetAllByGroup';

export async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {

        const players = await getAllPlayersByGroup(group);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([...players, newPlayer]));

    } catch (error) {
        throw error;
    }
}
