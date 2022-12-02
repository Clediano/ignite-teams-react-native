import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

import { getAllPlayersByGroup } from './playerGetAllByGroup';

export async function removePlayerByGroup(playerName: string, group: string) {
    try {
        const storedPlayers = await getAllPlayersByGroup(group);

        const filtered = storedPlayers.filter(player => player.name !== playerName);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(filtered));
    } catch (error) {
        throw error;
    }
}
